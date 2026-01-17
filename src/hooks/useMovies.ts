// src/hooks/useMovies.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getTrendingMovies,
  getNewReleaseMovies,
  searchMovies as searchMoviesService,
  getMovieDetails,
} from '../services/movies/services';

// Hook for fetching movies by category
export const useMovies = (category: string = 'popular', page: number = 1) => {
  return useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => {
      // Map category to appropriate service function
      if (category === 'trending') return getTrendingMovies();
      if (category === 'now_playing') return getNewReleaseMovies(page);
      return getNewReleaseMovies(page); // Default to new releases
    },
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching movie details
export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for searching movies
export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchMoviesService(query, page),
    enabled: !!query,
    placeholderData: (previousData) => previousData,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

// Helper function for prefetching
export const prefetchMovies = async (
  queryClient: ReturnType<typeof useQueryClient>,
  category: string,
  page: number
) => {
  await queryClient.prefetchQuery({
    queryKey: ['movies', category, page],
    queryFn: () => getNewReleaseMovies(page),
  });
};
