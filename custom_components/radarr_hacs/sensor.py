# custom_components/radarr_hacs/sensor.py
from __future__ import annotations

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import RadarrCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    coordinator: RadarrCoordinator = hass.data[DOMAIN][entry.entry_id]
    name = entry.data["name"]
    async_add_entities([
        RadarrTotalSensor(coordinator, entry.entry_id, name),
        RadarrMissingSensor(coordinator, entry.entry_id, name),
        RadarrDownloadingSensor(coordinator, entry.entry_id, name),
    ])


class RadarrTotalSensor(CoordinatorEntity, SensorEntity):
    _attr_icon = "mdi:filmstrip"

    def __init__(self, coordinator: RadarrCoordinator, entry_id: str, display_name: str) -> None:
        super().__init__(coordinator)
        self._attr_name = f"{display_name} Total Movies"
        self._attr_unique_id = f"{entry_id}_total_movies"

    @property
    def native_value(self) -> int:
        return len(self.coordinator.data["movies"])


class RadarrMissingSensor(CoordinatorEntity, SensorEntity):
    _attr_icon = "mdi:filmstrip-off"

    def __init__(self, coordinator: RadarrCoordinator, entry_id: str, display_name: str) -> None:
        super().__init__(coordinator)
        self._attr_name = f"{display_name} Missing Movies"
        self._attr_unique_id = f"{entry_id}_missing_movies"

    @property
    def native_value(self) -> int:
        return sum(
            1
            for m in self.coordinator.data["movies"]
            if not m.get("hasFile") and m.get("monitored")
        )


class RadarrDownloadingSensor(CoordinatorEntity, SensorEntity):
    _attr_icon = "mdi:download"

    def __init__(self, coordinator: RadarrCoordinator, entry_id: str, display_name: str) -> None:
        super().__init__(coordinator)
        self._attr_name = f"{display_name} Downloading"
        self._attr_unique_id = f"{entry_id}_downloading_movies"

    @property
    def native_value(self) -> int:
        return sum(
            1
            for m in self.coordinator.data["movies"]
            if not m.get("hasFile") and not m.get("isAvailable", False)
        )
