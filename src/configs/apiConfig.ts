// Validate required environment variables at startup
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error(
    '❌ VITE_TMDB_API_KEY is not defined. Please check your .env file and ensure it contains:\nVITE_TMDB_API_KEY=your_api_key_here'
  );
}

export const APIConfig = {
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  DEFAULT_LANGUAGE: 'en-US',
} as const;
