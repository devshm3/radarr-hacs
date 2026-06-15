# Radarr HACS

A Home Assistant integration that gives you full Radarr control from a single Lovelace card — browse your library, search for new titles, and add movies without leaving your dashboard.

## Features

- **Library browser** — poster grid with filter chips (All / Available / Missing / Downloading)
- **Unified search** — filters your library instantly; searches TMDB for titles not in your collection
- **Add movies** — select quality profile and root folder, then add directly from the card
- **Summary sensors** — `total_movies`, `missing_movies`, `downloading_movies` per Radarr instance
- **Automatable services** — `radarr_hacs.add_movie`, `radarr_hacs.delete_movie`, `radarr_hacs.refresh_library`
- **Multi-instance** — add one card per Radarr instance (e.g. 4K + 1080p)
- **Fully adaptive** — uses HA CSS variables, works with any theme

## Installation

1. Install via [HACS](https://hacs.xyz)
2. Go to **Settings → Devices & Services → Add Integration → Radarr HACS**
3. Enter your Radarr URL and API key
4. The Lovelace card resource is registered automatically when HA is in storage mode.
   If using YAML-mode Lovelace, add this resource manually in your `configuration.yaml`:
   ```yaml
   lovelace:
     resources:
       - url: /radarr_hacs/radarr-hacs-card.js
         type: module
   ```
5. Add the **Radarr HACS Card** to any Lovelace dashboard and set the Entry ID
   (find it in Settings → Devices & Services → Radarr HACS → ⋮ → Integration ID)

## Card Options

| Option | Default | Description |
|--------|---------|-------------|
| `columns` | 4 | Poster grid columns (2–8) |
| `default_view` | `library` | Starting view (`library` or `search`) |
| `default_sort` | `added` | Sort order (title / added / year / status) |
| `default_filter` | `all` | Active filter on load |
| `show_status_badges` | true | Status overlay on posters |
| `poster_radius` | 8 | Poster corner radius in px |
| `card_title` | — | Override the card header title |

## Requirements

- Home Assistant 2024.1 or later
- Radarr v3 or later
