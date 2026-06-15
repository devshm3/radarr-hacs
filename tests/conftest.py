import asyncio
import pathlib

import aiohttp
import pytest
from homeassistant import loader
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.radarr_hacs.const import DOMAIN

pytest_plugins = "pytest_homeassistant_custom_component"

_PROJECT_CC = str(pathlib.Path(__file__).parent.parent / "custom_components")


@pytest.fixture(scope="session", autouse=True)
def prewarm_aiohttp_thread():
    """Start the aiohttp background thread before any test captures the thread list.

    Without this, the first test that uses aiohttp may leave a lingering
    thread that causes verify_cleanup to fail.
    """

    async def _warm():
        conn = aiohttp.TCPConnector()
        await conn.close()

    loop = asyncio.new_event_loop()
    loop.run_until_complete(_warm())
    loop.close()


@pytest.fixture(autouse=True)
def enable_custom_integrations(hass):
    """Make radarr_hacs discoverable by HA's integration loader.

    HA initialises hass.config.config_dir to the plugin's testing_config,
    which causes custom_components to resolve to that directory only.  We
    extend __path__ so the loader can also find integrations in this repo,
    then clear the discovery cache so the next lookup re-scans.
    """
    import custom_components as _cc  # noqa: PLC0415

    if _PROJECT_CC not in _cc.__path__:
        _cc.__path__.append(_PROJECT_CC)

    hass.data.pop(loader.DATA_CUSTOM_COMPONENTS, None)

MOCK_MOVIE = {
    "id": 1,
    "title": "Dune",
    "year": 2021,
    "tmdbId": 438631,
    "status": "released",
    "hasFile": True,
    "monitored": True,
    "isAvailable": True,
    "sizeOnDisk": 10_000_000_000,
    "qualityProfileId": 1,
    "path": "/movies/Dune (2021)",
    "images": [],
    "ratings": {},
    "genres": [],
    "studio": "",
}
MOCK_QUALITY_PROFILE = {"id": 1, "name": "Any"}
MOCK_ROOT_FOLDER = {"id": 1, "path": "/movies", "freeSpace": 500_000_000_000}
MOCK_QUEUE_ITEM = {
    "id": 1,
    "movieId": MOCK_MOVIE["id"],
    "title": "Dune",
    "status": "downloading",
    "timeleft": "00:30:00",
}


@pytest.fixture
def mock_entry():
    return MockConfigEntry(
        domain=DOMAIN,
        data={
            "host": "http://localhost:7878",
            "api_key": "test-api-key",
            "name": "My Radarr",
        },
        entry_id="test_entry_id",
    )
