# Material You Appearance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a user-selectable `appearance` option (`glass` | `material`) to the Radarr card, where `material` renders a Material You (MD3) look that auto-switches between light and dark with the user's Home Assistant mode.

**Architecture:** Introduce a CSS design-token layer. The top-level card element sets `data-appearance` and `data-dark` attributes on its `:host`, and CSS keyed on those attributes defines three token sets (Glass, Material light, Material dark). All four shadow-DOM components consume `var(--rc-…)` tokens instead of hardcoded `rgba()`; custom properties inherit across shadow boundaries, so children need no per-appearance logic. Accent is derived from `--primary-color` via `color-mix()`; Material surfaces are neutral MD3 tones.

**Tech Stack:** TypeScript, Lit 3, rollup (`npm run build`), Home Assistant custom Lovelace card.

---

## Testing note (read first)

This project has **no JavaScript/Lit unit-test harness** — the only automated frontend gate is the TypeScript compile performed by `npm run build` (via `@rollup/plugin-typescript`). Pure CSS token mapping is not meaningfully unit-testable, and adding a Lit test framework is out of scope (YAGNI). Therefore each task's automated check is **`npm run build` succeeding with no TS errors**, and correctness is confirmed by a **visual matrix** in the dockerized dev HA: `{Glass, Material} × {light, dark}` = 4 states (Task 7).

`color-mix(in srgb, …)` is supported by HA's modern Chromium/WebKit frontend; no fallback is required.

**Final token set** (the spec listed the core 11; `--rc-control-radius` and `--rc-chip-bg` were added during planning as minor structural refinements so Glass controls/chips keep their current shape while Material gets its own):

`--rc-surface`, `--rc-surface-container`, `--rc-accent`, `--rc-accent-container`, `--rc-on-accent`, `--rc-outline`, `--rc-text`, `--rc-text-secondary`, `--rc-radius`, `--rc-control-radius`, `--rc-chip-radius`, `--rc-chip-bg`, `--rc-chip-check`.

**Note on attribute placement:** the spec said attributes go on `<ha-card>`; during planning this moved to `:host` so the fullscreen `<dialog>` (a sibling of `ha-card`, not a descendant) also inherits the tokens.

---

## File structure

- **Modify** `src/ha-types.ts` — add optional `themes.darkMode` to `HomeAssistant`.
- **Modify** `src/types.ts` — add `appearance?: 'glass' | 'material'` to `CardConfig`.
- **Modify** `src/card.ts` — reflect `data-appearance`/`data-dark` to host; define token sets; convert card-level CSS to tokens; add version banner.
- **Modify** `src/editor.ts` — add "Appearance" select.
- **Modify** `src/components/filter-chips.ts` — tokenize; MD3 checkmark + chip shape.
- **Modify** `src/components/movie-poster.ts` — tokenize placeholder/selected border/img background.
- **Modify** `src/components/movie-detail.ts` — tokenize panel/buttons/selects/progress.
- **Create** `dev/ha-config/themes/light_test.yaml` — a light theme for the visual matrix.

---

## Task 1: Config plumbing + host attribute reflection + version banner

No visual change yet (default is `glass`); this wires the data flow.

**Files:**
- Modify: `src/ha-types.ts`
- Modify: `src/types.ts:47-61`
- Modify: `src/card.ts` (lifecycle `updated`, end-of-file banner)

- [ ] **Step 1: Add `themes` to the HomeAssistant type**

In `src/ha-types.ts`, add the field inside the interface (after `language: string;`):

```ts
  language: string;
  themes?: { darkMode?: boolean };
```

- [ ] **Step 2: Add `appearance` to CardConfig**

In `src/types.ts`, inside `interface CardConfig`, add after `show_refresh_button?: boolean;`:

```ts
  show_refresh_button?: boolean;
  appearance?: 'glass' | 'material';
```

- [ ] **Step 3: Reflect appearance/dark mode onto the host**

In `src/card.ts`, the existing method is:

```ts
  protected updated(changed: PropertyValues): void {
    if (changed.has('hass') && this.hass && this._config && !this._initialised) {
```

Replace it with (adds the reflection block at the top, keeps the existing init logic):

