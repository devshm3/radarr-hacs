import pytest
import aiohttp
from aioresponses import aioresponses
from custom_components.radarr_hacs.api import RadarrApi


@pytest.fixture(scope="session", autouse=True)
def prewarm_aiohttp_thread():
    """Create and immediately close a TCPConnector so aiohttp's background thread
    is started before any test's verify_cleanup fixture captures threads_before."""
    import asyncio
    import threading

    async def _warm():
        conn = aiohttp.TCPConnector()
        await conn.close()

    loop = asyncio.new_event_loop()
    loop.run_until_complete(_warm())
    loop.close()


@pytest.fixture
async def api():
    session = aiohttp.ClientSession()
    client = RadarrApi("http://localhost:7878", "test-key", session)
    yield client
    await session.close()


async def test_get_movies_returns_list(api):
    with aioresponses() as m:
        m.get(
            "http://localhost:7878/api/v3/movie",
            payload=[{"id": 1, "title": "Dune"}],
        )
        result = await api.get_movies()
    assert result == [{"id": 1, "title": "Dune"}]


async def test_get_movies_raises_on_auth_error(api):
    with aioresponses() as m:
        m.get("http://localhost:7878/api/v3/movie", status=401)
        with pytest.raises(aiohttp.ClientResponseError):
            await api.get_movies()


async def test_search_movies(api):
    with aioresponses() as m:
        m.get(
            "http://localhost:7878/api/v3/movie/lookup?term=Dune",
            payload=[{"tmdbId": 438631, "title": "Dune"}],
        )
        result = await api.search_movies("Dune")
    assert result[0]["tmdbId"] == 438631


async def test_add_movie(api):
    payload = {"tmdbId": 438631, "qualityProfileId": 1, "rootFolderPath": "/movies"}
    with aioresponses() as m:
        m.post(
            "http://localhost:7878/api/v3/movie",
            payload={"id": 1, "title": "Dune", **payload},
        )
        result = await api.add_movie(payload)
    assert result["id"] == 1


async def test_delete_movie(api):
    with aioresponses() as m:
        m.delete(
            "http://localhost:7878/api/v3/movie/1",
            status=200,
            payload={},
        )
        await api.delete_movie(1, delete_files=False)


async def test_get_quality_profiles(api):
    with aioresponses() as m:
        m.get(
            "http://localhost:7878/api/v3/qualityprofile",
            payload=[{"id": 1, "name": "Any"}],
        )
        result = await api.get_quality_profiles()
    assert result[0]["name"] == "Any"


async def test_get_root_folders(api):
    with aioresponses() as m:
        m.get(
            "http://localhost:7878/api/v3/rootfolder",
            payload=[{"id": 1, "path": "/movies"}],
        )
        result = await api.get_root_folders()
    assert result[0]["path"] == "/movies"


async def test_test_connection_returns_true_on_success(api):
    with aioresponses() as m:
        m.get(
            "http://localhost:7878/api/v3/system/status",
            payload={"version": "5.0.0"},
        )
        result = await api.test_connection()
    assert result is True


async def test_test_connection_returns_false_on_error(api):
    with aioresponses() as m:
        m.get("http://localhost:7878/api/v3/system/status", status=401)
        result = await api.test_connection()
    assert result is False
