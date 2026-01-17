import React from 'react';
import { IoPlayCircle } from 'react-icons/io5';
import { getImageUrl } from '../../../services/movies/services';
import { Link } from 'react-router-dom';

interface LargeMovieCardProps {
  posterPath: string | null;
  title: string;
  voteAverage: number;
  overview: string;
  onWatchTrailer?: () => void;
  trailerAvailable?: boolean;
  children?: React.ReactNode;
  id: number;
  favoriteButton?: React.ReactNode;
}

const LargeMovieCard: React.FC<LargeMovieCardProps> = ({
  posterPath,
  title,
  voteAverage,
  overview,
  onWatchTrailer,
  trailerAvailable = true,
  children,
  id,
  favoriteButton,
}) => {
  return (
    <div className='relative flex flex-col md:flex-row bg-black rounded-2xl p-4 md:p-8 mb-4 md:mb-8 shadow-lg items-start w-full max-w-4xl mx-auto'>
      {/* Favorite Button - Top Right (Desktop only) */}
      {favoriteButton && (
        <div className='hidden lg:block absolute top-6 right-6 z-10'>
          {favoriteButton}
        </div>
      )}

      {/* Poster */}
      <div className='flex-shrink-0 mb-0 md:mb-0 md:mr-6'>
        <Link
          to={`/movie/${id}`}
          tabIndex={0}
          aria-label={`Go to details for ${title}`}
        >
          <img
            src={getImageUrl(posterPath)}
            alt={title}
            className='w-20 h-28 md:w-40 md:h-60 rounded-lg object-cover shadow-xl hover:opacity-80 transition-opacity duration-200 cursor-pointer'
          />
        </Link>
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col justify-between min-w-0 pl-3 md:pl-0'>
        <div>
          <Link
            to={`/movie/${id}`}
            tabIndex={0}
            aria-label={`Go to details for ${title}`}
          >
            <h2 className='text-base md:text-2xl font-bold text-white mb-1 md:mb-2 line-clamp-2 hover:text-neutral-400 transition-colors duration-200 cursor-pointer'>
              {title}
            </h2>
          </Link>
          <div className='flex items-center gap-1 md:gap-2 mb-2'>
            <span className='text-yellow-400 text-base md:text-lg'>⭐</span>
            <span className='text-white font-semibold text-sm md:text-base'>
              {voteAverage.toFixed(1)}/10
            </span>
          </div>
          <p className='text-neutral-400 text-xs md:text-base mb-3 md:mb-4 line-clamp-2 md:line-clamp-3'>
            {overview}
          </p>
        </div>
        <div className='flex items-center gap-2 md:gap-4 mt-2'>
          <button
            className='bg-primary-300 hover:bg-primary-400 text-white font-semibold rounded-full px-4 md:px-7 py-2 md:py-3 flex items-center gap-1 md:gap-2 text-sm md:text-base shadow-md transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-1 md:flex-initial justify-center'
            onClick={onWatchTrailer}
            disabled={!trailerAvailable}
          >
            Watch Trailer <IoPlayCircle size={18} className='md:hidden' />
            <IoPlayCircle size={22} className='hidden md:block' />
          </button>
          {/* Favorite Button - Inline (Mobile/Tablet only) */}
          {favoriteButton && (
            <div className='lg:hidden flex-shrink-0'>{favoriteButton}</div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default LargeMovieCard;
