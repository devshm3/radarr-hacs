"""Root conftest — make custom_components from this repo visible to HA's loader."""
import pathlib
import sys

import custom_components

# When pytest_homeassistant_custom_component inserts its testing_config on sys.path,
# the `custom_components` package resolves to testing_config/custom_components only.
# Append the project's own custom_components directory so HA's integration loader
# can discover radarr_hacs.
_project_cc = str(pathlib.Path(__file__).parent / "custom_components")
if _project_cc not in custom_components.__path__:
    custom_components.__path__.append(_project_cc)
