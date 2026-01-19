import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getImageUrl, getMovieDetails } from '../../../services/movies/services';
import type { MovieCardProps } from './MovieCard.interface';

const MovieCardComponent: React.FC<MovieCardProps> = ({
  movie,
  trendingRank = 0,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  /**
   * Prefetch movie details on hover for better perceived performance
   * When user hovers over a card, data loads in background
   */
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['movie', movie.id],
      queryFn: () => getMovieDetails(movie.id),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  return (
    <div 
      className='relative group cursor-pointer' 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className='relative overflow-hidden rounded-lg aspect-[2/3] mb-2'>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          loading='lazy'
        />
      </div>
      <h3
        className="text-base lg:text-lg font-semibold text-neutral-25 line-clamp-1 group-hover:text-primary-300 transition-colors"
      >
        {movie.title}
      </h3>
      <div className="text-sm lg:text-base text-neutral-400">
        ⭐ {movie.vote_average.toFixed(1)}/10
      </div>
      {trendingRank > 0 && (
        <div className='absolute top-2 lg:top-3 left-2 lg:left-3 z-10 w-8 lg:w-12 h-8 lg:h-12 rounded-full bg-neutral-950/60 flex items-center justify-center text-neutral-25 text-lg font-semibold'>
          <span>{trendingRank}</span>
        </div>
      )}
    </div>
  );
};

/**
 * Memoize MovieCard to prevent unnecessary re-renders
 * Only re-renders when movie.id or trendingRank changes
 */
export const MovieCard = React.memo(MovieCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.movie.id === nextProps.movie.id &&
    prevProps.trendingRank === nextProps.trendingRank
  );
});
