import { APIConfig } from '../../configs/apiConfig';

export const TMDB_ENDPOINTS = {
  MOVIES: {
    POPULAR: '/movie/popular',
    TRENDING: '/trending/movie/day',
    NOW_PLAYING: '/movie/now_playing',
    SEARCH: '/search/movie',
    VIDEOS: (movieId: number) => `/movie/${movieId}/videos`,
    DETAILS: (movieId: number) => `/movie/${movieId}`,
    CREDITS: (movieId: number) => `/movie/${movieId}/credits`,
    GENRES: '/genre/movie/list',
    IMAGES: (movieId: number) => `/movie/${movieId}/images`,
  },
  IMAGES: {
    BASE_URL: APIConfig.TMDB_IMAGE_BASE_URL,
    POSTER_SIZES: {
      SMALL: 'w185',
      MEDIUM: 'w342',
      LARGE: 'w780',
      ORIGINAL: 'original',
    },
  },
};
