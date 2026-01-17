import { tmdbApi } from '../api';
import { TMDB_ENDPOINTS } from './endpoints';
import type { MovieListResponse, Movie } from '../../interfaces/movie';

export const getTrendingMovies = (): Promise<MovieListResponse> =>
  tmdbApi.get(TMDB_ENDPOINTS.MOVIES.TRENDING).then(({ data }) => data);

export const getNewReleaseMovies = (
  page: number = 1
): Promise<MovieListResponse> =>
  tmdbApi
    .get(TMDB_ENDPOINTS.MOVIES.NOW_PLAYING, { params: { page } })
    .then(({ data }) => data);

export const searchMovies = (
  query: string,
  page: number = 1
): Promise<MovieListResponse> => {
  return tmdbApi
    .get(TMDB_ENDPOINTS.MOVIES.SEARCH, {
      params: {
        query,
        page,
        include_adult: false,
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error('Error searching movies:', error);
      throw error;
    });
};

const FALLBACK_IMAGE = 'https://via.placeholder.com/180x270?text=No+Poster';

export const getImageUrl = (
  path: string | null,
  size = TMDB_ENDPOINTS.IMAGES.POSTER_SIZES.MEDIUM
): string =>
  path ? `${TMDB_ENDPOINTS.IMAGES.BASE_URL}${size}${path}` : FALLBACK_IMAGE;

interface VideoResponse {
  id: number;
  results: Array<{
    key: string;
    site: string;
    type: string;
  }>;
}

export const getMovieTrailer = async (
  movieId: number
): Promise<string | null> => {
  try {
    const { data } = await tmdbApi.get<VideoResponse>(
      TMDB_ENDPOINTS.MOVIES.VIDEOS(movieId)
    );
    const trailer = data.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );
    return trailer?.key || null;
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    return null;
  }
};

export const getMovieDetails = (movieId: number): Promise<Movie> =>
  tmdbApi.get(TMDB_ENDPOINTS.MOVIES.DETAILS(movieId)).then(({ data }) => data);

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export const getMovieCredits = (movieId: number): Promise<CreditsResponse> =>
  tmdbApi.get(TMDB_ENDPOINTS.MOVIES.CREDITS(movieId)).then(({ data }) => data);

export interface Genre {
  id: number;
  name: string;
}

export interface GenreListResponse {
  genres: Genre[];
}

export const getGenres = (): Promise<GenreListResponse> =>
  tmdbApi.get(TMDB_ENDPOINTS.MOVIES.GENRES).then(({ data }) => data);
