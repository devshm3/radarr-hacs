# custom_components/radarr_hacs/websocket_api.py
from __future__ import annotations

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DOMAIN


def async_register_commands(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_get_movies)
    websocket_api.async_register_command(hass, ws_search_movies)
    websocket_api.async_register_command(hass, ws_get_config)


@websocket_api.websocket_command({
    vol.Required("type"): "radarr_hacs/get_movies",
    vol.Required("entry_id"): str,
    vol.Optional("search"): str,
    vol.Optional("filter"): vol.In(["available", "missing", "downloading"]),
    vol.Optional("sort"): vol.In(["title", "added", "year", "status"]),
})
@websocket_api.async_response
async def ws_get_movies(hass: HomeAssistant, connection, msg: dict) -> None:
    coordinator = hass.data.get(DOMAIN, {}).get(msg["entry_id"])
    if coordinator is None:
        connection.send_error(msg["id"], "not_found", "Config entry not found")
        return

    movies = list(coordinator.data["movies"])

    search = msg.get("search", "").lower()
    if search:
        movies = [m for m in movies if search in m.get("title", "").lower()]

    filter_val = msg.get("filter")
    if filter_val == "available":
        movies = [m for m in movies if m.get("hasFile")]
    elif filter_val == "missing":
        movies = [m for m in movies if not m.get("hasFile") and m.get("monitored")]
    elif filter_val == "downloading":
        queue_ids = {item["movieId"] for item in coordinator.data.get("queue", [])}
        movies = [m for m in movies if not m.get("hasFile") and m["id"] in queue_ids]

    sort = msg.get("sort", "added")
    if sort == "title":
        movies.sort(key=lambda m: m.get("title", "").lower())
    elif sort == "year":
        movies.sort(key=lambda m: m.get("year", 0), reverse=True)
    elif sort == "status":
        movies.sort(key=lambda m: m.get("hasFile", False), reverse=True)
    elif sort == "added":
        movies = sorted(movies, key=lambda m: m.get("added", ""), reverse=True)

    connection.send_result(msg["id"], {"movies": movies})


@websocket_api.websocket_command({
    vol.Required("type"): "radarr_hacs/search_movies",
    vol.Required("entry_id"): str,
    vol.Required("term"): str,
})
@websocket_api.async_response
async def ws_search_movies(hass: HomeAssistant, connection, msg: dict) -> None:
    coordinator = hass.data.get(DOMAIN, {}).get(msg["entry_id"])
    if coordinator is None:
        connection.send_error(msg["id"], "not_found", "Config entry not found")
        return

    try:
        results = await coordinator.api.search_movies(msg["term"])
    except Exception as err:
        connection.send_error(msg["id"], "radarr_error", str(err))
        return
    library_tmdb_ids = {m["tmdbId"] for m in coordinator.data["movies"]}
    for result in results:
        result["inLibrary"] = result.get("tmdbId") in library_tmdb_ids

    connection.send_result(msg["id"], {"results": results})


@websocket_api.websocket_command({
    vol.Required("type"): "radarr_hacs/get_config",
    vol.Required("entry_id"): str,
})
@websocket_api.async_response
async def ws_get_config(hass: HomeAssistant, connection, msg: dict) -> None:
    coordinator = hass.data.get(DOMAIN, {}).get(msg["entry_id"])
    if coordinator is None:
        connection.send_error(msg["id"], "not_found", "Config entry not found")
        return

    connection.send_result(msg["id"], {
        "quality_profiles": coordinator.data["quality_profiles"],
        "root_folders": coordinator.data["root_folders"],
    })
