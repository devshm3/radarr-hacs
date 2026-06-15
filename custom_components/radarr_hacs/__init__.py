from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import Event, HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import RadarrApi
from .const import DEFAULT_POLL_INTERVAL, DOMAIN
from .coordinator import RadarrCoordinator
from . import services, websocket_api

_LOGGER = logging.getLogger(__name__)
_CARD_VERSION = "3"
_CARD_URL = f"/{DOMAIN}/radarr-hacs-card.js?v={_CARD_VERSION}"

PLATFORMS = ["sensor"]


async def _async_register_lovelace_resource(hass: HomeAssistant) -> None:
    """Register the Lovelace card JS resource (best-effort, storage-mode only)."""
    try:
        lovelace_data = hass.data.get("lovelace")
        if not lovelace_data:
            return
        resources = lovelace_data.get("resources")
        if resources is None:
            return
        info = await resources.async_get_info()
        # Handle both dict {"resources": [...]} and list return shapes across HA versions
        if isinstance(info, dict):
            items = info.get("resources", [])
        elif isinstance(info, list):
            items = info
        else:
            return
        stale_prefix = f"/{DOMAIN}/radarr-hacs-card.js"
        for r in items:
            if not isinstance(r, dict):
                continue
            url = r.get("url", "")
            if url.startswith(stale_prefix) and url != _CARD_URL:
                try:
                    await resources.async_delete_item(r["id"])
                    _LOGGER.debug("Removed stale Lovelace resource: %s", url)
                except Exception:  # noqa: BLE001
                    pass
        registered = {r.get("url", "") for r in items if isinstance(r, dict)}
        if _CARD_URL not in registered:
            await resources.async_create_item({"res_type": "module", "url": _CARD_URL})
            _LOGGER.debug("Registered Lovelace resource: %s", _CARD_URL)
    except Exception:  # noqa: BLE001
        _LOGGER.debug(
            "Could not auto-register Lovelace resource %s — add it manually", _CARD_URL
        )


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    hass.data.setdefault(DOMAIN, {})
    await hass.http.async_register_static_paths(
        [StaticPathConfig(f"/{DOMAIN}", str(Path(__file__).parent / "www"), cache_headers=True)]
    )
    websocket_api.async_register_commands(hass)
    services.async_register_services(hass)

    async def _on_ha_started(_event: Event) -> None:
        await _async_register_lovelace_resource(hass)

    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, _on_ha_started)
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
