import { useHome } from './useHome';
import { Button } from '../../ui/Button/Button';
import { HeroSlider } from '../../container/Hero/HeroSlider';
import MovieCard from '../../container/MovieCard';
import { HeroSection } from '../../container/Hero/index';
import { useState } from 'react';
import { Carousel } from '../../container/Carousel';
import { SkeletonHomepage } from '../../ui/Skeleton';
import { useScreenSize } from '../../../hooks/useScreenSize';
import { APP_CONSTANTS } from '../../../constants/app';

export const Homepage: React.FC = () => {
  const {
    trendingMovies,
    newReleaseMovies,
    loading,
    error,
    hasMoreMovies,
    loadMoreMovies,
  } = useHome();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colCount } = useScreenSize();
  const [rowsToShow, setRowsToShow] = useState<number>(APP_CONSTANTS.DEFAULT_ROWS_TO_SHOW);

  const newReleaseCardsToShow = newReleaseMovies.slice(
    0,
    rowsToShow * colCount
  );

  if (loading) {
    return <SkeletonHomepage />;
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='mx-auto'>
      {/* Hero Section */}
      {trendingMovies.length > 0 && (
        <HeroSlider items={trendingMovies} paused={isModalOpen}>
          {(movie) => (
            <HeroSection
              movie={movie}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </HeroSlider>
      )}

      {/* Trending Now */}
      <section className='px-4 sm:px-15 lg:px-25 xl:px-35 pt-0 mb-10 lg:mb-20'>
        <div className='flex items-center justify-between mb-4 md:mb-6'>
          <h2 className='text-display-xs md:text-display-lg font-bold pb-2'>
            Trending Now
          </h2>
        </div>
        <Carousel movies={trendingMovies.slice(0, APP_CONSTANTS.MAX_TRENDING_ITEMS)} />
      </section>

      {/* New Release */}
      <section className='px-4 sm:px-15 lg:px-25 xl:px-35 mb-10 lg:mb-20'>
        <div className='relative'>
          <h2 className='text-display-xs md:text-display-lg font-bold mb-4 md:mb-6 pb-2'>
            New Release
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10'>
            {newReleaseCardsToShow.map((movie) => (
              <MovieCard key={`new-${movie.id}`} movie={movie} />
            ))}
          </div>
          {hasMoreMovies && (
            <div className='w-full h-[200px] md:h-[400px] absolute bottom-0 left-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center z-10'>
              <Button
                variant='secondary'
                size='sm'
                className='translate-y-5 md:translate-y-10 shadow-2xl w-[200px] md:w-[230px]'
                onClick={() => {
                  setRowsToShow((prev) => prev + APP_CONSTANTS.ROWS_INCREMENT);
                  loadMoreMovies();
                }}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
