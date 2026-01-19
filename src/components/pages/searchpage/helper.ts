import { searchMovies } from '../../../services/movies/services';

export const performSearch = async (query: string, page: number = 1) => {
  try {
    if (!query.trim()) {
      throw new Error('Search query is required');
    }

    const response = await searchMovies(query, page);
    return response;
  } catch (err) {
    throw err instanceof Error ? err : new Error('Failed to search movies');
  }
};

export const handleSearchError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred while searching';
};