```ts
  protected updated(changed: PropertyValues): void {
    if (changed.has('hass') || changed.has('_config')) {
      this.setAttribute('data-appearance', this._config?.appearance ?? 'glass');
      this.toggleAttribute('data-dark', !!this.hass?.themes?.darkMode);
    }
    if (changed.has('hass') && this.hass && this._config && !this._initialised) {
```

(Leave the rest of the method body unchanged.)

- [ ] **Step 4: Add a version banner for build verification**

In `src/card.ts`, after the existing `(window as any).customCards.push({ … });` block at the end of the file, add:

```ts
console.info('%c RADARR-CARD %c 0.1.3 ', 'background:#f5a623;color:#1a1a1a;font-weight:700', 'background:#333;color:#fff');
```

- [ ] **Step 5: Build to verify it compiles**

Run: `npm run build`
Expected: `created custom_components/radarr_hacs/www/radarr-hacs-card.js` with no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/ha-types.ts src/types.ts src/card.ts
git commit -m "feat: add appearance config + host mode reflection"
```

---

## Task 2: Token layer + card.ts CSS conversion

Defines all three token sets and converts the card-level chrome. After this, Glass must look unchanged and Material renders its surface/header/buttons.

**Files:**
- Modify: `src/card.ts:386-516` (the `static styles = css\`…\`` block)

- [ ] **Step 1: Replace the `:host` + `ha-card` + `.header` token/surface rules**

In `src/card.ts`, replace this current block:

```ts
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    /* Render through ha-card so the card inherits the active theme's card
       surface (background, blur, radius, shadow) — matching Mushroom and other
       cards exactly, instead of painting its own darker panel background. */
    ha-card {
      overflow: hidden;
      padding: 0;
    }
    .header {
      align-items: center;
      background: transparent;
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
      display: flex;
      gap: 8px;
      padding: 12px 16px;
    }
```

with:

```ts
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      /* ---- Glass tokens (default appearance, theme-adaptive) ---- */
      --rc-text: var(--primary-text-color);
      --rc-text-secondary: var(--secondary-text-color);
      --rc-surface: var(--ha-card-background, var(--card-background-color));
      --rc-surface-container: color-mix(in srgb, var(--rc-text) 8%, transparent);
      --rc-outline: color-mix(in srgb, var(--rc-text) 12%, transparent);
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
```

- [ ] **Step 2: Convert `.title`, `.search`, `.icon-btn` rules**

Replace the current `.title` … `.icon-btn.add-btn:hover` rules:

```ts
    .title {
      color: var(--primary-text-color);
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }
    .search {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: var(--primary-text-color);
      flex: 1;
      font-size: 0.88rem;
      outline: none;
      padding: 7px 13px;
      transition: border-color 0.15s;
    }
    .search::placeholder { color: var(--secondary-text-color); opacity: 0.7; }
    .search:focus { border-color: var(--primary-color); }
    .icon-btn {
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      color: var(--primary-text-color);
      cursor: pointer;
      flex-shrink: 0;
      font-size: 1rem;
      line-height: 1;
      padding: 6px 10px;
      transition: background 0.15s;
      white-space: nowrap;
    }
    .icon-btn:hover { background: rgba(255, 255, 255, 0.14); }
    .icon-btn.add-btn {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .icon-btn.add-btn:hover { filter: brightness(1.1); }
```

with:

```ts
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
```

- [ ] **Step 3: Convert `.state-msg`, `.retry`, `.empty`, `.view-all` rules**

Replace the current rules:

```ts
    .state-msg {
      color: var(--secondary-text-color);
      padding: 40px 24px;
      text-align: center;
    }
    .error-msg { color: var(--error-color, #f44336); }
    .retry {
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      color: var(--primary-text-color);
      cursor: pointer;
      display: inline-block;
      margin-top: 10px;
      padding: 6px 16px;
      transition: background 0.15s;
    }
    .retry:hover { background: rgba(255,255,255,0.12); }
    .grid { display: grid; gap: 8px; padding: 8px; }
    .empty { color: var(--secondary-text-color); padding: 32px; text-align: center; }
```

with:

```ts
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
```

Then replace the `.view-all` rules:

```ts
    .view-all {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      box-sizing: border-box;
      color: var(--primary-color);
      cursor: pointer;
      display: block;
      font-size: 0.88rem;
      margin: 0 8px 12px;
      padding: 10px;
      text-align: center;
      transition: background 0.15s;
      width: calc(100% - 16px);
    }
    .view-all:hover { background: rgba(255, 255, 255, 0.09); }
```

