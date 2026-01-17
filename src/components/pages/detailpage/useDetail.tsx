import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieTrailer,
  getGenres,
  type CastMember,
  type CrewMember,
  type Genre,
} from '../../../services/movies/services';
import type { Movie } from '../../../interfaces/movie';

interface UseDetailResult {
  loading: boolean;
  error: string | null;
  movie: Movie | null;
  trailerKey: string | null;
  cast: CastMember[];
  crew: CrewMember[];
  genres: Genre[];
}

export const useDetail = (): UseDetailResult => {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const movieQuery = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  });

  const creditsQuery = useQuery({
    queryKey: ['movieCredits', movieId],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    select: (data) => ({
      cast: data.cast.slice(0, 5),
      crew: data.crew.slice(0, 5),
    }),
  });

  const trailerQuery = useQuery({
    queryKey: ['movieTrailer', movieId],
    queryFn: () => getMovieTrailer(movieId),
    enabled: !!movieId,
  });

  const genresQuery = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    select: (data) => data.genres,
  });

  const loading =
    movieQuery.isLoading ||
    creditsQuery.isLoading ||
    trailerQuery.isLoading ||
    genresQuery.isLoading;
  const error =
    movieQuery.error?.message ||
    creditsQuery.error?.message ||
    trailerQuery.error?.message ||
    genresQuery.error?.message ||
    null;

  return {
    loading,
    error,
    movie: movieQuery.data || null,
    trailerKey: trailerQuery.data || null,
    cast: creditsQuery.data?.cast || [],
    crew: creditsQuery.data?.crew || [],
    genres: genresQuery.data || [],
  };
};
