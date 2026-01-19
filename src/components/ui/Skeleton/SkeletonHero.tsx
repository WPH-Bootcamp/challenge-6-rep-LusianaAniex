import React from 'react';

export const SkeletonHero: React.FC = () => {
  return (
    <div className='relative w-full h-[calc(100vh-80px)] overflow-hidden animate-pulse'>
      {/* Background skeleton */}
      <div className='absolute inset-0 bg-gray-800' />

      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />

      {/* Content skeleton */}
      <div className='absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12 xl:p-16'>
        <div className='max-w-2xl'>
          {/* Title skeleton */}
          <div className='h-12 md:h-16 bg-gray-700 rounded w-3/4 mb-4' />

          {/* Description skeleton */}
          <div className='space-y-2 mb-6'>
            <div className='h-4 bg-gray-700 rounded w-full' />
            <div className='h-4 bg-gray-700 rounded w-5/6' />
            <div className='h-4 bg-gray-700 rounded w-4/6' />
          </div>

          {/* Buttons skeleton */}
          <div className='flex gap-3'>
            <div className='h-12 w-40 bg-gray-700 rounded-full' />
            <div className='h-12 w-40 bg-gray-700 rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
};
