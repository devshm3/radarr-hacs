import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { HomeAssistant } from './ha-types.js';
import type { CardConfig, Movie, QualityProfile, RootFolder } from './types.js';
import {
  getMovies, searchMovies, getConfig,
  addMovie, deleteMovie, toggleMonitored, triggerSearch,
} from './radarr-api.js';
import './editor.js';
import './components/filter-chips.js';
import './components/movie-poster.js';
import './components/movie-detail.js';
import type { RadarrMovieDetail } from './components/movie-detail.js';

const DOMAIN = 'radarr_hacs';

@customElement('radarr-hacs-card')
export class RadarrHacsCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: CardConfig;
  @state() private _movies: Movie[] = [];
  @state() private _filteredMovies: Movie[] = [];
  @state() private _qualityProfiles: QualityProfile[] = [];
  @state() private _rootFolders: RootFolder[] = [];
  @state() private _selectedMovie?: Movie;
  @state() private _dialogSelectedMovie?: Movie;
  @state() private _dialogOpen = false;
  @state() private _addMode = false;
  @state() private _activeFilter = 'all';
  @state() private _searchTerm = '';
  @state() private _tmdbForced = false;
  @state() private _isTmdbView = false;
  @state() private _loading = false;
  @state() private _error?: string;

  @query('dialog') private _dialog?: HTMLDialogElement;

  private _debounceTimer?: ReturnType<typeof setTimeout>;
  private _queueTimer?: ReturnType<typeof setInterval>;
  private _initialised = false;
  private _searchGen = 0;

  static getConfigElement() {
    return document.createElement('radarr-hacs-card-editor');
  }

  static async getStubConfig(hass: HomeAssistant): Promise<Partial<CardConfig>> {
    try {
      const entries = await hass.connection.sendMessagePromise<Array<{ entry_id: string; domain: string }>>({
        type: 'config_entries/get',
        domain: DOMAIN,
      });
      const match = entries.find(e => e.domain === DOMAIN);
      return { entry_id: match?.entry_id ?? '' };
    } catch {
      return { entry_id: '' };
    }
  }

  setConfig(config: CardConfig) {
    if (!config.entry_id) throw new Error('entry_id is required');
    this._config = {
      columns: 4,
      default_sort: 'added',
      default_filter: 'all',
      show_status_badges: true,
      poster_radius: 8,
      page_size: 25,
      show_quality: true,
      show_file_info: true,
      show_filter_counts: true,
      show_refresh_button: true,
      ...config,
    };
    this._activeFilter = this._config.default_filter ?? 'all';
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('hass') || changed.has('_config')) {
      this.setAttribute('data-appearance', this._config?.appearance ?? 'glass');
      // Prefer HA's resolved dark mode; fall back to the OS preference when it
      // isn't set (plain non-moded themes don't always populate darkMode).
      const dark = this.hass?.themes?.darkMode
        ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.toggleAttribute('data-dark', !!dark);
    }
    if (changed.has('hass') && this.hass && this._config && !this._initialised) {
      this._initialised = true;
      this._loadData();
    }
    if (changed.has('_dialogOpen' as keyof this) && this._dialogOpen) {
      this._dialog?.showModal();
    }
  }

  private get _pageSize(): number {
    return this._config?.page_size ?? 25;
  }

  private get _displayMovies(): Movie[] {
    return this._pageSize > 0 ? this._filteredMovies.slice(0, this._pageSize) : this._filteredMovies;
  }

  private get _hasMore(): boolean {
    return this._pageSize > 0 && this._filteredMovies.length > this._pageSize;
  }

  private get _filterCounts(): Record<string, number> {
    const all = this._movies;
    return {
      all: all.length,
      available: all.filter(m => m.hasFile).length,
      missing: all.filter(m => !m.hasFile && m.monitored).length,
      unmonitored: all.filter(m => !m.hasFile && !m.monitored).length,
      downloading: all.filter(m => m.inQueue).length,
    };
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._queueTimer) { clearInterval(this._queueTimer); this._queueTimer = undefined; }
  }

  private async _loadData(preserveSelection = false): Promise<void> {
    const prevSelectedId = preserveSelection ? this._selectedMovie?.id : undefined;
    const prevDialogId = preserveSelection ? this._dialogSelectedMovie?.id : undefined;
    this._loading = !preserveSelection;
    this._error = undefined;
    try {
      const [movies, cfg] = await Promise.all([
        getMovies(this.hass, this._config.entry_id, {
          filter: this._activeFilter !== 'all' ? this._activeFilter : undefined,
          sort: this._config.default_sort,
        }),
        getConfig(this.hass, this._config.entry_id),
      ]);
      this._movies = movies;
      this._qualityProfiles = cfg.quality_profiles;
      this._rootFolders = cfg.root_folders;
      if (!this._addMode && !this._isTmdbView) {
        this._filteredMovies = movies;
        if (prevSelectedId != null) {
          this._selectedMovie = movies.find(m => m.id === prevSelectedId) ?? this._selectedMovie;
        }
        if (prevDialogId != null) {
          this._dialogSelectedMovie = movies.find(m => m.id === prevDialogId) ?? this._dialogSelectedMovie;
        }
      }
      const hasDownloading = movies.some(m => m.inQueue);
      if (hasDownloading && !this._queueTimer) {
        this._queueTimer = setInterval(() => this._loadData(true), 15000);
      } else if (!hasDownloading && this._queueTimer) {
        clearInterval(this._queueTimer);
        this._queueTimer = undefined;
      }
    } catch (e) {
      this._error = `Could not connect to Radarr: ${e}`;
    } finally {
      this._loading = false;
    }
  }

  private _onSearchInput(e: Event): void {
    this._searchTerm = (e.target as HTMLInputElement).value;
    this._searchGen++;
    clearTimeout(this._debounceTimer);

    if (this._addMode) {
      if (this._searchTerm) {
        this._debounceTimer = setTimeout(() => this._tmdbSearch(), 300);
      } else {
        this._filteredMovies = [];
      }
      return;
    }

    this._tmdbForced = false;
    this._isTmdbView = false;
    const term = this._searchTerm.toLowerCase();
    if (term) {
      this._filteredMovies = this._movies.filter(
        m => m.title.toLowerCase().includes(term) || String(m.year).includes(term)
      );
      if (this._filteredMovies.length === 0) {
        this._debounceTimer = setTimeout(() => this._tmdbSearch(), 400);
      }
    } else {
      this._filteredMovies = this._movies;
    }
  }

  private _forceSearchTmdb(): void {
    this._tmdbForced = true;
    this._searchGen++;
    clearTimeout(this._debounceTimer);
    this._tmdbSearch();
  }

  private async _tmdbSearch(): Promise<void> {
    if (!this._searchTerm) return;
    const gen = this._searchGen;
    try {
      const results = await searchMovies(this.hass, this._config.entry_id, this._searchTerm);
      if (this._searchGen === gen) {
        this._filteredMovies = results;
        this._isTmdbView = true;
      }
    } catch (_e) {
      // leave empty
    }
  }

  private _enterAddMode(): void {
    this._addMode = true;
    this._searchTerm = '';
    this._filteredMovies = [];
    this._selectedMovie = undefined;
    this.updateComplete.then(() => {
      this.shadowRoot?.querySelector<HTMLInputElement>('.search')?.focus();
    });
  }

  private _exitAddMode(): void {
    this._addMode = false;
    this._isTmdbView = false;
    this._searchTerm = '';
    this._selectedMovie = undefined;
    this._filteredMovies = this._movies;
  }

  private async _onFilterChange(key: string): Promise<void> {
    this._activeFilter = key;
    this._selectedMovie = undefined;
    this._dialogSelectedMovie = undefined;
    this._isTmdbView = false;
    if (this._addMode) this._exitAddMode();
    try {
      this._movies = await getMovies(this.hass, this._config.entry_id, {
        filter: key !== 'all' ? key : undefined,
        sort: this._config.default_sort,
      });
      this._filteredMovies = this._movies;
    } catch (e) {
      this._error = String(e);
    }
  }

  private _onPosterClick(movie: Movie): void {
    this._selectedMovie = this._selectedMovie?.id === movie.id ? undefined : movie;
  }

  private _onDialogPosterClick(movie: Movie): void {
    this._dialogSelectedMovie = this._dialogSelectedMovie?.id === movie.id ? undefined : movie;
  }

  private async _onAddMovie(
    movie: Movie, qualityProfileId: number, rootFolder: string, monitored: boolean
  ): Promise<string | undefined> {
    try {
      await addMovie(this.hass, this._config.entry_id, movie, qualityProfileId, rootFolder, monitored);
      this._selectedMovie = undefined;
      this._dialogSelectedMovie = undefined;
      if (this._addMode) this._exitAddMode();
      await this._loadData();
      return undefined;
    } catch (e) {
      return String(e);
    }
  }

  private async _onDeleteMovie(movie: Movie): Promise<void> {
    try {
      await deleteMovie(this.hass, this._config.entry_id, movie.id);
      this._selectedMovie = undefined;
      this._dialogSelectedMovie = undefined;
    } catch (e) {
      this._error = `Delete failed: ${e}`;
    } finally {
      // Always refresh so the grid reflects reality immediately, even if the
      // delete reported an error (e.g. the movie was already gone).
      await this._loadData();
    }
  }

  private async _onToggleMonitored(e: CustomEvent): Promise<void> {
    const { movie, monitored } = e.detail as { movie: Movie; monitored: boolean };
    try {
      await toggleMonitored(this.hass, this._config.entry_id, movie.id, monitored);
      await this._loadData();
      if (this._selectedMovie?.id === movie.id) {
        this._selectedMovie = this._filteredMovies.find(m => m.id === movie.id);
      }
      if (this._dialogSelectedMovie?.id === movie.id) {
        this._dialogSelectedMovie = this._filteredMovies.find(m => m.id === movie.id);
      }
    } catch (err) {
      this._error = `Could not update monitored: ${err}`;
    }
  }

  private async _onSearchNow(e: CustomEvent): Promise<void> {
    const movie = e.detail as Movie;
    try {
      await triggerSearch(this.hass, this._config.entry_id, movie.id);
    } catch (err) {
      this._error = `Search failed: ${err}`;
    }
  }

  private async _onAddMovieEvent(e: CustomEvent): Promise<void> {
    const { movie, qualityProfileId, rootFolder, monitored } = e.detail;
    const panel = e.target as RadarrMovieDetail;
    const err = await this._onAddMovie(movie, qualityProfileId, rootFolder, monitored);
    panel.addComplete(err);
  }

  private async _onDeleteMovieEvent(e: CustomEvent): Promise<void> {
    await this._onDeleteMovie(e.detail as Movie);
  }

  private _onDialogSearchAgain(e: CustomEvent): void {
    this._dialogSelectedMovie = undefined;
    this._tmdbForced = false;
    const m = e.detail as Movie;
    this._searchTerm = m.title;
    const term = m.title.toLowerCase();
    this._filteredMovies = this._movies.filter(mv => mv.title.toLowerCase().includes(term));
    if (this._filteredMovies.length === 0) {
      setTimeout(() => this._tmdbSearch(), 400);
    }
  }

  private _openDialog(): void {
    this._dialogOpen = true;
  }

  private _onDialogClose(): void {
    this._dialogOpen = false;
    this._dialogSelectedMovie = undefined;
  }

  private _renderGrid(
    movies: Movie[],
    selectedMovie: Movie | undefined,
    onPosterClick: (m: Movie) => void,
    onAdd: (e: CustomEvent) => void,
    onDelete: (e: CustomEvent) => void,
    onToggleMonitored: (e: CustomEvent) => void,
    onSearchNow: (e: CustomEvent) => void,
    onSearchAgain?: (e: CustomEvent) => void,
  ) {
    if (!movies.length) {
      return html`<div class="empty">${this._addMode && this._searchTerm ? 'No results on TMDB' : 'No movies found'}</div>`;
    }

    const cols = this._config?.columns ?? 4;
    const selectedIdx = selectedMovie != null
      ? movies.findIndex(m => m.id === selectedMovie.id)
      : -1;
    const rowEndIdx = selectedIdx >= 0
      ? Math.min(Math.floor(selectedIdx / cols) * cols + cols - 1, movies.length - 1)
      : -1;

    return html`
      <div class="grid" style="grid-template-columns:repeat(${cols},1fr)">
        ${movies.map((movie, idx) => html`
          <radarr-movie-poster
            .movie=${movie}
            ?selected=${movie.id === selectedMovie?.id}
            .showBadge=${this._config?.show_status_badges !== false}
            .radius=${this._config?.poster_radius ?? 8}
            @poster-click=${() => onPosterClick(movie)}
          ></radarr-movie-poster>
          ${idx === rowEndIdx ? html`
            <div class="inline-detail">
              <radarr-movie-detail
                open
                .movie=${selectedMovie}
                .qualityProfiles=${this._qualityProfiles}
                .rootFolders=${this._rootFolders}
                .showQuality=${this._config?.show_quality !== false}
                .showFileInfo=${this._config?.show_file_info !== false}
                @add-movie=${onAdd}
                @delete-movie=${onDelete}
                @toggle-monitored=${onToggleMonitored}
                @search-now=${onSearchNow}
                ${onSearchAgain ? html`` : ''}
              ></radarr-movie-detail>
            </div>
          ` : nothing}
        `)}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      /* ---- Glass tokens (default appearance, theme-adaptive) ---- */
      --rc-text: var(--primary-text-color);
      --rc-text-secondary: var(--secondary-text-color);
      --rc-surface: var(--ha-card-background, var(--card-background-color));
      /* derives from --rc-text (defined above) so overlays adapt to light/dark */
      --rc-surface-container: color-mix(in srgb, var(--rc-text) 8%, transparent);
      --rc-outline: var(--divider-color, color-mix(in srgb, var(--rc-text) 12%, transparent));
      --rc-accent: var(--primary-color);
      --rc-accent-container: var(--primary-color);
      --rc-on-accent: var(--text-primary-color, #fff);
      --rc-radius: var(--ha-card-border-radius, 12px);
      --rc-control-radius: 8px;
      --rc-chip-radius: 20px;
      --rc-chip-bg: var(--rc-surface-container);
      --rc-chip-check: "";
    }
    /* ---- Material You — light scheme ---- */
    :host([data-appearance="material"]) {
      --rc-text: #1c1b1a;
      --rc-text-secondary: #5f5b55;
      --rc-surface: color-mix(in srgb, var(--primary-color) 5%, #ffffff);
      --rc-surface-container: color-mix(in srgb, var(--primary-color) 8%, #ffffff);
      --rc-outline: color-mix(in srgb, var(--primary-color) 15%, #b5ada5);
      --rc-accent: var(--primary-color);
      --rc-accent-container: color-mix(in srgb, var(--primary-color) 22%, #ffffff);
      --rc-on-accent: color-mix(in srgb, var(--primary-color) 75%, #000000);
      --rc-radius: 24px;
      --rc-control-radius: 20px;
      --rc-chip-radius: 8px;
      --rc-chip-bg: transparent;
      --rc-chip-check: "✓ ";
    }
    /* ---- Material You — dark scheme overrides ---- */
    :host([data-appearance="material"][data-dark]) {
      --rc-accent: var(--primary-color);
      --rc-text: #ece5df;
      --rc-text-secondary: #cbc3bb;
      --rc-surface: color-mix(in srgb, var(--primary-color) 6%, #1a1715);
      --rc-surface-container: color-mix(in srgb, var(--primary-color) 10%, #262220);
      --rc-outline: color-mix(in srgb, var(--primary-color) 15%, #4a443d);
      --rc-accent-container: color-mix(in srgb, var(--primary-color) 30%, #000000);
      --rc-on-accent: color-mix(in srgb, var(--primary-color) 60%, #ffffff);
    }
    ha-card {
      overflow: hidden;
      padding: 0;
    }
    /* Material paints its own solid surface; Glass keeps the theme ha-card surface */
    :host([data-appearance="material"]) ha-card {
      background: var(--rc-surface);
      border-radius: var(--rc-radius);
      color: var(--rc-text);
    }
    .header {
      align-items: center;
      background: transparent;
      border-bottom: 1px solid var(--rc-outline);
      display: flex;
      gap: 8px;
      padding: 12px 16px;
    }
    .title {
      color: var(--rc-text);
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }
    .search {
      background: var(--rc-surface-container);
      border: 1px solid var(--rc-outline);
      border-radius: var(--rc-control-radius);
      color: var(--rc-text);
      flex: 1;
      font-size: 0.88rem;
      outline: none;
      padding: 7px 13px;
      transition: border-color 0.15s;
    }
    .search::placeholder { color: var(--rc-text-secondary); opacity: 0.7; }
    .search:focus { border-color: var(--rc-accent); }
    .icon-btn {
      background: var(--rc-surface-container);
      border: 1px solid var(--rc-outline);
      border-radius: var(--rc-control-radius);
      color: var(--rc-text);
      cursor: pointer;
      flex-shrink: 0;
      font-size: 1rem;
      line-height: 1;
      padding: 6px 10px;
      transition: background 0.15s;
      white-space: nowrap;
    }
    .icon-btn:hover { background: color-mix(in srgb, var(--rc-text) 14%, transparent); }
    .icon-btn.add-btn {
      background: var(--rc-accent-container);
      border-color: var(--rc-accent-container);
      color: var(--rc-on-accent);
    }
    .icon-btn.add-btn:hover { filter: brightness(1.05); }
    .state-msg {
      color: var(--rc-text-secondary);
      padding: 40px 24px;
      text-align: center;
    }
    .error-msg { color: var(--error-color, #f44336); }
    .retry {
      background: var(--rc-surface-container);
      border: 1px solid var(--rc-outline);
      border-radius: var(--rc-control-radius);
      color: var(--rc-text);
      cursor: pointer;
      display: inline-block;
      margin-top: 10px;
      padding: 6px 16px;
      transition: background 0.15s;
    }
    .retry:hover { background: color-mix(in srgb, var(--rc-text) 12%, transparent); }
    .grid { display: grid; gap: 8px; padding: 8px; }
    .empty { color: var(--rc-text-secondary); padding: 32px; text-align: center; }
    .inline-detail {
      animation: slideDown 0.2s ease-out;
      grid-column: 1 / -1;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .view-all {
      background: var(--rc-surface-container);
      border: 1px solid var(--rc-outline);
      border-radius: var(--rc-control-radius);
      box-sizing: border-box;
      color: var(--rc-accent);
      cursor: pointer;
      display: block;
      font-size: 0.88rem;
      margin: 0 8px 12px;
      padding: 10px;
      text-align: center;
      transition: background 0.15s;
      width: calc(100% - 16px);
    }
    .view-all:hover { background: color-mix(in srgb, var(--rc-text) 9%, transparent); }
    dialog {
      background: var(--card-background-color, #1c1c1e);
      border: none;
      box-sizing: border-box;
      height: 100dvh;
      inset: 0;
      margin: 0;
      max-height: 100%;
      max-width: 100%;
      overflow-y: auto;
      padding: 0;
      position: fixed;
      width: 100%;
    }
    :host([data-appearance="material"]) dialog {
      background: var(--rc-surface);
      color: var(--rc-text);
    }
    dialog::backdrop { background: rgba(0, 0, 0, 0.6); }
    .dialog-header {
      align-items: center;
      background: var(--rc-surface-container);
      border-bottom: 1px solid var(--rc-outline);
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `;

  render() {
    if (!this._config) return html``;
    const title = this._config.card_title ?? 'Radarr';
    const showCounts = this._config.show_filter_counts !== false;
    return html`
      <ha-card>
      <div class="header">
        ${this._addMode ? html`
          <button class="icon-btn" @click=${this._exitAddMode}>← Back</button>
          <input
            class="search"
            type="search"
            placeholder="Search TMDB to add a movie…"
            .value=${this._searchTerm}
            @input=${this._onSearchInput}
          />
        ` : html`
          <span class="title">${title}</span>
          <input
            class="search"
            type="search"
            placeholder="Search library…"
            .value=${this._searchTerm}
            @input=${this._onSearchInput}
          />
          <button class="icon-btn add-btn" @click=${this._enterAddMode}>+ Add</button>
          ${this._config.show_refresh_button !== false ? html`
            <button class="icon-btn" @click=${() => this._loadData()} title="Refresh">↻</button>
          ` : nothing}
        `}
      </div>

      ${!this._addMode ? html`
        <radarr-filter-chips
          .activeFilter=${this._activeFilter}
          .counts=${showCounts ? this._filterCounts : undefined}
          @filter-change=${(e: CustomEvent<string>) => this._onFilterChange(e.detail)}
        ></radarr-filter-chips>
      ` : nothing}

      ${this._loading ? html`<div class="state-msg">Loading…</div>` : ''}

      ${this._error ? html`
        <div class="state-msg error-msg">
          ${this._error}
          <br/>
          <button class="retry" @click=${() => { this._error = undefined; this._loadData(); }}>Retry</button>
        </div>
      ` : ''}

      ${!this._loading && !this._error ? html`
        ${this._addMode && !this._searchTerm ? html`
          <div class="state-msg">Type a movie name to search TMDB</div>
        ` : this._renderGrid(
          this._addMode ? this._filteredMovies : this._displayMovies,
          this._selectedMovie,
          m => this._onPosterClick(m),
          this._onAddMovieEvent,
          this._onDeleteMovieEvent,
          this._onToggleMonitored,
          this._onSearchNow,
        )}
        ${!this._addMode && this._hasMore ? html`
          <button class="view-all" @click=${this._openDialog}>
            View all ${this._filteredMovies.length} movies →
          </button>
        ` : ''}
        ${!this._addMode && this._searchTerm && this._filteredMovies.length > 0 && !this._tmdbForced ? html`
          <div style="padding:4px 16px 8px;text-align:right">
            <a style="color:var(--primary-color);font-size:.82rem;opacity:.85;text-decoration:none"
              href="#" @click=${(e: Event) => { e.preventDefault(); this._forceSearchTmdb(); }}
            >Search TMDB →</a>
          </div>
        ` : ''}
      ` : ''}
      </ha-card>

      <dialog @close=${this._onDialogClose}>
        ${this._dialogOpen ? html`
          <div class="dialog-header">
            <span class="title">${title}</span>
            <input
              class="search"
              type="search"
              placeholder="Search library…"
              .value=${this._searchTerm}
              @input=${this._onSearchInput}
            />
            <button class="icon-btn" @click=${() => this._dialog?.close()}>✕</button>
          </div>
          <radarr-filter-chips
            .activeFilter=${this._activeFilter}
            .counts=${showCounts ? this._filterCounts : undefined}
            @filter-change=${(e: CustomEvent<string>) => this._onFilterChange(e.detail)}
          ></radarr-filter-chips>
          ${this._renderGrid(
            this._filteredMovies,
            this._dialogSelectedMovie,
            m => this._onDialogPosterClick(m),
            this._onAddMovieEvent,
            this._onDeleteMovieEvent,
            this._onToggleMonitored,
            this._onSearchNow,
            this._onDialogSearchAgain,
          )}
          ${this._searchTerm && this._filteredMovies.length > 0 && !this._tmdbForced ? html`
            <div style="padding:4px 16px 8px;text-align:right">
              <a style="color:var(--primary-color);font-size:.82rem;opacity:.85;text-decoration:none"
                href="#" @click=${(e: Event) => { e.preventDefault(); this._forceSearchTmdb(); }}
              >Search TMDB →</a>
            </div>
          ` : ''}
        ` : ''}
      </dialog>
    `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'radarr-hacs-card',
  name: 'Radarr Card',
  description: 'Browse and manage your Radarr movie library',
  preview: false,
  documentationURL: 'https://github.com/devshm3/radarr-card',
});
console.info('%c RADARR-CARD %c 0.1.3 ', 'background:#f5a623;color:#1a1a1a;font-weight:700', 'background:#333;color:#fff');
