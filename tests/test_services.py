# tests/test_services.py
from unittest.mock import AsyncMock, MagicMock
import pytest
from custom_components.radarr_hacs.const import DOMAIN
from custom_components.radarr_hacs import services
from tests.conftest import MOCK_MOVIE


@pytest.fixture
def coordinator_with_api(hass):
    api = MagicMock()
    api.add_movie = AsyncMock(return_value={**MOCK_MOVIE, "id": 99})
    api.delete_movie = AsyncMock(return_value=None)
    coordinator = MagicMock()
    coordinator.api = api
    coordinator.async_request_refresh = AsyncMock()
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["test_entry_id"] = coordinator
    services.async_register_services(hass)
    return coordinator


async def test_add_movie_calls_api_with_correct_payload(hass, coordinator_with_api):
    coordinator = coordinator_with_api
    await hass.services.async_call(
        DOMAIN,
        "add_movie",
        {
            "entry_id": "test_entry_id",
            "tmdb_id": 438631,
            "quality_profile_id": 1,
            "root_folder": "/movies",
            "monitored": True,
        },
        blocking=True,
    )
    coordinator.api.add_movie.assert_awaited_once_with({
        "tmdbId": 438631,
        "qualityProfileId": 1,
        "rootFolderPath": "/movies",
        "monitored": True,
        "addOptions": {"searchForMovie": True},
    })
    coordinator.async_request_refresh.assert_awaited_once()


async def test_delete_movie_calls_api(hass, coordinator_with_api):
    coordinator = coordinator_with_api
    await hass.services.async_call(
        DOMAIN,
        "delete_movie",
        {"entry_id": "test_entry_id", "movie_id": 1, "delete_files": False},
        blocking=True,
    )
    coordinator.api.delete_movie.assert_awaited_once_with(1, delete_files=False)
    coordinator.async_request_refresh.assert_awaited_once()


async def test_refresh_library_triggers_coordinator(hass, coordinator_with_api):
    coordinator = coordinator_with_api
    await hass.services.async_call(
        DOMAIN,
        "refresh_library",
        {"entry_id": "test_entry_id"},
        blocking=True,
    )
    coordinator.async_request_refresh.assert_awaited_once()
