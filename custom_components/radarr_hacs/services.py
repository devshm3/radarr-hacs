# custom_components/radarr_hacs/services.py
from __future__ import annotations

import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall

from .const import DOMAIN

_ADD_SCHEMA = vol.Schema({
    vol.Required("entry_id"): str,
    vol.Required("tmdb_id"): int,
    vol.Required("title"): str,
    vol.Required("year"): int,
    vol.Required("quality_profile_id"): int,
    vol.Required("root_folder"): str,
    vol.Optional("monitored", default=True): bool,
})

_DELETE_SCHEMA = vol.Schema({
    vol.Required("entry_id"): str,
    vol.Required("movie_id"): int,
    vol.Optional("delete_files", default=False): bool,
})

_REFRESH_SCHEMA = vol.Schema({
    vol.Required("entry_id"): str,
})


def async_register_services(hass: HomeAssistant) -> None:
    async def handle_add_movie(call: ServiceCall) -> None:
        coordinator = hass.data[DOMAIN].get(call.data["entry_id"])
        if coordinator is None:
            return
        await coordinator.api.add_movie({
            "tmdbId": call.data["tmdb_id"],
            "title": call.data["title"],
            "year": call.data["year"],
            "qualityProfileId": call.data["quality_profile_id"],
            "rootFolderPath": call.data["root_folder"],
            "monitored": call.data["monitored"],
            "addOptions": {"searchForMovie": True},
        })
        await coordinator.async_request_refresh()

    async def handle_delete_movie(call: ServiceCall) -> None:
        coordinator = hass.data[DOMAIN].get(call.data["entry_id"])
        if coordinator is None:
            return
        await coordinator.api.delete_movie(
            call.data["movie_id"], delete_files=call.data["delete_files"]
        )
        await coordinator.async_request_refresh()

    async def handle_refresh_library(call: ServiceCall) -> None:
        coordinator = hass.data[DOMAIN].get(call.data["entry_id"])
        if coordinator is None:
            return
        await coordinator.async_request_refresh()

    hass.services.async_register(DOMAIN, "add_movie", handle_add_movie, _ADD_SCHEMA)
    hass.services.async_register(DOMAIN, "delete_movie", handle_delete_movie, _DELETE_SCHEMA)
    hass.services.async_register(DOMAIN, "refresh_library", handle_refresh_library, _REFRESH_SCHEMA)
