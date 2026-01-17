import axios from 'axios';
import { APIConfig } from '../configs/apiConfig';

// Single consolidated TMDB API instance
export const tmdbApi = axios.create({
  baseURL: APIConfig.TMDB_BASE_URL,
  params: {
    api_key: APIConfig.TMDB_API_KEY,
    language: APIConfig.DEFAULT_LANGUAGE,
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default tmdbApi;
