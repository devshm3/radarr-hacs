import type { HomeAssistant } from './ha-types.js';
import type { Movie, QualityProfile, RootFolder } from './types.js';

interface GetMoviesOptions {
  filter?: string;
  sort?: string;
  search?: string;
}

export async function getMovies(
  hass: HomeAssistant,
  entryId: string,
  options: GetMoviesOptions = {}
): Promise<Movie[]> {
  const msg: Record<string, unknown> = {
    type: 'radarr_hacs/get_movies',
    entry_id: entryId,
  };
  if (options.filter && options.filter !== 'all') msg['filter'] = options.filter;
  if (options.sort) msg['sort'] = options.sort;
  if (options.search) msg['search'] = options.search;
  const resp = await hass.connection.sendMessagePromise<{ movies: Movie[] }>(msg);
  return resp.movies;
}

export async function searchMovies(
  hass: HomeAssistant,
  entryId: string,
  term: string
): Promise<Movie[]> {
  const resp = await hass.connection.sendMessagePromise<{ results: Movie[] }>({
    type: 'radarr_hacs/search_movies',
    entry_id: entryId,
    term,
  });
  return resp.results.map(m => ({ ...m, inLibrary: (m.id ?? 0) > 0 }));
}

export async function getConfig(
  hass: HomeAssistant,
  entryId: string
): Promise<{ quality_profiles: QualityProfile[]; root_folders: RootFolder[] }> {
  return hass.connection.sendMessagePromise({
    type: 'radarr_hacs/get_config',
    entry_id: entryId,
  });
}

export async function addMovie(
  hass: HomeAssistant,
  entryId: string,
  movie: Movie,
  qualityProfileId: number,
  rootFolder: string,
  monitored = true
): Promise<void> {
  await hass.callService('radarr_hacs', 'add_movie', {
    entry_id: entryId,
    tmdb_id: movie.tmdbId,
    title: movie.title,
    year: movie.year,
    quality_profile_id: qualityProfileId,
    root_folder: rootFolder,
    monitored,
  });
}

export async function deleteMovie(
  hass: HomeAssistant,
  entryId: string,
  movieId: number,
  deleteFiles = false
): Promise<void> {
  await hass.callService('radarr_hacs', 'delete_movie', {
    entry_id: entryId,
    movie_id: movieId,
    delete_files: deleteFiles,
  });
}
