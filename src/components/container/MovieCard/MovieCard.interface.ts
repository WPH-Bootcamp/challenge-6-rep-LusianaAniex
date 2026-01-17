import type { Movie } from '../../../interfaces/movie';

export interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  trendingRank?: number;
}