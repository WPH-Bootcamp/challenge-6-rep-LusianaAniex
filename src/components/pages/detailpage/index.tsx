import React, { useCallback, useMemo } from 'react';
import { useDetail } from './useDetail';
import { getImageUrl } from '../../../services/movies/services';
import Button from '../../ui/Button';
import { IoPlayCircle } from 'react-icons/io5';
import { VideoModal } from '../../ui/VideoModal';
import CastCard from '../../container/CastCard';
import { useFavorite } from '../favouritepage/useFavorite';
import { toast } from 'react-hot-toast';
import { AppToaster } from '../../ui/Toast/Toaster';
import { SkeletonDetail } from '../../ui/Skeleton';
import { FavoriteButton } from '../../ui/Button/FavoriteButton';
import { formatDate } from '../../../utils/dateUtils';
import { getGenreNames } from '../../../utils/genreUtils';
import { APP_CONSTANTS } from '../../../constants/app';

const MovieDetailpage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { loading, error, movie, trailerKey, cast, crew, genres } = useDetail();
  const { isFavorite: isMovieFavorite, toggleFavorite } = useFavorite();

  // Memoize computed values to prevent recalculation on every render
  // Use optional chaining to handle null/undefined safely
  const genreNames = useMemo(
    () => (movie && genres ? getGenreNames(movie, genres) : []),
    [movie, genres]
  );

  // Memoize event handlers to prevent recreation on every render
  const handleWatchTrailer = useCallback(() => {
    if (trailerKey) setIsModalOpen(true);
  }, [trailerKey]);

  const handleFavoriteClick = useCallback(
    (favoriteMovie: typeof movie) => {
      if (!favoriteMovie) return;
      const wasFavorite = isMovieFavorite(favoriteMovie.id);
      toggleFavorite(favoriteMovie);
      toast(
        `${favoriteMovie.title} ${wasFavorite ? 'removed from' : 'added to'} favorites`
      );
    },
    [isMovieFavorite, toggleFavorite]
  );

  // Early returns AFTER all hooks
  if (loading) return <SkeletonDetail />;
  if (error)
    return <div className='text-center py-20 text-red-500'>{error}</div>;
  if (!movie) return <div className='text-center py-20'>Movie not found.</div>;
  return (
    <div className='min-h-screen bg-base-black text-white flex flex-col'>
      <AppToaster />
      {/* Background Image */}
      <div className='relative w-full h-96 md:h-[32rem] lg:h-[40rem]'>
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          className='w-full h-full object-cover object-[center_top] md:object-[center_top] lg:object-[center_top] object-position-top-center'
          style={{ objectPosition: 'top center' }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
      </div>

      {/* Main Content */}
      <div className=' -mt-45 z-10 relative px-4 sm:px-15 lg:px-25 xl:px-35 pb-12'>
        <div className='grid grid-cols-[120px_1fr] md:grid-cols-3 gap-4'>
          {/* Poster */}
          <div className='row-span-2 md:col-span-1'>
            <div className='rounded-xl max-w-80 overflow-hidden'>
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className='w-full h-auto object-contain shadow-2xl md:max-h-120'
              />
            </div>
          </div>

          {/* Content Section */}
          <div className='md:col-span-2'>
            {/* Title */}
            <div className='mb-6 lg:mb-9'>
              <h1 className='text-xl md:text-display-xl font-bold'>{movie.title}</h1>
              <div className='flex items-center gap-2 text-lg font-medium mt-1 lg:mt-4'>
                <img
                  src='/icon-calendar.svg'
                  alt='calendar'
                  className='w-5 h-5 lg:w-6 lg:h-6'
                />
                <span className='text-sm lg:text-base'>{formatDate(movie.release_date)}</span>
              </div>
            </div>
          </div>

          {/* Buttons and Cards - Full width on mobile */}
          <div className='col-span-2 md:col-span-2 md:col-start-2'>
            {/* Buttons */}
            <div className='mb-6'>
              <div className='flex items-center justify-between sm:justify-start gap-4'>
                <Button
                  variant='primary'
                  onClick={handleWatchTrailer}
                  disabled={!trailerKey}
                  className='rounded-full p-2 text-base font-semibold bg-primary-300 hover:bg-primary-400 border-none !h-11 lg:h-13  w-full! md:w-55! shadow-lg'
                  style={{ minWidth: 0 }}
                  aria-label={trailerKey ? 'Watch movie trailer' : 'Trailer not available'}
                >
                  Watch Trailer <IoPlayCircle size={24} />
                </Button>
                <FavoriteButton
                  movie={movie}
                  isFavorite={isMovieFavorite(movie.id)}
                  onToggleFavorite={handleFavoriteClick}
                  className="shadow-lg"
                />
              </div>
            </div>

            {/* Cards */}
            <div className='grid grid-cols-3 gap-3 md:gap-4 mb-8'>
              <div className='bg-neutral-900/95 rounded-2xl p-3 md:p-6 flex flex-col items-center'>
                <img
                  src='/icon-rating.svg'
                  alt='rating'
                  className='w-6 h-6 md:w-8 md:h-8 mb-2 mt-1 lg:mt-2'
                />
                <div className='text-neutral-400 text-xs md:text-base'>Rating</div>
                <div className='text-lg md:text-xl font-semibold mt-2 md:mt-4 text-center'>
                  {movie.vote_average.toFixed(1)}/10
                </div>
              </div>
              <div className='bg-neutral-900/95 rounded-2xl p-3 md:p-6 flex flex-col items-center'>
                <img
                  src='/icon-genre.svg'
                  alt='genre'
                  className='w-6 h-6 md:w-8 md:h-8 mb-2 mt-1 lg:mt-2'
                />
                <div className='text-neutral-400 text-xs md:text-base'>Genre</div>
                <div className='text-lg md:text-xl font-semibold mt-2 md:mt-4 text-center'>
                  {genreNames[0]}
                </div>
              </div>
              <div className='bg-neutral-900/95 rounded-2xl p-3 md:p-6 flex flex-col items-center'>
                <img
                  src='/icon-age-limit.svg'
                  alt='age limit'
                  className='w-6 h-6 md:w-8 md:h-8 mb-2 mt-1 lg:mt-2 '
                />
                <div className='text-neutral-400 text-xs md:text-base'>Age Limit</div>
                <div className='text-lg md:text-xl font-semibold mt-2 md:mt-4 text-center'>
                  {APP_CONSTANTS.DEFAULT_AGE_LIMIT}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className='mt-6 lg:mt-8'>
          <h2 className='text-xl lg:text-display-md font-bold mb-2'>Overview</h2>
          <p className='text-neutral-400 text-sm lg:text-base leading-relaxed'>
            {movie.overview}
          </p>
        </div>

        {/* Cast & Crew */}
        <div className='mt-6 lg:mt-8'>
          <h2 className='text-xl lg:text-display-md font-bold mb-4 lg:mb-6'>Cast & Crew</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10'>
            {cast.map((member, index) => (
              <CastCard
                key={`cast-${member.id}-${member.character}-${index}`}
                {...member}
                name={member.name}
                role={member.character}
                profilePath={member.profile_path}
              />
            ))}
            {crew.map((member, index) => (
              <CastCard
                key={`crew-${member.id}-${member.job}-${index}`}
                name={member.name}
                role={member.job}
                profilePath={member.profile_path}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Video Modal for Trailer */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={trailerKey || ''}
      />
    </div>
  );
};

export default MovieDetailpage;
