# tests/test_sensor.py
from unittest.mock import MagicMock
from custom_components.radarr_hacs.sensor import (
    RadarrDownloadingSensor,
    RadarrMissingSensor,
    RadarrTotalSensor,
)
from tests.conftest import MOCK_MOVIE, MOCK_QUALITY_PROFILE, MOCK_ROOT_FOLDER


def make_coordinator(movies, queue=None):
    coordinator = MagicMock()
    coordinator.data = {
        "movies": movies,
        "quality_profiles": [MOCK_QUALITY_PROFILE],
        "root_folders": [MOCK_ROOT_FOLDER],
        "queue": queue if queue is not None else [],
    }
    return coordinator


def test_total_sensor_counts_all_movies():
    coordinator = make_coordinator([MOCK_MOVIE, {**MOCK_MOVIE, "id": 2}])
    s = RadarrTotalSensor(coordinator, "entry1", "My Radarr")
    assert s.native_value == 2
    assert s.unique_id == "entry1_total_movies"
    assert s.name == "My Radarr Total Movies"


def test_missing_sensor_counts_monitored_without_file():
    movies = [
        MOCK_MOVIE,  # hasFile=True, monitored=True — not missing
        {**MOCK_MOVIE, "id": 2, "hasFile": False, "monitored": True},   # missing
        {**MOCK_MOVIE, "id": 3, "hasFile": False, "monitored": False},  # unmonitored — not counted
    ]
    coordinator = make_coordinator(movies)
    s = RadarrMissingSensor(coordinator, "entry1", "My Radarr")
    assert s.native_value == 1
    assert s.unique_id == "entry1_missing_movies"


def test_downloading_sensor_counts_unavailable_without_file():
    movies = [
        MOCK_MOVIE,  # hasFile=True — not downloading
        {**MOCK_MOVIE, "id": 2, "hasFile": False, "isAvailable": False},  # in queue — downloading
        {**MOCK_MOVIE, "id": 3, "hasFile": False, "isAvailable": True},   # missing, not in queue
    ]
    coordinator = make_coordinator(movies, queue=[{"movieId": 2}])
    s = RadarrDownloadingSensor(coordinator, "entry1", "My Radarr")
    assert s.native_value == 1
    assert s.unique_id == "entry1_downloading_movies"
