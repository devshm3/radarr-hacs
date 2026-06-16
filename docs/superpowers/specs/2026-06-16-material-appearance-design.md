# Radarr Card — Material You appearance option

**Date:** 2026-06-16
**Status:** Approved design

## Goal

Let users choose the card's visual appearance between the current **Glass** look
and a new **Material You (MD3)** look. The Material look must work in both dark
and light mode, switching automatically with the user's Home Assistant mode.
There is no Material *theme* involved — the card supplies the Material styling
itself.

## Background

Today the card forces a single look. Surface styling is scattered as hardcoded
`rgba(255, 255, 255, 0.0x)` overlays across four shadow-DOM components:
`card.ts`, `components/filter-chips.ts`, `components/movie-poster.ts`,
`components/movie-detail.ts`. The card already renders through `<ha-card>`, so it
inherits the active theme's card surface (this is what made it match Mushroom
cards under the Frosted Glass theme).

## Design decisions (confirmed)

1. **Material flavor:** Material You / Material Design 3 — solid tonal surfaces
   (no translucency/blur), large rounded corners, filled-tonal "+ Add" button,
   MD3 filter chips (outlined when inactive, filled-tonal with a leading `✓`
   when active).
2. **Light + dark:** ship an MD3 light scheme and dark scheme; pick automatically
   from `hass.themes.darkMode`. No manual light/dark toggle.
3. **Accent source:** derive from the user's HA `--primary-color` via
   `color-mix()`. Surfaces are neutral MD3 tones with a faint accent tint.
   (Rejected: fixed baseline palette; editor color picker — could be layered on
   later.)
4. **Default appearance:** `glass`, so existing users see no change on upgrade.

## Architecture — design-token layer

Switching the whole card (and within Material, light vs dark) cannot be done by
editing each shadow-DOM component conditionally. Instead, introduce a layer of
CSS custom properties ("design tokens"):

- The top-level card sets the tokens on its `<ha-card>` element based on two
  inputs: the chosen appearance and `hass.themes.darkMode`.
- Every component consumes `var(--rc-…)` instead of hardcoded values. CSS custom
  properties inherit across shadow-DOM boundaries, so child components pick up
  whatever the card sets — no prop-drilling, no per-component branching.

**Rejected alternative:** passing an `appearance` property into every child and
branching CSS in each. That duplicates the glass/light/dark logic four times and
is brittle. The token layer centralizes all theme logic in `card.ts` and turns
components into pure token consumers — also a net cleanup of scattered rgba.

### Token vocabulary

| Token | Purpose |
|-------|---------|
| `--rc-surface` | Card background (the `ha-card` surface) |
| `--rc-surface-container` | Raised/inset fills: search field, buttons, inactive chips, poster placeholder, detail panel |
| `--rc-accent` | Primary accent: active states, progress fill, focus, selected poster border |
| `--rc-accent-container` | Filled-tonal background: "+ Add" button, active chip |
| `--rc-on-accent` | Text/icon color on `--rc-accent-container` |
| `--rc-outline` | Borders and dividers |
| `--rc-text` | Primary text |
| `--rc-text-secondary` | Secondary text |
| `--rc-radius` | Card/control corner radius |
| `--rc-chip-radius` | Chip corner radius |
| `--rc-chip-check` | Structural: leading glyph on the active chip (`"✓ "` in Material, empty in Glass) |

The `--rc-chip-check` and `--rc-chip-radius` tokens carry the structural MD3
differences (checkmark + chip shape), so even those flow through tokens and no
component needs to know the active appearance.

### Token value maps

**Glass** (theme-adaptive, current look preserved):
- `--rc-surface`: inherits the `ha-card` surface (unchanged).
- `--rc-surface-container`, `--rc-outline`: derived from text color, e.g.
  `color-mix(in srgb, var(--rc-text) 8%, transparent)` / `12%`. This makes the
  overlays mode-aware and fixes Glass being near-invisible on light themes.
- `--rc-accent`: `var(--primary-color)`; `--rc-accent-container`: solid
  `var(--primary-color)`; `--rc-on-accent`: `var(--text-primary-color, #fff)`
  (preserves the current solid accent button/active chip).
- `--rc-text`: `var(--primary-text-color)`; `--rc-text-secondary`:
  `var(--secondary-text-color)`.
- `--rc-radius`: from `--ha-card-border-radius`; `--rc-chip-radius`: `20px`;
  `--rc-chip-check`: empty.

