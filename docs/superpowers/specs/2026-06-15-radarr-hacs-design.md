# Radarr HACS Integration — Design Spec

**Date:** 2026-06-15
**Status:** Approved

---

## Overview

A Home Assistant HACS integration for Radarr that exposes full library management through a single, visually polished Lovelace card. Users can browse their movie library, search for new titles, and add movies to Radarr — all without leaving the HA dashboard. Intended for HACS community publication.

**Goals:**
- Full panel Lovelace card: browse library, search TMDB, add movies
- One card instance per Radarr instance (supports multiple Radarr setups per dashboard)
- Fully adaptive styling using HA CSS variables with a glassmorphism default aesthetic
- Clean HACS-publishable structure meeting default quality scale requirements

**Non-goals (v1):**
- Download queue / queue management (secondary feature, deferred)
- Sidebar panel / full HA page (card-only approach)
- Mobile app (HA Companion App renders Lovelace cards — covered automatically)

---

## Architecture

The repository ships a **Python custom component** and a **JavaScript Lovelace card** together.

```
radarr-hacs/
├── hacs.json
├── custom_components/radarr_hacs/
│   ├── __init__.py          # Integration setup, resource registration
│   ├── manifest.json        # HA manifest (version, iot_class, config_flow)
│   ├── config_flow.py       # UI config wizard (URL + API key + display name)
│   ├── coordinator.py       # DataUpdateCoordinator — polls Radarr every 30s
│   ├── api.py               # Async aiohttp Radarr v3 API client
│   ├── websocket_api.py     # Custom WS commands for card UI
│   ├── services.py          # HA services (automatable)
│   └── sensor.py            # 3 summary sensors per config entry
├── www/radarr-hacs-card/
│   └── radarr-hacs-card.js  # Compiled Lit card (committed to repo)
├── src/                     # TypeScript source
│   ├── card.ts              # Main card element
│   ├── editor.ts            # Visual card editor
│   └── components/          # Sub-elements (header, grid, detail, add-form)
├── tests/                   # Python pytest suite
├── package.json
└── requirements_test.txt
```

**Communication pattern (Hybrid — Option C):**
- Card UI reads → `hass.connection.sendMessagePromise()` → WebSocket handler → coordinator cache → Radarr API
- Write actions → `hass.callService()` → HA service → `api.py` → Radarr API → coordinator refresh
- API key stored in HA config entry — never sent to the browser

---

## Backend (Python Integration)

### Config Flow
UI-driven setup: Radarr URL → API key → display name → connectivity test → save. Each config entry is one Radarr instance. Multiple entries supported for multi-instance setups (e.g. 4K + 1080p).

### API Client (`api.py`)
Async `aiohttp` wrapper covering:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/movie` | Full library |
| GET | `/movie/lookup?term=` | TMDB search |
| POST | `/movie` | Add movie |
| DELETE | `/movie/{id}` | Remove movie |
| POST | `/command` | Trigger actions (RescanMovie, MovieSearch) |
| GET | `/qualityprofile` | Quality profiles for add form |
| GET | `/rootfolder` | Root folders for add form |

### Coordinator (`coordinator.py`)
`DataUpdateCoordinator` polling at 30s (user-configurable). Caches full library in memory. Write operations trigger an immediate coordinator refresh after completion.

### WebSocket Commands (`websocket_api.py`)
Registered under `radarr_hacs` domain. All reads serve from coordinator cache for instant response.

- `radarr_hacs/get_movies` — cached library, accepts `filter`, `sort`, `search` params
- `radarr_hacs/search_movies` — live TMDB search (bypasses cache)
- `radarr_hacs/get_config` — quality profiles + root folders for the add-form

### Services (`services.py`)
Automatable from HA automations and scripts:

- `radarr_hacs.add_movie` — fields: `tmdb_id`, `quality_profile_id`, `root_folder`, `monitored`
- `radarr_hacs.delete_movie` — fields: `movie_id`, `delete_files` (bool, default false)
- `radarr_hacs.refresh_library` — forces coordinator refresh immediately

### Entities (`sensor.py`)
Three sensors per config entry (named using display name from config flow):

- `sensor.<name>_total_movies`
- `sensor.<name>_missing_movies`
- `sensor.<name>_downloading_movies`

---

## Frontend (Lovelace Card)

**Tech:** Lit 3 + TypeScript, bundled with Rollup. No external runtime dependencies.

### Card Structure

```
<radarr-hacs-card>
  ├── <card-header>       # Display name, unified search bar, settings icon
  ├── <filter-chips>      # All · Available · Missing · Downloading · 4K · (custom)
  ├── <movie-grid>        # Virtualized poster grid
  │   └── <movie-poster>  # Poster tile with status badge overlay
  └── <inline-detail>     # Slides open below selected poster's row
      ├── Poster + metadata (title, year, genres, rating, runtime, overview)
      ├── Status badge + quality profile + file path + file size
      ├── Action buttons: Search Again · Edit Quality · Delete
      └── [add-form]      # Shown for TMDB results not in library
          ├── Quality profile dropdown
          ├── Root folder dropdown
          ├── Monitor toggle
          └── Add Movie button
