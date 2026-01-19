import type { Movie } from '../../../interfaces/movie';

export const getFavorites = (): Movie[] => {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('favoriteMovies');
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (movie: Movie): void => {
  const favorites = getFavorites();
  if (!favorites.some((fav) => fav.id === movie.id)) {
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify([...favorites, movie])
    );
  }
};

export const removeFavorite = (movieId: number): void => {
  const favorites = getFavorites();
  localStorage.setItem(
    'favoriteMovies',
    JSON.stringify(favorites.filter((fav) => fav.id !== movieId))
  );
};

export const isFavorite = (movieId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === movieId);
};
