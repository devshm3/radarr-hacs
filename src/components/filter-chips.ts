import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const FILTERS: Array<{ key: string; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'available', label: 'Available' },
  { key: 'missing', label: 'Missing' },
  { key: 'unmonitored', label: 'Unmonitored' },
  { key: 'downloading', label: 'Downloading' },
];

@customElement('radarr-filter-chips')
export class RadarrFilterChips extends LitElement {
  @property() activeFilter = 'all';

  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 10px 16px;
    }
    button {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 20px;
      color: var(--secondary-text-color);
      cursor: pointer;
      font-size: 0.82rem;
      letter-spacing: 0.02em;
      padding: 4px 14px;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    button:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--primary-text-color);
    }
    button.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-weight: 600;
    }
  `;

  render() {
    return html`${FILTERS.map(f => html`
      <button
        class=${f.key === this.activeFilter ? 'active' : ''}
        @click=${() => this._select(f.key)}
      >${f.label}</button>
    `)}`;
  }

  private _select(key: string) {
    this.dispatchEvent(new CustomEvent('filter-change', {
      detail: key,
      bubbles: true,
      composed: true,
    }));
  }
}
