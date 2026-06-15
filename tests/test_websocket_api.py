from unittest.mock import AsyncMock, MagicMock
import pytest
from custom_components.radarr_hacs.const import DOMAIN
from custom_components.radarr_hacs import websocket_api
from tests.conftest import MOCK_MOVIE, MOCK_QUALITY_PROFILE, MOCK_ROOT_FOLDER

_MISSING_MOVIE = {**MOCK_MOVIE, "id": 2, "hasFile": False, "isAvailable": False}
_AVAILABLE_MOVIE = {**MOCK_MOVIE, "id": 3, "hasFile": True}


@pytest.fixture
async def ws_client(hass, hass_ws_client):
    coordinator = MagicMock()
    coordinator.data = {
        "movies": [MOCK_MOVIE, _MISSING_MOVIE],
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
    assert len(msg["result"]["movies"]) == 2

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


async def test_get_movies_filter_available(ws_client):
    await ws_client.send_json(
        {"id": 10, "type": "radarr_hacs/get_movies", "entry_id": "test_entry_id", "filter": "available"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    assert all(m["hasFile"] for m in msg["result"]["movies"])
    assert len(msg["result"]["movies"]) == 1


async def test_get_movies_filter_missing(ws_client):
    await ws_client.send_json(
        {"id": 11, "type": "radarr_hacs/get_movies", "entry_id": "test_entry_id", "filter": "missing"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    assert all(not m["hasFile"] and m["monitored"] for m in msg["result"]["movies"])
    assert len(msg["result"]["movies"]) == 1


async def test_get_movies_filter_downloading(ws_client):
    await ws_client.send_json(
        {"id": 12, "type": "radarr_hacs/get_movies", "entry_id": "test_entry_id", "filter": "downloading"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    assert all(not m["hasFile"] and not m["isAvailable"] for m in msg["result"]["movies"])
    assert len(msg["result"]["movies"]) == 1


async def test_search_movies_not_in_library(ws_client):
    await ws_client.send_json(
        {"id": 5, "type": "radarr_hacs/search_movies", "entry_id": "test_entry_id", "term": "inception"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    result = msg["result"]["results"][0]
    assert result["tmdbId"] == 999
    assert result["inLibrary"] is False


async def test_search_movies_in_library(hass, hass_ws_client):
    coordinator = MagicMock()
    coordinator.data = {
        "movies": [MOCK_MOVIE],
        "quality_profiles": [MOCK_QUALITY_PROFILE],
        "root_folders": [MOCK_ROOT_FOLDER],
    }
    coordinator.api = MagicMock()
    coordinator.api.search_movies = AsyncMock(
        return_value=[{"tmdbId": MOCK_MOVIE["tmdbId"], "title": "Dune"}]
    )
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["test_entry_id"] = coordinator
    websocket_api.async_register_commands(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {"id": 6, "type": "radarr_hacs/search_movies", "entry_id": "test_entry_id", "term": "dune"}
    )
    msg = await client.receive_json()
    assert msg["result"]["results"][0]["inLibrary"] is True


async def test_search_movies_api_error(hass, hass_ws_client):
    coordinator = MagicMock()
    coordinator.data = {
        "movies": [MOCK_MOVIE],
        "quality_profiles": [MOCK_QUALITY_PROFILE],
        "root_folders": [MOCK_ROOT_FOLDER],
    }
    coordinator.api = MagicMock()
    coordinator.api.search_movies = AsyncMock(side_effect=Exception("Radarr down"))
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["test_entry_id"] = coordinator
    websocket_api.async_register_commands(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {"id": 8, "type": "radarr_hacs/search_movies", "entry_id": "test_entry_id", "term": "dune"}
    )
    msg = await client.receive_json()
    assert msg["success"] is False


async def test_get_config_returns_profiles_and_folders(ws_client):
    await ws_client.send_json(
        {"id": 7, "type": "radarr_hacs/get_config", "entry_id": "test_entry_id"}
    )
    msg = await ws_client.receive_json()
    assert msg["success"] is True
    assert msg["result"]["quality_profiles"][0]["name"] == "Any"
    assert msg["result"]["root_folders"][0]["path"] == "/movies"
