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

// Credits interfaces
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order?: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department?: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// Images interfaces
export interface ImageData {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

export interface ImagesResponse {
  id: number;
  backdrops: ImageData[];
  posters: ImageData[];
  logos?: ImageData[];
}

export interface MovieDetailData {
  movie: MovieDetails | null;
  trailerKey: string | null;
  credits: CreditsResponse;
  images: ImagesResponse | null;
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
