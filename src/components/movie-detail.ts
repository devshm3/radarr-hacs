import { LitElement, html, css, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { Movie, QualityProfile, RootFolder } from '../types.js';

@customElement('radarr-movie-detail')
export class RadarrMovieDetail extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ attribute: false }) movie?: Movie;
  @property({ attribute: false }) qualityProfiles: QualityProfile[] = [];
  @property({ attribute: false }) rootFolders: RootFolder[] = [];

  @state() private _profileId?: number;
  @state() private _folder?: string;
  @state() private _monitored = true;
  @state() private _adding = false;
  @state() private _addError?: string;

  static styles = css`
    :host {
      display: block;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, opacity 0.2s ease;
    }
    :host([open]) { max-height: 1000px; opacity: 1; }

    .panel {
      backdrop-filter: blur(8px);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      display: grid;
      gap: 16px;
      grid-template-columns: auto 1fr;
      margin: 0 8px 8px;
      padding: 16px;
    }
    .poster img {
      border-radius: 8px;
      display: block;
      width: 120px;
    }
    h2 { font-size: 1.15rem; margin: 0 0 4px; }
    .meta { color: var(--secondary-text-color); font-size: 0.82rem; line-height: 1.6; }
    .overview { font-size: 0.88rem; line-height: 1.55; margin-top: 8px; }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }

    button {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 0.84rem;
      padding: 6px 14px;
      transition: background 0.15s;
    }
    button:hover { background: rgba(255, 255, 255, 0.12); }
    button.primary {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    button.primary:disabled { opacity: 0.5; cursor: default; }
    button.danger { border-color: #f44336; color: #f44336; }

    .add-form { grid-column: 1 / -1; }
    .form-row {
      align-items: center;
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    .form-row label { font-size: 0.84rem; min-width: 120px; }
    select {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: var(--primary-text-color);
      flex: 1;
      padding: 6px 10px;
    }
    .add-error { color: var(--error-color, #f44336); font-size: 0.8rem; margin-bottom: 8px; }
  `;

  private get _poster(): string {
    return this.movie?.images?.find(i => i.coverType === 'poster')?.remoteUrl ?? '';
  }

  private get _rating(): string {
    const r = this.movie?.ratings?.tmdb ?? this.movie?.ratings?.imdb;
    return r ? `★ ${r.value.toFixed(1)}` : '';
  }

  private get _showAddForm(): boolean {
    return this.movie?.inLibrary === false;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('movie')) {
      this._profileId = undefined;
      this._folder = undefined;
      this._monitored = true;
      this._adding = false;
      this._addError = undefined;
    }
  }

  render() {
    if (!this.movie) return html``;
    const m = this.movie;
    return html`
      <div class="panel">
        <div class="poster">
          ${this._poster ? html`<img src=${this._poster} alt=${m.title} />` : nothing}
        </div>
        <div>
          <h2>${m.title}${m.year ? html` <span style="font-weight:400;opacity:.7">(${m.year})</span>` : ''}</h2>
          <div class="meta">
            ${[
              m.runtime ? `${m.runtime} min` : '',
              m.genres?.slice(0, 3).join(', '),
              m.studio ?? '',
              this._rating,
            ].filter(Boolean).join(' · ')}
          </div>
          ${m.overview ? html`<div class="overview">${m.overview}</div>` : ''}
          <div class="actions">
            ${!this._showAddForm ? html`
              <button @click=${this._searchAgain}>Search Again</button>
              <button class="danger" @click=${this._deleteMovie}>Delete from Radarr</button>
            ` : html`
              <span style="color:var(--secondary-text-color);font-size:.85rem">Not in library</span>
            `}
          </div>
        </div>

        ${this._showAddForm ? html`
          <div class="add-form">
            <div class="form-row">
              <label>Quality Profile</label>
              <select @change=${(e: Event) => this._profileId = Number((e.target as HTMLSelectElement).value)}>
                <option value="">Select…</option>
                ${this.qualityProfiles.map(p => html`<option value=${p.id}>${p.name}</option>`)}
              </select>
            </div>
            <div class="form-row">
              <label>Root Folder</label>
              <select @change=${(e: Event) => this._folder = (e.target as HTMLSelectElement).value}>
                <option value="">Select…</option>
                ${this.rootFolders.map(f => html`<option value=${f.path}>${f.path}</option>`)}
              </select>
            </div>
            <div class="form-row">
              <label>Monitored</label>
              <input type="checkbox" ?checked=${this._monitored}
                @change=${(e: Event) => this._monitored = (e.target as HTMLInputElement).checked} />
            </div>
            ${this._addError ? html`<div class="add-error">${this._addError}</div>` : ''}
            <button
              class="primary"
              ?disabled=${this._adding || !this._profileId || !this._folder}
              @click=${this._addMovie}
            >${this._adding ? 'Adding…' : '+ Add to Radarr'}</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  private _searchAgain() {
    this.dispatchEvent(new CustomEvent('search-again', { detail: this.movie, bubbles: true, composed: true }));
  }

  private _deleteMovie() {
    this.dispatchEvent(new CustomEvent('delete-movie', { detail: this.movie, bubbles: true, composed: true }));
  }

  private _addMovie() {
    if (!this._profileId || !this._folder) return;
    this._adding = true;
    this._addError = undefined;
    this.dispatchEvent(new CustomEvent('add-movie', {
      detail: {
        movie: this.movie,
        qualityProfileId: this._profileId,
        rootFolder: this._folder,
        monitored: this._monitored,
      },
      bubbles: true,
      composed: true,
    }));
  }

  addComplete(error?: string) {
    this._adding = false;
    if (error) this._addError = error;
  }
}
