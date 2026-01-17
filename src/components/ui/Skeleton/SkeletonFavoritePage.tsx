import { SkeletonMovieCard } from './SkeletonMovieCard';

export const SkeletonFavoritePage = () => {
  return (
    <div className='px-4 sm:px-15 lg:px-25 xl:px-35 mt-30 min-h-[80vh]'>
      <div className='h-10 bg-gray-700 rounded w-48 mb-8 animate-pulse' />
      <div className='w-full max-w-4xl mx-auto'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='mb-8'>
            <SkeletonMovieCard size='large' />
          </div>
        ))}
      </div>
    </div>
  );
};
