export interface Movie {
  id: number;
  tmdbId: number;
  title: string;
  year: number;
  overview: string;
  runtime: number;
  genres: string[];
  ratings: {
    imdb?: { value: number; votes: number };
    tmdb?: { value: number; votes: number };
  };
  images: Array<{ coverType: string; remoteUrl: string }>;
  hasFile: boolean;
  monitored: boolean;
  isAvailable: boolean;
  added: string;
  sizeOnDisk: number;
  movieFile?: {
    quality: { quality: { name: string } };
    relativePath: string;
    size: number;
  };
  qualityProfileId?: number;
  studio?: string;
  inLibrary?: boolean;
  inQueue?: boolean;
  queueItem?: {
    size: number;
    sizeleft: number;
    timeleft?: string;
    status: string;
    protocol?: string;
  };
}

export interface QualityProfile {
  id: number;
  name: string;
}

export interface RootFolder {
  path: string;
  freeSpace: number;
}

export interface CardConfig {
  entry_id: string;
  columns?: number;
  default_view?: 'library' | 'search';
  default_sort?: 'title' | 'added' | 'year' | 'status';
  default_filter?: string;
  show_status_badges?: boolean;
  poster_radius?: number;
  card_title?: string;
  page_size?: number;
  show_quality?: boolean;
  show_file_info?: boolean;
  show_filter_counts?: boolean;
  show_refresh_button?: boolean;
  appearance?: 'glass' | 'material';
}
