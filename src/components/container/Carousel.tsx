import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from '../container/MovieCard/index';
import { NavigationButton } from '../ui/Button/NavigationButton';
import type { Movie } from '../../interfaces/movie';
import { getColumnCount, BREAKPOINTS } from '../../constants/breakpoints';
import { APP_CONSTANTS, GAP_SIZES } from '../../constants/app';

interface CarouselProps {
  movies: Movie[];
}

export const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const [visibleCount, setVisibleCount] = useState(getColumnCount(window.innerWidth));
  const [gap, setGap] = useState<number>(GAP_SIZES.BASE);
  const [startIdx, setStartIdx] = useState(0);
  
  const total = Math.min(movies.length, APP_CONSTANTS.MAX_TRENDING_ITEMS);
  const items = movies.slice(0, total);

  const totalGap = gap * (visibleCount - 1);
  const cardWidth = `calc((100% - ${totalGap}px) / ${visibleCount})`;

  const maxStartIdx = total <= visibleCount ? 0 : total - visibleCount;
  const safeStartIdx = Math.min(startIdx, maxStartIdx);

  const goPrev = useCallback(() => {
    setStartIdx((prev) => (prev === 0 ? maxStartIdx : prev - 1));
  }, [maxStartIdx]);
  
  const goNext = useCallback(() => {
    setStartIdx((prev) => (prev === maxStartIdx ? 0 : prev + 1));
  }, [maxStartIdx]);

  /**
   * Keyboard navigation for accessibility
   * Arrow Left: Previous slide
   * Arrow Right: Next slide
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  }, [goPrev, goNext]);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, APP_CONSTANTS.CAROUSEL_AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [goNext]);

  // Consolidated resize listener for both visibleCount and gap
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setVisibleCount(getColumnCount(width));
      setGap(width >= BREAKPOINTS.MD ? GAP_SIZES.MD : GAP_SIZES.BASE);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const translateX = `-${safeStartIdx * (100 / visibleCount)}%`;

  return (
    <div 
      className='relative w-full' 
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Trending movies carousel"
      aria-roledescription="carousel"
    >
      <div className='overflow-hidden w-full'>
        <div
          className={`flex gap-3 md:gap-4 transition-transform duration-500`}
          style={{
            transform: `translateX(${translateX})`,
          }}
        >
          {items.map((movie, idx) => (
            <div
              key={movie.id}
              className='flex-shrink-0'
              style={{ width: cardWidth }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}`}
            >
              <MovieCard movie={movie} trendingRank={idx + 1} />
            </div>
          ))}
        </div>
      </div>
      <NavigationButton direction='prev' onClick={goPrev} disabled={false} />
      <NavigationButton direction='next' onClick={goNext} disabled={false} />
    </div>
  );
};

export default Carousel;
