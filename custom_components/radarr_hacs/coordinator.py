# custom_components/radarr_hacs/coordinator.py
from __future__ import annotations

import asyncio
import logging
from datetime import timedelta

from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import RadarrApi

_LOGGER = logging.getLogger(__name__)


class RadarrCoordinator(DataUpdateCoordinator):
    def __init__(self, hass: HomeAssistant, api: RadarrApi, poll_interval: int) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name="Radarr",
            update_interval=timedelta(seconds=poll_interval),
        )
        self.api = api

    async def _async_update_data(self) -> dict:
        try:
            movies, quality_profiles, root_folders = await asyncio.gather(
                self.api.get_movies(),
                self.api.get_quality_profiles(),
                self.api.get_root_folders(),
            )
            return {
                "movies": movies,
                "quality_profiles": quality_profiles,
                "root_folders": root_folders,
            }
        except Exception as err:
            raise UpdateFailed(f"Error communicating with Radarr: {err}") from err