with:

```ts
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
```

- [ ] **Step 4: Convert the `dialog` + `.dialog-header` rules**

Replace:

```ts
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
    dialog::backdrop { background: rgba(0, 0, 0, 0.6); }
    .dialog-header {
      align-items: center;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      position: sticky;
      top: 0;
      z-index: 1;
    }
```

with:

```ts
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
```

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: success, no TS errors.

- [ ] **Step 6: Commit**

```bash
git add src/card.ts
git commit -m "feat: token layer + Material/Glass card-level styling"
```

---

## Task 3: Tokenize filter-chips

**Files:**
- Modify: `src/components/filter-chips.ts:17-53` (the `static styles` block)

- [ ] **Step 1: Replace the styles block**

Replace the current `static styles = css\`…\`;` block with:

```ts
  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 10px 16px;
    }
    button {
      background: var(--rc-chip-bg, rgba(255, 255, 255, 0.05));
      border: 1px solid var(--rc-outline, rgba(255, 255, 255, 0.09));
      border-radius: var(--rc-chip-radius, 20px);
      color: var(--rc-text-secondary, var(--secondary-text-color));
      cursor: pointer;
      font-size: 0.82rem;
      letter-spacing: 0.02em;
      padding: 4px 14px;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    button.active::before { content: var(--rc-chip-check, ""); }
    button:hover {
      background: color-mix(in srgb, var(--rc-text, #fff) 8%, transparent);
      color: var(--rc-text, var(--primary-text-color));
    }
    button.active {
      background: var(--rc-accent-container, var(--primary-color));
      border-color: var(--rc-accent-container, var(--primary-color));
      color: var(--rc-on-accent, var(--text-primary-color, #fff));
      font-weight: 600;
    }
    .count {
      background: color-mix(in srgb, var(--rc-text, #fff) 15%, transparent);
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 1px 6px;
    }
    button.active .count {
      background: color-mix(in srgb, var(--rc-on-accent, #000) 22%, transparent);
    }
  `;
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success, no TS errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/filter-chips.ts
git commit -m "feat: tokenize filter chips (MD3 checkmark + shape)"
```

---

## Task 4: Tokenize movie-poster

**Files:**
- Modify: `src/components/movie-poster.ts:18-85` (the `static styles` block — only the surface-related rules change; badge/progress colors stay semantic)

- [ ] **Step 1: Replace the `.wrap.selected`, `img`, `.placeholder` rules**

Replace:

```ts
    .wrap.selected {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px var(--primary-color), 0 6px 20px rgba(0, 0, 0, 0.35);
    }
    img {
      background: rgba(255, 255, 255, 0.04);
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    .placeholder {
      align-items: center;
      background: rgba(255, 255, 255, 0.04);
      color: var(--secondary-text-color);
      display: flex;
      flex-direction: column;
      font-size: 0.72rem;
      gap: 4px;
      height: 100%;
      justify-content: center;
      padding: 8px;
      text-align: center;
    }
```

with:

```ts
    .wrap.selected {
      border-color: var(--rc-accent, var(--primary-color));
      box-shadow: 0 0 0 2px var(--rc-accent, var(--primary-color)), 0 6px 20px rgba(0, 0, 0, 0.35);
    }
    img {
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.04));
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    .placeholder {
      align-items: center;
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.04));
      color: var(--rc-text-secondary, var(--secondary-text-color));
      display: flex;
      flex-direction: column;
      font-size: 0.72rem;
      gap: 4px;
      height: 100%;
      justify-content: center;
      padding: 8px;
      text-align: center;
    }
```

(The `.badge.*` and `.progress-fill` rules keep their existing semantic colors — do not change them.)

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success, no TS errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/movie-poster.ts
git commit -m "feat: tokenize movie poster surfaces"
```

---

## Task 5: Tokenize movie-detail

**Files:**
- Modify: `src/components/movie-detail.ts:22-142` (the `static styles` block)

- [ ] **Step 1: Convert `.panel` and `.poster-placeholder`**

Replace:

```ts
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
```

with:

