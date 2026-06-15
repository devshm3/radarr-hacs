# tests/test_websocket_api.py
from unittest.mock import AsyncMock, MagicMock
import pytest
from custom_components.radarr_hacs.const import DOMAIN
from custom_components.radarr_hacs import websocket_api
from tests.conftest import MOCK_MOVIE, MOCK_QUALITY_PROFILE, MOCK_ROOT_FOLDER


@pytest.fixture
async def ws_client(hass, hass_ws_client):
    coordinator = MagicMock()
    coordinator.data = {
        "movies": [MOCK_MOVIE],
        "quality_profiles": [MOCK_QUALITY_PROFILE],
        "root_folders": [MOCK_ROOT_FOLDER],
    }
    coordinator.api = MagicMock()
    coordinator.api.search_movies = AsyncMock(
        return_value=[{"tmdbId": 999, "title": "New Movie"}]
    )
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["test_entry_id"] = coordinator
    websocket_api.async_register_commands(hass)
    return await hass_ws_client(hass)


async def test_get_movies_returns_cached_movies(ws_client):
    await ws_client.send_json(
        {"id": 1, "type": "radarr_hacs/get_movies", "entry_id": "test_entry_id"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    assert msg["result"]["movies"][0]["title"] == "Dune"


async def test_get_movies_filters_by_search_term(ws_client):
    await ws_client.send_json(
        {"id": 2, "type": "radarr_hacs/get_movies", "entry_id": "test_entry_id", "search": "dune"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    assert len(msg["result"]["movies"]) == 1

    await ws_client.send_json(
        {"id": 3, "type": "radarr_hacs/get_movies", "entry_id": "test_entry_id", "search": "zzznomatch"}
    )
    msg = await ws_client.receive_json()
    assert msg["result"]["movies"] == []


async def test_get_movies_unknown_entry_returns_error(ws_client):
    await ws_client.send_json(
        {"id": 4, "type": "radarr_hacs/get_movies", "entry_id": "nonexistent"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is False


async def test_search_movies_calls_api_and_annotates_library(ws_client):
    await ws_client.send_json(
        {"id": 5, "type": "radarr_hacs/search_movies", "entry_id": "test_entry_id", "term": "inception"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    result = msg["result"]["results"][0]
    assert result["tmdbId"] == 999
    assert result["inLibrary"] is False


async def test_search_movies_marks_in_library_movies(ws_client):
    await ws_client.send_json(
        {"id": 6, "type": "radarr_hacs/search_movies", "entry_id": "test_entry_id", "term": "dune"}
    )
    # The mock returns tmdbId 999 which is not in library (MOCK_MOVIE has tmdbId 438631)
    msg = await ws_client.receive_json()
    assert msg["result"]["results"][0]["inLibrary"] is False


async def test_get_config_returns_profiles_and_folders(ws_client):
    await ws_client.send_json(
        {"id": 7, "type": "radarr_hacs/get_config", "entry_id": "test_entry_id"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    assert msg["result"]["quality_profiles"][0]["name"] == "Any"
    assert msg["result"]["root_folders"][0]["path"] == "/movies"
