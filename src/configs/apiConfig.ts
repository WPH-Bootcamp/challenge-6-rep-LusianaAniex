export const APIConfig = {
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  DEFAULT_LANGUAGE: 'en-US',
} as const;
