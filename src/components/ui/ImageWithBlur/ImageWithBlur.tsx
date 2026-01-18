import React, { useState } from 'react';

interface ImageWithBlurProps {
  src: string;
  alt: string;
  className?: string;
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Image component with blur placeholder for progressive loading
 * 
 * Features:
 * - Shows blur placeholder while image loads
 * - Smooth transition to actual image
 * - Lazy loading support
 * - Fallback for missing images
 */
const ImageWithBlur: React.FC<ImageWithBlurProps> = ({
  src,
  alt,
  className = '',
  blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzI1MmIzNyIvPjwvc3ZnPg==',
  loading = 'lazy',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback image for errors
  const fallbackImage = 'https://via.placeholder.com/400x600/252b37/ffffff?text=No+Poster';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder - shown while loading */}
      {!imageLoaded && !imageError && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
        />
      )}
      
      {/* Actual image */}
      <img
        src={imageError ? fallbackImage : src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
      />
      
      {/* Loading spinner */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ImageWithBlur;
