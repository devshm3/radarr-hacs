import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Movie } from '../types.js';
import './movie-poster.js';

@customElement('radarr-movie-grid')
export class RadarrMovieGrid extends LitElement {
  @property({ attribute: false }) movies: Movie[] = [];
  @property({ type: Number }) columns = 4;
  @property({ type: Number }) selectedMovieId?: number;
  @property({ type: Boolean }) showBadges = true;
  @property({ type: Number }) posterRadius = 8;

  static styles = css`
    :host { display: block; padding: 8px; }
    .grid { display: grid; gap: 8px; }
    .empty {
      color: var(--secondary-text-color);
      padding: 32px;
      text-align: center;
    }
  `;

  render() {
    if (!this.movies.length) {
      return html`<div class="empty">No movies found</div>`;
    }
    return html`
      <div class="grid" style="grid-template-columns:repeat(${this.columns},1fr)">
        ${this.movies.map(m => html`
          <radarr-movie-poster
            .movie=${m}
            ?selected=${m.id === this.selectedMovieId}
            ?showBadge=${this.showBadges}
            .radius=${this.posterRadius}
          ></radarr-movie-poster>
        `)}
      </div>
    `;
  }
}
