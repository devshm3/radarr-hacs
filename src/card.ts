import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('radarr-hacs-card')
export class RadarrHacsCard extends LitElement {
  render() {
    return html`<div style="padding:16px;color:var(--primary-text-color)">Radarr HACS Card</div>`;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'radarr-hacs-card',
  name: 'Radarr HACS Card',
  description: 'Browse and manage your Radarr movie library',
  preview: false,
});
