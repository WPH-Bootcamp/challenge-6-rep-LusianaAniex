import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getTrendingMovies,
  getNewReleaseMovies,
} from '../../../services/movies/services';
import type { MovieListResponse } from '../../../interfaces/movie';

export const useHome = () => {
  const trendingQuery = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: getTrendingMovies,
    select: (data: MovieListResponse) => ({
      ...data,
      results: data.results.slice(0, 10),
    }),
  });

  const newReleaseQuery = useInfiniteQuery({
    queryKey: ['newReleaseMovies'],
    queryFn: ({ pageParam = 1 }) => getNewReleaseMovies(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const loadMoreMovies = () => {
    newReleaseQuery.fetchNextPage();
  };

  return {
    trendingMovies: trendingQuery.data?.results || [],
    newReleaseMovies: deduplicateMovies(
      newReleaseQuery.data?.pages.flatMap((page) => page.results) || []
    ),
    loading: trendingQuery.isLoading || newReleaseQuery.isLoading,
    error:
      trendingQuery.error?.message || newReleaseQuery.error?.message || null,
    loadMoreMovies,
    hasMoreMovies: newReleaseQuery.hasNextPage,
  };
};

function deduplicateMovies<T extends { id: number }>(movies: T[]): T[] {
  const seen = new Set<number>();
  return movies.filter((movie) => {
    if (seen.has(movie.id)) {
      return false;
    }
    seen.add(movie.id);
    return true;
  });
}