**Material light:**
- Neutral near-white surfaces with a faint accent tint, e.g.
  `--rc-surface: color-mix(in srgb, var(--primary-color) 5%, #ffffff)`,
  `--rc-surface-container: color-mix(in srgb, var(--primary-color) 8%, #ffffff)`.
- `--rc-accent`: `var(--primary-color)`;
  `--rc-accent-container: color-mix(in srgb, var(--primary-color) 22%, #ffffff)`;
  `--rc-on-accent: color-mix(in srgb, var(--primary-color) 75%, #000000)`.
- `--rc-outline: color-mix(in srgb, var(--primary-color) 15%, #b5ada5)`.
- `--rc-text`: ~`#1c1b1a`; `--rc-text-secondary`: ~`#5f5b55`.
- `--rc-radius`: `24px`; `--rc-chip-radius`: `8px`; `--rc-chip-check`: `"✓ "`.

**Material dark:**
- Neutral near-black surfaces with a faint accent tint, e.g.
  `--rc-surface: color-mix(in srgb, var(--primary-color) 6%, #1a1715)`,
  `--rc-surface-container: color-mix(in srgb, var(--primary-color) 10%, #262220)`.
- `--rc-accent`: `var(--primary-color)`;
  `--rc-accent-container: color-mix(in srgb, var(--primary-color) 30%, #000000)`;
  `--rc-on-accent: color-mix(in srgb, var(--primary-color) 60%, #ffffff)`.
- `--rc-outline: color-mix(in srgb, var(--primary-color) 15%, #4a443d)`.
- `--rc-text`: ~`#ece5df`; `--rc-text-secondary`: ~`#cbc3bb`.
- `--rc-radius`: `24px`; `--rc-chip-radius`: `8px`; `--rc-chip-check`: `"✓ "`.

Exact hex bases are finalized during implementation against the live card; the
`color-mix` structure above is the contract.

Status badges (available = green, missing = orange, unmonitored = grey) stay
semantic in both appearances.

## Component changes

- **`card.ts`** — owns all token logic. Sets `data-appearance` (`glass` |
  `material`, from config) and `data-dark` (from `hass.themes.darkMode`) on the
  `ha-card`. CSS blocks keyed on those attributes define the three token sets.
  Header, search, icon buttons, view-all button, and the fullscreen dialog
  switch from rgba to `var(--rc-…)`.
- **`components/filter-chips.ts`** — replace rgba with tokens; active chip uses
  `--rc-accent-container` / `--rc-on-accent`, inactive is outlined
  (`--rc-outline` + `--rc-text-secondary`); add
  `::before { content: var(--rc-chip-check) }`; radius from `--rc-chip-radius`.
- **`components/movie-poster.ts`** — placeholder background, selected-border
  (`--rc-accent`), and shadow tokenize. Configurable `poster_radius` and
  semantic badges unchanged.
- **`components/movie-detail.ts`** — panel background → `--rc-surface-container`,
  buttons/selects → tokens, progress fill → `--rc-accent`.

## Config & editor

- `CardConfig` gains `appearance?: 'glass' | 'material'`, default `'glass'`.
- `editor.ts` gains an "Appearance" `<select>`: *Glass (default)* / *Material You*,
  wired through the existing `_fire`/`config-changed` pattern.
- Card reads `this._config.appearance ?? 'glass'`.

## Dark/light detection

- Read `this.hass.themes.darkMode`; reflect to `data-dark` on the `ha-card`.
- The card already re-renders on `hass` updates, so mode changes apply live.
- Glass mode remains theme-adaptive and now also mode-aware via the derived
  overlays.

## Testing

- Build: `tsc` typecheck + `rollup` build succeed.
- Visual matrix in the dockerized dev HA: **{Glass, Material} × {light, dark}**.
  - Toggle appearance via the card editor.
  - Toggle HA light/dark via the user profile; add a light theme alongside the
    existing `glass_test` dark theme in `dev/ha-config/themes/`.
  - Verify: surfaces, chips (incl. active checkmark in Material), buttons,
    poster placeholder/selected border, detail panel, progress bar, and the
    fullscreen dialog all render correctly in each of the 4 states.
- `color-mix()` is supported by HA's modern Chromium/WebKit frontend; no fallback
  required for supported HA versions.

## Out of scope (YAGNI)

- Editor color picker / custom seed (decision C) — can layer on top of accent
  derivation later.
- Restyling the editor form itself.
- Per-element Material elevation/ripple animations beyond static MD3 surfaces.
