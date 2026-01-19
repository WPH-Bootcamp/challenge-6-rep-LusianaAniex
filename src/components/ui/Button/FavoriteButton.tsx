import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import type { Movie } from '../../../interfaces/movie';

interface FavoriteButtonProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
  className = '',
}) => {
  return (
    <button
      onClick={() => onToggleFavorite(movie)}
      className={`w-11 h-11 lg:w-13 lg:h-13 flex-shrink-0 flex items-center justify-center rounded-full border border-neutral-900 bg-neutral-950/60 hover: transition-colors duration-200 focus:outline-none focus:ring-0 ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <FaHeart className='text-red-500 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]' />
      ) : (
        <FaRegHeart className='text-neutral-900 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]' />
      )}
    </button>
  );
};
