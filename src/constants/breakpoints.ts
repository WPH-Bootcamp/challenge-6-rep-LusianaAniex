export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

/**
 * Get the number of columns to display based on viewport width
 * @param width - Current viewport width in pixels
 * @returns Number of columns (2-5)
 */
export const getColumnCount = (width: number): number => {
  if (width < BREAKPOINTS.MD) return 2;
  if (width < BREAKPOINTS.LG) return 3;
  if (width < BREAKPOINTS.XL) return 4;
  return 5;
};
