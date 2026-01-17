import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../../services/movies/services';

export const useSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchQuery = useInfiniteQuery({
    queryKey: ['searchMovies', query],
    queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam),
    enabled: !!query && /[a-zA-Z0-9]/.test(query),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const loadMoreResults = () => {
    searchQuery.fetchNextPage();
  };

  const searchResults = deduplicateMovies(
    searchQuery.data?.pages.flatMap((page) => page.results) || []
  );
  const totalResults = searchQuery.data?.pages[0]?.total_results || 0;
  const hasMoreResults = searchQuery.hasNextPage;

  return {
    query,
    searchResults,
    totalResults,
    loading: searchQuery.isLoading,
    error: searchQuery.error?.message || null,
    hasMoreResults,
    loadMoreResults,
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
