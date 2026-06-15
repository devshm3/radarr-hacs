# tests/test_config_flow.py
from unittest.mock import patch
import pytest
from homeassistant import config_entries
from custom_components.radarr_hacs.const import DOMAIN


async def test_form_shows_on_init(hass):
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == "form"
    assert result["step_id"] == "user"
    assert "host" in result["data_schema"].schema
    assert "api_key" in result["data_schema"].schema
    assert result["errors"] == {}


async def test_successful_config_creates_entry(hass):
    with patch(
        "custom_components.radarr_hacs.config_flow.RadarrApi.test_connection",
        return_value=True,
    ):
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        result2 = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {"host": "http://localhost:7878", "api_key": "test-key", "name": "My Radarr"},
        )
    assert result2["type"] == "create_entry"
    assert result2["data"]["host"] == "http://localhost:7878"
    assert result2["data"]["api_key"] == "test-key"
    assert result2["data"]["name"] == "My Radarr"


async def test_cannot_connect_shows_error(hass):
    with patch(
        "custom_components.radarr_hacs.config_flow.RadarrApi.test_connection",
        return_value=False,
    ):
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        result2 = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {"host": "http://bad:7878", "api_key": "bad-key", "name": "Radarr"},
        )
    assert result2["type"] == "form"
    assert result2["errors"]["base"] == "cannot_connect"


async def test_connection_exception_shows_error(hass):
    with patch(
        "custom_components.radarr_hacs.config_flow.RadarrApi.test_connection",
        side_effect=OSError("Network unreachable"),
    ):
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        result2 = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {"host": "http://bad:7878", "api_key": "bad-key", "name": "Radarr"},
        )
    assert result2["type"] == "form"
    assert result2["errors"]["base"] == "cannot_connect"


async def test_duplicate_entry_is_aborted(hass):
    with patch(
        "custom_components.radarr_hacs.config_flow.RadarrApi.test_connection",
        return_value=True,
    ):
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {"host": "http://localhost:7878", "api_key": "test-key", "name": "My Radarr"},
        )

        result2 = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        result3 = await hass.config_entries.flow.async_configure(
            result2["flow_id"],
            {"host": "http://localhost:7878", "api_key": "test-key", "name": "My Radarr"},
        )
    assert result3["type"] == "abort"
    assert result3["reason"] == "already_configured"
