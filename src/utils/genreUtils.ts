import type { Movie } from '../interfaces/movie';
import type { Genre } from '../services/movies/services';

/**
 * Extract genre names from a movie object
 * @param movie - Movie object that may have genres or genre_ids
 * @param allGenres - Complete list of available genres
 * @returns Array of genre names
 */
export const getGenreNames = (
  movie: Movie,
  allGenres: Genre[]
): string[] => {
  // If movie has genres array with names, use it directly
  if (movie.genres && movie.genres.length > 0) {
    return movie.genres.map((g) => g.name);
  }
  
  // Otherwise, map genre_ids to genre names
  if (movie.genre_ids) {
    return movie.genre_ids
      .map((id) => allGenres.find((g) => g.id === id)?.name)
      .filter(Boolean) as string[];
  }
  
  return [];
};