```ts
    .panel {
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.04));
      border: 1px solid var(--rc-outline, rgba(255, 255, 255, 0.08));
      border-radius: var(--rc-radius, 12px);
      display: grid;
      gap: 16px;
      grid-template-columns: auto 1fr;
      margin: 0 8px 8px;
      padding: 16px;
    }
```

Then replace the `.poster-placeholder` background line:

```ts
      background: rgba(255,255,255,0.05);
```

with:

```ts
      background: var(--rc-surface-container, rgba(255,255,255,0.05));
```

- [ ] **Step 2: Convert text colors and `button` / `button.primary`**

Replace:

```ts
    h2 { font-size: 1.15rem; margin: 0 0 4px; }
    .meta { color: var(--secondary-text-color); font-size: 0.82rem; line-height: 1.6; }
    .info-row { color: var(--secondary-text-color); font-size: 0.8rem; margin-top: 4px; }
    .info-row strong { color: var(--primary-text-color); }
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
```

with:

```ts
    h2 { font-size: 1.15rem; margin: 0 0 4px; color: var(--rc-text, var(--primary-text-color)); }
    .meta { color: var(--rc-text-secondary, var(--secondary-text-color)); font-size: 0.82rem; line-height: 1.6; }
    .info-row { color: var(--rc-text-secondary, var(--secondary-text-color)); font-size: 0.8rem; margin-top: 4px; }
    .info-row strong { color: var(--rc-text, var(--primary-text-color)); }
    .overview { font-size: 0.88rem; line-height: 1.55; margin-top: 8px; color: var(--rc-text, var(--primary-text-color)); }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }

    button {
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.07));
      border: 1px solid var(--rc-outline, rgba(255, 255, 255, 0.12));
      border-radius: var(--rc-control-radius, 8px);
      color: var(--rc-text, var(--primary-text-color));
      cursor: pointer;
      font-size: 0.84rem;
      padding: 6px 14px;
      transition: background 0.15s;
    }
    button:hover { background: color-mix(in srgb, var(--rc-text, #fff) 12%, transparent); }
    button.primary {
      background: var(--rc-accent-container, var(--primary-color));
      border-color: var(--rc-accent-container, var(--primary-color));
      color: var(--rc-on-accent, var(--text-primary-color, #fff));
    }
```

(The `button.danger`, `button.monitored-on/off`, `button.success` rules keep their semantic colors — do not change them.)

- [ ] **Step 3: Convert `select`, `.progress-label`, `.progress-time`, `.progress-track`, `.progress-fill`**

Replace:

```ts
    select {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: var(--primary-text-color);
      flex: 1;
      padding: 6px 10px;
    }
```

with:

```ts
    select {
      background: var(--rc-surface-container, rgba(255, 255, 255, 0.06));
      border: 1px solid var(--rc-outline, rgba(255, 255, 255, 0.1));
      border-radius: var(--rc-control-radius, 6px);
      color: var(--rc-text, var(--primary-text-color));
      flex: 1;
      padding: 6px 10px;
    }
```

Then replace:

```ts
    .progress-label { color: var(--secondary-text-color); }
    .progress-time { color: var(--primary-text-color); font-weight: 500; }
    .progress-track {
      background: rgba(255,255,255,0.08);
      border-radius: 4px;
      height: 6px;
      overflow: hidden;
    }
    .progress-fill {
      background: var(--primary-color);
      border-radius: 4px;
      height: 100%;
      transition: width 1s linear;
    }
    .progress-pct {
      color: var(--secondary-text-color);
      font-size: 0.75rem;
      margin-top: 4px;
      text-align: right;
    }
```

with:

```ts
    .progress-label { color: var(--rc-text-secondary, var(--secondary-text-color)); }
    .progress-time { color: var(--rc-text, var(--primary-text-color)); font-weight: 500; }
    .progress-track {
      background: color-mix(in srgb, var(--rc-text, #fff) 8%, transparent);
      border-radius: 4px;
      height: 6px;
      overflow: hidden;
    }
    .progress-fill {
      background: var(--rc-accent, var(--primary-color));
      border-radius: 4px;
      height: 100%;
      transition: width 1s linear;
    }
    .progress-pct {
      color: var(--rc-text-secondary, var(--secondary-text-color));
      font-size: 0.75rem;
      margin-top: 4px;
      text-align: right;
    }
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: success, no TS errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/movie-detail.ts
git commit -m "feat: tokenize movie detail panel"
```

