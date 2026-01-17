import { SkeletonHero } from './SkeletonHero';
import { SkeletonMovieCard } from './SkeletonMovieCard';

export const SkeletonHomepage = () => {
  return (
    <div className='mx-auto'>
      {/* Hero skeleton */}
      <SkeletonHero />

      {/* Trending Now skeleton */}
      <section className='px-4 sm:px-15 lg:px-25 xl:px-35 mb-8 md:mb-12'>
        <div className='h-10 bg-gray-700 rounded w-48 mb-4 md:mb-6 animate-pulse' />
        <div className='flex gap-3 overflow-hidden'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='min-w-[150px]'>
              <SkeletonMovieCard size='small' />
            </div>
          ))}
        </div>
      </section>

      {/* New Release skeleton */}
      <section className='px-4 sm:px-15 lg:px-25 xl:px-35'>
        <div className='h-10 bg-gray-700 rounded w-48 mb-4 md:mb-6 animate-pulse' />
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
          {[...Array(10)].map((_, i) => (
            <SkeletonMovieCard key={i} size='large' />
          ))}
        </div>
      </section>
    </div>
  );
};
