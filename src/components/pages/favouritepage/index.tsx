import React, { useState } from 'react';
import { useFavorite } from './useFavorite';
import LargeMovieCard from '../../container/MovieCard/LargeMovieCard';
import { Button } from '../../ui/Button/Button';
import { VideoModal } from '../../ui/VideoModal';
import { getMovieTrailer } from '../../../services/movies/services';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../../interfaces/movie';
import { FavoriteButton } from '../../ui/Button/FavoriteButton';
import { SkeletonFavoritePage } from '../../ui/Skeleton';

const Favoritepage: React.FC = () => {
  const { favorites, loading, toggleFavorite } = useFavorite();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(5);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleWatchTrailer = async (movieId: number) => {
    setTrailerLoading(true);
    const key = await getMovieTrailer(movieId);
    setTrailerKey(key);
    setModalOpen(true);
    setTrailerLoading(false);
  };

  const handleToggleFavorite = (movie: Movie) => {
    toggleFavorite(movie);
  };

  if (loading) {
    return <SkeletonFavoritePage />;
  }

  return (
    <div className='px-4 sm:px-15 lg:px-25 xl:px-35 mt-30 min-h-[80vh]'>
      <div className='text-white text-2xl md:text-3xl font-bold mb-8 w-full  '>
        Favorites
      </div>

      {favorites.length === 0 ? (
        <div className='flex flex-col items-center justify-center'>
          <img
            src='/data-empty.png'
            alt='No Favorites'
            className='w-[200px] h-[200px] mb-6'
          />
          <div className='text-base font-semibold text-white mb-2'>
            Data Empty
          </div>
          <div className='text-base font-normal text-neutral-400 mb-4'>
            You don't have a favorite movie yet
          </div>
          <Button
            variant='secondary'
            onClick={() => navigate('/')}
            className='bg-primary-300 shadow-2xl'
          >
            Explore Movie
          </Button>
        </div>
      ) : (
        <div className='w-full flex flex-col items-center'>
          {favorites.slice(0, visibleCount).map((movie) => (
            <LargeMovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
              onWatchTrailer={() => handleWatchTrailer(movie.id)}
              trailerAvailable={!trailerLoading}
              id={movie.id}
              favoriteButton={
                <FavoriteButton
                  movie={movie}
                  isFavorite={favorites.some((fav) => fav.id === movie.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
          ))}
          {visibleCount < favorites.length && (
            <div className='w-full flex items-center justify-center mt-6'>
              <Button
                variant='secondary'
                className='shadow-2xl'
                onClick={handleLoadMore}
                disabled={loading}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
      <VideoModal
        isOpen={modalOpen && !!trailerKey}
        onClose={() => setModalOpen(false)}
        videoId={trailerKey || ''}
      />
    </div>
  );
};

export default Favoritepage;
