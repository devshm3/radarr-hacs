# tests/test_coordinator.py
import asyncio
from unittest.mock import AsyncMock, MagicMock
import pytest
from homeassistant.config_entries import ConfigEntryState
from homeassistant.helpers.update_coordinator import UpdateFailed
from pytest_homeassistant_custom_component.common import MockConfigEntry
from custom_components.radarr_hacs.coordinator import RadarrCoordinator
from tests.conftest import MOCK_MOVIE, MOCK_QUALITY_PROFILE, MOCK_ROOT_FOLDER


def make_api(movies=None, profiles=None, folders=None):
    api = MagicMock()
    api.get_movies = AsyncMock(return_value=movies if movies is not None else [MOCK_MOVIE])
    api.get_quality_profiles = AsyncMock(return_value=profiles if profiles is not None else [MOCK_QUALITY_PROFILE])
    api.get_root_folders = AsyncMock(return_value=folders if folders is not None else [MOCK_ROOT_FOLDER])
    return api


def make_coordinator(hass, api, poll_interval=30):
    """Create a coordinator with a config entry set to SETUP_IN_PROGRESS."""
    coordinator = RadarrCoordinator(hass, api, poll_interval=poll_interval)
    entry = MockConfigEntry(state=ConfigEntryState.SETUP_IN_PROGRESS)
    coordinator.config_entry = entry
    return coordinator


async def test_coordinator_fetches_all_data(hass):
    api = make_api()
    coordinator = make_coordinator(hass, api)
    await coordinator.async_config_entry_first_refresh()

    assert coordinator.data["movies"] == [MOCK_MOVIE]
    assert coordinator.data["quality_profiles"] == [MOCK_QUALITY_PROFILE]
    assert coordinator.data["root_folders"] == [MOCK_ROOT_FOLDER]
    api.get_movies.assert_awaited_once()
    api.get_quality_profiles.assert_awaited_once()
    api.get_root_folders.assert_awaited_once()


async def test_coordinator_raises_update_failed_on_error(hass):
    api = MagicMock()
    api.get_movies = AsyncMock(side_effect=Exception("connection refused"))
    api.get_quality_profiles = AsyncMock(return_value=[])
    api.get_root_folders = AsyncMock(return_value=[])
    coordinator = make_coordinator(hass, api)

    # async_config_entry_first_refresh converts UpdateFailed → ConfigEntryNotReady.
    # Use async_refresh to verify _async_update_data raises UpdateFailed directly.
    await coordinator.async_refresh()
    assert isinstance(coordinator.last_exception, UpdateFailed)
    assert not coordinator.last_update_success


async def test_coordinator_fetches_in_parallel(hass):
    call_order = []

    async def slow_movies():
        await asyncio.sleep(0.05)
        call_order.append("movies")
        return [MOCK_MOVIE]

    async def fast_profiles():
        call_order.append("profiles")
        return [MOCK_QUALITY_PROFILE]

    async def fast_folders():
        call_order.append("folders")
        return [MOCK_ROOT_FOLDER]

    api = MagicMock()
    api.get_movies = slow_movies
    api.get_quality_profiles = fast_profiles
    api.get_root_folders = fast_folders

    coordinator = make_coordinator(hass, api)
    await coordinator.async_config_entry_first_refresh()

    assert call_order.index("profiles") < call_order.index("movies")
