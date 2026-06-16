from __future__ import annotations

import aiohttp


class RadarrApi:
    def __init__(self, host: str, api_key: str, session: aiohttp.ClientSession) -> None:
        self._base = host.rstrip("/") + "/api/v3"
        self._headers = {"X-Api-Key": api_key}
        self._session = session

    async def _request(self, method: str, endpoint: str, **kwargs):
        url = f"{self._base}{endpoint}"
        async with self._session.request(
            method, url, headers=self._headers, **kwargs
        ) as resp:
            resp.raise_for_status()
            if resp.status == 204:
                return None
            try:
                return await resp.json()
            except aiohttp.ContentTypeError:
                # Some endpoints (e.g. DELETE) return 200 with an empty or
                # non-JSON body — nothing to decode.
                return None

    async def get_movies(self) -> list[dict]:
        return await self._request("GET", "/movie")

    async def search_movies(self, term: str) -> list[dict]:
        return await self._request("GET", "/movie/lookup", params={"term": term})

    async def add_movie(self, payload: dict) -> dict:
        return await self._request("POST", "/movie", json=payload)

    async def delete_movie(self, movie_id: int, delete_files: bool = False) -> None:
        params = {"deleteFiles": "true"} if delete_files else None
        try:
            await self._request("DELETE", f"/movie/{movie_id}", params=params)
        except aiohttp.ClientResponseError as err:
            # A 404 means the movie is already gone — the desired end state.
            # Treat deletion as idempotent so the card reports success and refreshes.
            if err.status != 404:
                raise

    async def send_command(self, name: str, **kwargs) -> dict:
        return await self._request("POST", "/command", json={"name": name, **kwargs})

    async def get_quality_profiles(self) -> list[dict]:
        return await self._request("GET", "/qualityprofile")

    async def get_root_folders(self) -> list[dict]:
        return await self._request("GET", "/rootfolder")

    async def get_queue(self) -> list[dict]:
        data = await self._request("GET", "/queue", params={"pageSize": 1000})
        return data.get("records", []) if data else []

    async def toggle_monitored(self, movie_id: int, monitored: bool) -> None:
        movie = await self._request("GET", f"/movie/{movie_id}")
        movie["monitored"] = monitored
        await self._request("PUT", f"/movie/{movie_id}", json=movie)

    async def trigger_search(self, movie_id: int) -> None:
        await self.send_command("MoviesSearch", movieIds=[movie_id])

    async def test_connection(self) -> bool:
        try:
            await self._request("GET", "/system/status")
            return True
        except aiohttp.ClientError:
            return False