```

### Search Behaviour
1. Typing filters local cached library instantly (client-side, no network call)
2. After 400ms debounce with no local match → calls `radarr_hacs/search_movies`
3. TMDB results not in library show **"+ Add to Radarr"** in their inline-detail
4. TMDB results already in library show their current status

### Inline Detail
- Opens below the row of the selected poster (not a modal — no navigation away)
- Dismissed by clicking the poster again or clicking another poster
- Smoothly animated slide-down using CSS transitions

### Visual Style
- 100% HA CSS variable driven (`--card-background-color`, `--primary-color`, `--primary-text-color`, etc.)
- Glassmorphism default: `backdrop-filter: blur()`, `rgba()` backgrounds, subtle border `rgba(255,255,255,0.08)`
- Status badges: coloured pills (green = available, orange = downloading, grey = missing)
- Adapts automatically to any user HA theme (light, dark, custom)

### Card Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | required | Config entry to use |
| `columns` | number | 4 | Poster grid columns (2–8) |
| `default_view` | string | `library` | Starting view (`library` or `search`) |
| `default_sort` | string | `added` | Sort order (title / added / year / status) |
| `default_filter` | string | `all` | Active filter chip on load |
| `show_status_badges` | bool | true | Status overlay on posters |
| `poster_radius` | number | 8 | Poster border radius in px |
| `card_title` | string | — | Override card header title |
| `poll_interval` | number | 30 | Coordinator poll interval in seconds |

All options editable via the Lovelace visual card editor (`<radarr-hacs-card-editor>`).

---

## Data Flows

### Browse Library
1. Card mounts → `radarr_hacs/get_movies` WS call → coordinator returns cache
2. Coordinator pushes updates every 30s via HA WebSocket subscription → grid refreshes silently
3. Search bar typing → client-side filter (instant)
4. Filter chip click → client-side filter (instant)
5. Poster click → inline-detail opens from cached data (no network call)

### Search & Add
1. User types → 400ms debounce → no local match → `radarr_hacs/search_movies`
2. Result clicked → inline-detail shows TMDB metadata + add-form
3. User selects quality profile + root folder → clicks **Add Movie**
4. `hass.callService('radarr_hacs', 'add_movie', {...})`
5. Python adds via Radarr API → triggers coordinator refresh → movie appears in grid within ~2s

### Error Handling
- Radarr unreachable → banner with last-known data timestamp + manual retry button
- Add fails (duplicate, invalid profile) → inline error in add-form, no navigation
- Config entry missing → card shows setup prompt with link to integration config page

---

## HACS Publishing

- `hacs.json` category: `"integration"` (ships integration + card together)
- Card JS auto-registered as Lovelace resource in `__init__.py` `async_setup_entry`
- `manifest.json`: `iot_class: "local_polling"`, `config_flow: true`, `version`, no external requirements beyond `aiohttp` (pre-bundled with HA)
- GitHub releases with semantic versioning (`v0.1.0`) trigger HACS update notifications
- Quality scale: HACS default (config flow UI, no YAML-only setup, no hardcoded credentials)
- Silver/Gold quality scale deferred to post-v1

## Testing

- **Python:** `pytest` + `pytest-homeassistant-custom-component` covering config flow, coordinator, services, and WebSocket handlers
- **JavaScript:** No unit tests for v1 (Lit component testing overhead not justified at this stage)
