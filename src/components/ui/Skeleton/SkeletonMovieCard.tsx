import React from 'react';

interface SkeletonMovieCardProps {
  size?: 'small' | 'large';
}

export const SkeletonMovieCard: React.FC<SkeletonMovieCardProps> = ({
  size = 'small',
}) => {
  const isLarge = size === 'large';

  return (
    <div className={`${isLarge ? 'w-full' : 'min-w-[150px]'} animate-pulse`}>
      {/* Poster skeleton */}
      <div
        className={`${
          isLarge ? 'aspect-[2/3]' : 'aspect-[2/3]'
        } bg-gray-700 rounded-lg mb-2`}
      />

      {/* Title skeleton */}
      <div className='h-4 bg-gray-700 rounded w-3/4 mb-1' />

      {/* Metadata skeleton */}
      <div className='h-3 bg-gray-700 rounded w-1/2' />
    </div>
  );
};
