import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from './ha-types.js';
import type { CardConfig } from './types.js';

@customElement('radarr-hacs-card-editor')
export class RadarrHacsCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  private _config?: CardConfig;

  setConfig(config: CardConfig) {
    this._config = { ...config };
    this.requestUpdate();
  }

  static styles = css`
    .form { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .field { display: flex; flex-direction: column; gap: 4px; }
    .field-row { display: flex; align-items: center; gap: 8px; }
    label { color: var(--secondary-text-color); font-size: 0.85rem; }
    input:not([type=checkbox]), select {
      background: var(--card-background-color, #1c1c1e);
      border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
      border-radius: 6px;
      color: var(--primary-text-color);
      padding: 6px 10px;
      width: 100%;
      box-sizing: border-box;
    }
  `;

  render() {
    if (!this._config) return html``;
    const c = this._config;
    return html`
      <div class="form">
        <div class="field">
          <label>Entry ID (required — find in Settings → Devices & Services → Radarr HACS → ⋮ → Integration ID)</label>
          <input .value=${c.entry_id ?? ''} @change=${this._str('entry_id')} />
        </div>
        <div class="field">
          <label>Card Title (default: "Radarr")</label>
          <input .value=${c.card_title ?? ''} @change=${this._str('card_title')} />
        </div>
        <div class="field">
          <label>Columns (2–8, default: 4)</label>
          <input type="number" min="2" max="8"
            .value=${String(c.columns ?? 4)}
            @change=${(e: Event) => this._fire({ columns: Number((e.target as HTMLInputElement).value) })} />
        </div>
        <div class="field">
          <label>Default Sort</label>
          <select @change=${this._str('default_sort')}>
            ${(['added', 'title', 'year', 'status'] as const).map(s => html`
              <option value=${s} ?selected=${(c.default_sort ?? 'added') === s}>${s}</option>
            `)}
          </select>
        </div>
        <div class="field">
          <label>Default Filter</label>
          <select @change=${this._str('default_filter')}>
            ${(['all', 'available', 'missing', 'downloading'] as const).map(f => html`
              <option value=${f} ?selected=${(c.default_filter ?? 'all') === f}>${f}</option>
            `)}
          </select>
        </div>
        <div class="field">
          <label>Poster Border Radius in px (default: 8)</label>
          <input type="number" min="0" max="24"
            .value=${String(c.poster_radius ?? 8)}
            @change=${(e: Event) => this._fire({ poster_radius: Number((e.target as HTMLInputElement).value) })} />
        </div>
        <div class="field-row">
          <input type="checkbox"
            ?checked=${c.show_status_badges !== false}
            @change=${(e: Event) => this._fire({ show_status_badges: (e.target as HTMLInputElement).checked })} />
          <label>Show Status Badges</label>
        </div>
      </div>
    `;
  }

  private _str(key: keyof CardConfig) {
    return (e: Event) => this._fire({ [key]: (e.target as HTMLInputElement).value });
  }

  private _fire(partial: Partial<CardConfig>) {
    this._config = { ...this._config!, ...partial };
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }
}
