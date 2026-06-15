import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Movie } from '../types.js';

function movieStatus(m: Movie): 'available' | 'downloading' | 'missing' {
  if (m.hasFile) return 'available';
  if (!m.hasFile && m.isAvailable) return 'downloading';
  return 'missing';
}

@customElement('radarr-movie-poster')
export class RadarrMoviePoster extends LitElement {
  @property({ attribute: false }) movie!: Movie;
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) showBadge = true;
  @property({ type: Number }) radius = 8;

  static styles = css`
    :host { display: block; cursor: pointer; }
    .wrap {
      aspect-ratio: 2 / 3;
      border: 2px solid transparent;
      border-radius: var(--r, 8px);
      overflow: hidden;
      position: relative;
      transition: border-color 0.15s, transform 0.15s;
    }
    .wrap:hover { transform: scale(1.02); }
    .wrap.selected { border-color: var(--primary-color); }
    img {
      background: rgba(255, 255, 255, 0.04);
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    .badge {
      border-radius: 10px;
      bottom: 6px;
      font-size: 0.65rem;
      font-weight: 700;
      left: 6px;
      letter-spacing: 0.04em;
      padding: 2px 8px;
      position: absolute;
      text-transform: uppercase;
    }
    .badge.available  { background: #4caf50; color: #fff; }
    .badge.missing    { background: #9e9e9e; color: #fff; }
    .badge.downloading { background: #ff9800; color: #fff; }
  `;

  private get _poster(): string {
    return this.movie?.images?.find(i => i.coverType === 'poster')?.remoteUrl ?? '';
  }

  render() {
    const status = movieStatus(this.movie);
    return html`
      <div
        class="wrap ${this.selected ? 'selected' : ''}"
        style="--r:${this.radius}px"
        @click=${() => this.dispatchEvent(new CustomEvent('poster-click', {
          detail: this.movie, bubbles: true, composed: true,
        }))}
      >
        <img
          src=${this._poster}
          alt=${this.movie.title}
          loading="lazy"
          @error=${(e: Event) => ((e.target as HTMLImageElement).style.visibility = 'hidden')}
        />
        ${this.showBadge && this.movie.inLibrary !== false ? html`
          <span class="badge ${status}">${status}</span>
        ` : ''}
      </div>
    `;
  }
}
