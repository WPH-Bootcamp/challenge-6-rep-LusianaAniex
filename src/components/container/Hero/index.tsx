import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button/index';
import type { Movie } from '../../../interfaces/movie';
import {
  getImageUrl,
  getMovieTrailer,
} from '../../../services/movies/services';
import { IoPlayCircle } from 'react-icons/io5';
import { useState } from 'react';
import { VideoModal } from '../../ui/VideoModal.tsx';

interface HeroSectionProps {
  movie: Movie;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export const HeroSection = ({
  movie,
  isModalOpen,
  setIsModalOpen,
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const handleWatchTrailer = async () => {
    if (movie.trailer_key) {
      setTrailerKey(movie.trailer_key);
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const key = await getMovieTrailer(movie.id);
      if (key) {
        setTrailerKey(key);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error playing trailer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative w-full md:mb-12'>
      <div className='relative w-full h-160 md:h-[32rem] lg:h-[50rem]'>
        <div className='absolute inset-0 bottom-0 bg-gradient-to-t from-black via-black/70 md:via-black/50 to-transparent z-10' />
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          className='w-full h-96 md:h-[32rem] lg:h-[50rem] object-cover object-center'
          loading='lazy'
        />
        <div className='absolute inset-0 z-20 w-full flex flex-col justify-end pb-8 lg:justify-start lg:pt-[298px] px-4 md:px-15 lg:px-25 xl:px-35 text-neutral-25 max-w-4xl'>
          <h1 className='text-display-xs md:text-display-2xl font-bold mb-1.5 md:mb-4 drop-shadow-lg leading-tight'>
            {movie.title}
          </h1>
          <p className='text-sm md:text-base text-neutral-400 drop-shadow-md mb-6 md:mb-8 leading-relaxed max-w-2xl'>
            {movie.overview}
          </p>
          <div className='flex flex-col gap-3 w-full md:flex-row md:gap-4'>
            <Button
              variant='primary'
              size='sm'
              onClick={handleWatchTrailer}
              disabled={isLoading}
              className='w-full md:w-1/2 md:max-w-57.5'
            >
              {isLoading ? 'Loading...' : 'Watch Trailer'}{' '}
              <IoPlayCircle size={24} />
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => navigate(`/movie/${movie.id}`)}
              className='w-full md:w-1/2 md:max-w-57.5'
            >
              See Detail
            </Button>
          </div>
        </div>
      </div>
      {trailerKey && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoId={trailerKey}
        />
      )}
    </div>
  );
};
