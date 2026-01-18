import axios, { AxiosError } from 'axios';
import { APIConfig } from '../configs/apiConfig';
import { toast } from 'sonner';

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

// Request Interceptor - Log outgoing requests in development
tmdbApi.interceptors.request.use(
  (config) => {
    // Log API calls in development mode
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Global error handling
tmdbApi.interceptors.response.use(
  (response) => {
    // Successful response - pass through
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config;

    // Handle different error types with user-friendly messages
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;

      switch (status) {
        case 401:
          toast.error('Authentication failed. Please check your API key.');
          break;
        case 403:
          toast.error('Access forbidden. You do not have permission.');
          break;
        case 404:
          // Don't show toast for 404s as they might be intentional
          console.warn('[API] Resource not found:', error.config?.url);
          break;
        case 429:
          // Rate limiting - retry after delay
          toast.warning('Too many requests. Retrying...');
          if (config && !config.headers['X-Retry-Count']) {
            config.headers['X-Retry-Count'] = '1';
            // Wait 1 second before retrying
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return tmdbApi(config);
          }
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors - retry once
          if (config && !config.headers['X-Retry-Count']) {
            config.headers['X-Retry-Count'] = '1';
            toast.info('Server error. Retrying...');
            // Wait 500ms before retrying
            await new Promise((resolve) => setTimeout(resolve, 500));
            return tmdbApi(config);
          }
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(`Error: ${error.message}`);
      }
    } else if (error.request) {
      // Request made but no response (network error)
      if (config && !config.headers['X-Retry-Count']) {
        config.headers['X-Retry-Count'] = '1';
        toast.info('Network error. Retrying...');
        // Wait 1 second before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return tmdbApi(config);
      }
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export default tmdbApi;
