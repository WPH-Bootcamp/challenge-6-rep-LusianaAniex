export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  runtime?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  tagline?: string;
  trailer_key?: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
  tagline: string;
}

export interface ApiResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface MovieDetailData {
  movie: MovieDetails | null;
  trailerKey: string | null;
  credits: unknown;
  images: unknown;
  isLoading: boolean;
  error: string | null;
}

interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MovieListResponse = PaginatedResponse<Movie>;
