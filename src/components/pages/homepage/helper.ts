import {
  getNewReleaseMovies,
  getTrendingMovies,
} from '../../../services/movies/services';

export const fetchInitialMovies = async () => {
  try {
    const [trendingResponse, newReleaseResponse] = await Promise.all([
      getTrendingMovies(),
      getNewReleaseMovies(1),
    ]);

    return {
      trendingData: {
        ...trendingResponse,
        results: trendingResponse.results.slice(0, 10),
      },
      newReleaseData: newReleaseResponse,
    };
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error');
  }
};

export const fetchMoreMovies = async (page: number) => {
  try {
    const response = await getNewReleaseMovies(page);
    return response;
  } catch (err) {
    throw err instanceof Error ? err : new Error('Failed to load more movies');
  }
};

export const handleError = (error: unknown): string => {
  return error instanceof Error ? error.message : 'An unknown error occurred';
};