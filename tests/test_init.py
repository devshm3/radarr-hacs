from unittest.mock import AsyncMock, MagicMock, patch
import pytest
from custom_components.radarr_hacs.const import DOMAIN
from tests.conftest import MOCK_MOVIE, MOCK_QUALITY_PROFILE, MOCK_ROOT_FOLDER

COORDINATOR_DATA = {
    "movies": [MOCK_MOVIE],
    "quality_profiles": [MOCK_QUALITY_PROFILE],
    "root_folders": [MOCK_ROOT_FOLDER],
}


@pytest.fixture
def mock_coordinator():
    coord = MagicMock()
    coord.async_config_entry_first_refresh = AsyncMock()
    coord.data = COORDINATOR_DATA
    return coord


@pytest.fixture(autouse=True)
def mock_http(hass):
    http = MagicMock()
    http.async_register_static_paths = AsyncMock(return_value=None)
    hass.http = http


async def test_setup_entry_stores_coordinator(hass, mock_entry, mock_coordinator):
    mock_entry.add_to_hass(hass)
    with (
        patch("custom_components.radarr_hacs.RadarrApi"),
        patch("custom_components.radarr_hacs.RadarrCoordinator", return_value=mock_coordinator),
        patch("homeassistant.config_entries.ConfigEntries.async_forward_entry_setups", return_value=True),
    ):
        result = await hass.config_entries.async_setup(mock_entry.entry_id)

    assert result is True
    assert mock_entry.entry_id in hass.data[DOMAIN]


async def test_unload_entry_removes_coordinator(hass, mock_entry, mock_coordinator):
    mock_entry.add_to_hass(hass)
    with (
        patch("custom_components.radarr_hacs.RadarrApi"),
        patch("custom_components.radarr_hacs.RadarrCoordinator", return_value=mock_coordinator),
        patch("homeassistant.config_entries.ConfigEntries.async_forward_entry_setups", return_value=True),
    ):
        await hass.config_entries.async_setup(mock_entry.entry_id)

    with patch("homeassistant.config_entries.ConfigEntries.async_unload_platforms", return_value=True):
        await hass.config_entries.async_unload(mock_entry.entry_id)

    assert mock_entry.entry_id not in hass.data.get(DOMAIN, {})


async def test_setup_entry_propagates_refresh_failure(hass, mock_entry):
    mock_entry.add_to_hass(hass)
    failing_coordinator = MagicMock()
    failing_coordinator.async_config_entry_first_refresh = AsyncMock(
        side_effect=Exception("Radarr unreachable")
    )
    with (
        patch("custom_components.radarr_hacs.RadarrApi"),
        patch("custom_components.radarr_hacs.RadarrCoordinator", return_value=failing_coordinator),
        patch("homeassistant.config_entries.ConfigEntries.async_forward_entry_setups", return_value=True),
    ):
        result = await hass.config_entries.async_setup(mock_entry.entry_id)

    assert result is False
    assert mock_entry.entry_id not in hass.data.get(DOMAIN, {})
