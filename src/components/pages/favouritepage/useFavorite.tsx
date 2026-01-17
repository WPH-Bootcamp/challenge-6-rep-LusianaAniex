import { useState } from 'react';
import type { Movie } from '../../../interfaces/movie';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from './helper';

export const useFavorite = () => {
  const [favorites, setFavorites] = useState<Movie[]>(getFavorites);

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setFavorites(getFavorites());
  };

  return {
    favorites,
    loading: false,
    toggleFavorite,
    isFavorite: (movieId: number) => isFavorite(movieId),
  };
};
