import React, { useEffect, useState } from 'react';

interface HeroSliderProps<T> {
  items: T[];
  interval?: number;
  children: (item: T, index: number) => React.ReactNode;
  paused?: boolean;
}

export const HeroSlider = <T,>({
  items,
  interval = 5000,
  children,
  paused = false,
}: HeroSliderProps<T>): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (items.length > 0 && !paused) {
      const timer = setInterval(() => {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % items.length);
          setTransitioning(false);
        }, 200);
      }, interval);

      return () => clearInterval(timer);
    }
    return () => {};
  }, [items.length, interval, paused]);

  return (
    <div className='relative w-full h-full'>
      <div
        className={`flex transition-opacity duration-500 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children(items[currentIndex], currentIndex)}
      </div>
    </div>
  );
};