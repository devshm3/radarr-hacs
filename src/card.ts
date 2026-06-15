import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from './ha-types.js';
import type { CardConfig, Movie, QualityProfile, RootFolder } from './types.js';
import { getMovies, searchMovies, getConfig, addMovie, deleteMovie } from './radarr-api.js';
import './editor.js';

@customElement('radarr-hacs-card')
export class RadarrHacsCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: CardConfig;
  @state() private _movies: Movie[] = [];
  @state() private _filteredMovies: Movie[] = [];
  @state() private _qualityProfiles: QualityProfile[] = [];
  @state() private _rootFolders: RootFolder[] = [];
  @state() private _selectedMovie?: Movie;
  @state() private _activeFilter = 'all';
  @state() private _searchTerm = '';
  @state() private _loading = false;
  @state() private _error?: string;

  private _debounceTimer?: ReturnType<typeof setTimeout>;
  private _initialised = false;

  static getConfigElement() {
    return document.createElement('radarr-hacs-card-editor');
  }

  static getStubConfig(): CardConfig {
    return { entry_id: '' };
  }

  setConfig(config: CardConfig) {
    if (!config.entry_id) throw new Error('entry_id is required');
    this._config = {
      columns: 4,
      default_sort: 'added',
      default_filter: 'all',
      show_status_badges: true,
      poster_radius: 8,
      ...config,
    };
    this._activeFilter = this._config.default_filter ?? 'all';
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('hass') && this.hass && this._config && !this._initialised) {
      this._initialised = true;
      this._loadData();
    }
  }

  private async _loadData(): Promise<void> {
    this._loading = true;
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
      this._filteredMovies = movies;
      this._qualityProfiles = cfg.quality_profiles;
      this._rootFolders = cfg.root_folders;
    } catch (e) {
      this._error = `Could not connect to Radarr: ${e}`;
    } finally {
      this._loading = false;
    }
  }

  private _onSearchInput(e: Event): void {
    this._searchTerm = (e.target as HTMLInputElement).value;
    clearTimeout(this._debounceTimer);
    const term = this._searchTerm.toLowerCase();
    if (term) {
      this._filteredMovies = this._movies.filter(
        m => m.title.toLowerCase().includes(term) || String(m.year).includes(term)
      );
    } else {
      this._filteredMovies = this._movies;
      return;
    }
    if (this._filteredMovies.length === 0) {
      this._debounceTimer = setTimeout(() => this._tmdbSearch(), 400);
    }
  }

  private async _tmdbSearch(): Promise<void> {
    if (!this._searchTerm) return;
    try {
      this._filteredMovies = await searchMovies(this.hass, this._config.entry_id, this._searchTerm);
    } catch (_e) {
      // leave empty
    }
  }

  private async _onFilterChange(key: string): Promise<void> {
    this._activeFilter = key;
    this._selectedMovie = undefined;
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

  private async _onAddMovie(
    movie: Movie, qualityProfileId: number, rootFolder: string, monitored: boolean
  ): Promise<string | undefined> {
    try {
      await addMovie(this.hass, this._config.entry_id, movie, qualityProfileId, rootFolder, monitored);
      this._selectedMovie = undefined;
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
      await this._loadData();
    } catch (e) {
      this._error = `Delete failed: ${e}`;
    }
  }

  static styles = css`
    :host {
      display: block;
      background: var(--card-background-color);
      border-radius: 12px;
      overflow: hidden;
    }
    .state-msg {
      color: var(--secondary-text-color);
      padding: 32px;
      text-align: center;
    }
    .error-msg { color: var(--error-color, #f44336); }
    .retry {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      color: var(--primary-text-color);
      cursor: pointer;
      margin-top: 8px;
      padding: 6px 14px;
    }
  `;

  render() {
    if (!this._config) return html``;
    return html`
      <p class="state-msg">
        ${this._loading ? 'Loading…' : ''}
        ${this._error ? html`
          <span class="error-msg">${this._error}</span><br/>
          <button class="retry" @click=${() => { this._initialised = false; this._loadData(); }}>Retry</button>
        ` : ''}
        ${!this._loading && !this._error ? `${this._filteredMovies.length} movies` : ''}
      </p>
    `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'radarr-hacs-card',
  name: 'Radarr HACS Card',
  description: 'Browse and manage your Radarr movie library',
  preview: false,
});