---

## Task 6: Editor "Appearance" dropdown

**Files:**
- Modify: `src/editor.ts:84-87` (insert a new field after the Card Title field)

- [ ] **Step 1: Add the Appearance select**

In `src/editor.ts`, find the Card Title field:

```ts
        <div class="field">
          <label>Card Title (default: "Radarr")</label>
          <input .value=${c.card_title ?? ''} @change=${this._str('card_title')} />
        </div>
```

Immediately after that closing `</div>`, insert:

```ts
        <div class="field">
          <label>Appearance</label>
          <select @change=${this._str('appearance')}>
            ${(['glass', 'material'] as const).map(a => html`
              <option value=${a} ?selected=${(c.appearance ?? 'glass') === a}>
                ${a === 'glass' ? 'Glass (default)' : 'Material You'}
              </option>
            `)}
          </select>
        </div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success, no TS errors. (`this._str` already accepts any `keyof CardConfig`, and `appearance` is now one.)

- [ ] **Step 3: Commit**

```bash
git add src/editor.ts
git commit -m "feat: add Appearance selector to card editor"
```

---

## Task 7: Light dev theme + visual matrix verification + final build

**Files:**
- Create: `dev/ha-config/themes/light_test.yaml`

- [ ] **Step 1: Create a light theme for the matrix**

Create `dev/ha-config/themes/light_test.yaml`:

```yaml
light_test:
  card-background-color: "#ffffff"
  ha-card-background: "#ffffff"
  primary-background-color: "#f2f2f2"
  secondary-background-color: "#ffffff"
  primary-text-color: "#1c1b1a"
  secondary-text-color: "#5f5b55"
  divider-color: "rgba(0, 0, 0, 0.12)"
  primary-color: "#f5a623"
  ha-card-border-radius: "16px"
  ha-card-box-shadow: "0 2px 6px rgba(0, 0, 0, 0.12)"
```

- [ ] **Step 2: Final build**

Run: `npm run build`
Expected: success. Confirm `grep -c rc- custom_components/radarr_hacs/www/radarr-hacs-card.js` returns a non-zero count (tokens are present in the bundle).

- [ ] **Step 3: Restart dev HA and verify the build loaded**

Run: `cd dev && docker compose restart && cd ..`
Then bump the dev resource cache-buster: in `dev/ha-config/.storage/lovelace_resources`, change `?v=12` to `?v=13`.
Open http://localhost:8123, hard-refresh, open DevTools console, confirm the `RADARR-CARD 0.1.3` banner appears (proves the new bundle is served).

- [ ] **Step 4: Verify the 4-state visual matrix**

For each combination, open the card and confirm it renders correctly (no invisible controls, readable text, correct accent):

1. **Glass + dark** — Profile theme `glass_test`; card edited to `appearance: glass`. Expect: unchanged from current Glass look (translucent surface, pill chips, solid accent button).
2. **Glass + light** — Profile theme `light_test`, `appearance: glass`. Expect: controls/chips/dividers now visible (the `color-mix` overlay fix), text dark-on-light.
3. **Material + dark** — Profile theme `glass_test` (HA dark mode on), `appearance: material`. Expect: solid dark neutral surface, 24px corners, outlined chips with `✓` on the active one, filled-tonal Add button.
4. **Material + light** — Profile theme `light_test`, `appearance: material`. Expect: near-white neutral surface, same MD3 structure, dark text.

To switch `appearance`, edit the card in the dashboard UI (Appearance dropdown) — confirm the dropdown itself works.

- [ ] **Step 5: Bump the release version**

In `custom_components/radarr_hacs/manifest.json`, change `"version": "0.1.2"` to `"version": "0.1.3"`.

- [ ] **Step 6: Commit**

```bash
git add dev/ha-config/themes/light_test.yaml custom_components/radarr_hacs/manifest.json custom_components/radarr_hacs/www/radarr-hacs-card.js
git commit -m "chore: dev light theme, version bump 0.1.3, rebuild bundle"
```

---

## Post-implementation

- Merge `feature/material-appearance` → `master` (use the finishing-a-development-branch skill).
- Update `README.md` to document the new `appearance` option (follow the existing options table format).
- Bump the production Lovelace resource `?v=` so end users fetch the new bundle after update.
