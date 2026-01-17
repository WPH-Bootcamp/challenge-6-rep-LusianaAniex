import { useState, useEffect } from 'react';
import { getColumnCount } from '../constants/breakpoints';

interface ScreenSize {
  colCount: number;
}

export const useScreenSize = (): ScreenSize => {
  const [colCount, setColCount] = useState(5);

  useEffect(() => {
    function updateColCount() {
      const width = window.innerWidth;
      setColCount(getColumnCount(width));
    }

    updateColCount();
    window.addEventListener('resize', updateColCount);
    return () => window.removeEventListener('resize', updateColCount);
  }, []);

  return { colCount };
};
