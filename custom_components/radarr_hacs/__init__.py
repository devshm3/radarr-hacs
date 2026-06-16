from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import RadarrApi
from .const import DEFAULT_POLL_INTERVAL, DOMAIN
from .coordinator import RadarrCoordinator
from . import services, websocket_api

_LOGGER = logging.getLogger(__name__)
_CARD_VERSION = "13"
_CARD_URL = f"/{DOMAIN}/radarr-hacs-card.js?v={_CARD_VERSION}"

PLATFORMS = ["sensor"]


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    hass.data.setdefault(DOMAIN, {})
    await hass.http.async_register_static_paths(
        [StaticPathConfig(f"/{DOMAIN}", str(Path(__file__).parent / "www"), cache_headers=True)]
    )
    add_extra_js_url(hass, _CARD_URL)
    websocket_api.async_register_commands(hass)
    services.async_register_services(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    session = async_get_clientsession(hass)
    api = RadarrApi(entry.data["host"], entry.data["api_key"], session)
    coordinator = RadarrCoordinator(hass, api, DEFAULT_POLL_INTERVAL)
    await coordinator.async_config_entry_first_refresh()
    hass.data[DOMAIN][entry.entry_id] = coordinator
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id)
    return unload_ok
