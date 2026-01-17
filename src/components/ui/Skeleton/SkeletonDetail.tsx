import React from 'react';

export const SkeletonDetail: React.FC = () => {
  return (
    <div className='animate-pulse'>
      {/* Backdrop skeleton */}
      <div className='relative w-full h-[400px] md:h-[500px] bg-gray-800'>
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
      </div>

      {/* Content section */}
      <div className='px-4 sm:px-8 lg:px-12 xl:px-16 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Poster skeleton */}
          <div className='md:col-span-1'>
            <div className='aspect-[2/3] bg-gray-700 rounded-lg' />
          </div>

          {/* Details skeleton */}
          <div className='md:col-span-2 space-y-4'>
            {/* Title */}
            <div className='h-10 bg-gray-700 rounded w-2/3' />

            {/* Metadata */}
            <div className='flex gap-4'>
              <div className='h-6 bg-gray-700 rounded w-20' />
              <div className='h-6 bg-gray-700 rounded w-24' />
              <div className='h-6 bg-gray-700 rounded w-16' />
            </div>

            {/* Genres */}
            <div className='flex gap-2'>
              <div className='h-8 bg-gray-700 rounded-full w-20' />
              <div className='h-8 bg-gray-700 rounded-full w-24' />
              <div className='h-8 bg-gray-700 rounded-full w-20' />
            </div>

            {/* Overview */}
            <div className='space-y-2'>
              <div className='h-6 bg-gray-700 rounded w-32 mb-2' />
              <div className='h-4 bg-gray-700 rounded w-full' />
              <div className='h-4 bg-gray-700 rounded w-full' />
              <div className='h-4 bg-gray-700 rounded w-3/4' />
            </div>

            {/* Buttons */}
            <div className='flex gap-3 pt-4'>
              <div className='h-12 w-40 bg-gray-700 rounded-full' />
              <div className='h-12 w-12 bg-gray-700 rounded-full' />
            </div>
          </div>
        </div>

        {/* Cast section skeleton */}
        <div className='mt-12'>
          <div className='h-8 bg-gray-700 rounded w-32 mb-6' />
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4'>
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className='aspect-[2/3] bg-gray-700 rounded-lg mb-2' />
                <div className='h-4 bg-gray-700 rounded w-3/4 mb-1' />
                <div className='h-3 bg-gray-700 rounded w-1/2' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
