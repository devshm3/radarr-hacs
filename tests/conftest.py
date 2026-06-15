import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
from custom_components.radarr_hacs.const import DOMAIN

pytest_plugins = "pytest_homeassistant_custom_component"

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
}
MOCK_QUALITY_PROFILE = {"id": 1, "name": "Any"}
MOCK_ROOT_FOLDER = {"id": 1, "path": "/movies", "freeSpace": 500_000_000_000}


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
