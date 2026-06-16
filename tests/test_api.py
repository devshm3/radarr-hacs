import pytest
import aiohttp
from aioresponses import aioresponses
from custom_components.radarr_hacs.api import RadarrApi


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


async def test_delete_movie_with_delete_files(api):
    with aioresponses() as m:
        m.delete(
            "http://localhost:7878/api/v3/movie/1?deleteFiles=true",
            status=200,
            payload={},
        )
        await api.delete_movie(1, delete_files=True)


async def test_delete_movie_ignores_404(api):
    # Movie already gone from Radarr returns 404 — deletion is idempotent and
    # must not raise, so the card can treat it as a successful removal.
    with aioresponses() as m:
        m.delete("http://localhost:7878/api/v3/movie/914", status=404)
        await api.delete_movie(914)


async def test_delete_movie_raises_on_server_error(api):
    # Non-404 errors must still surface so genuine failures aren't swallowed.
    with aioresponses() as m:
        m.delete("http://localhost:7878/api/v3/movie/1", status=500)
        with pytest.raises(aiohttp.ClientResponseError):
            await api.delete_movie(1)


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


async def test_send_command(api):
    with aioresponses() as m:
        m.post(
            "http://localhost:7878/api/v3/command",
            payload={"id": 1, "name": "RescanMovie"},
        )
        result = await api.send_command("RescanMovie", movieId=1)
    assert result["name"] == "RescanMovie"


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


async def test_get_queue(api):
    with aioresponses() as m:
        m.get(
            "http://localhost:7878/api/v3/queue?pageSize=1000",
            payload={"records": [{"id": 1, "movieId": 42}]},
        )
        result = await api.get_queue()
    assert result == [{"id": 1, "movieId": 42}]
