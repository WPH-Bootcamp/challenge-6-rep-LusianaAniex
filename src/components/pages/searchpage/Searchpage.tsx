import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearch } from './useSearch';
import LargeMovieCard from '../../container/MovieCard/LargeMovieCard';
import { Button } from '../../ui/Button/Button';
import { VideoModal } from '../../ui/VideoModal';
import { getMovieTrailer } from '../../../services/movies/services';
import { SkeletonMovieCard } from '../../ui/Skeleton';
import { FavoriteButton } from '../../ui/Button/FavoriteButton';
import { useFavorite } from '../favouritepage/useFavorite';
import type { Movie } from '../../../interfaces/movie';
import { useNavigate } from 'react-router-dom';

const Searchpage: React.FC = () => {
  const { searchResults, loading, error, hasMoreResults, loadMoreResults, query } =
    useSearch();
  const { favorites, toggleFavorite } = useFavorite();
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState(query);
  const navigate = useNavigate();
  const debounceTimerRef = useRef<number | null>(null);

  // Sync search input with URL query parameter
  // When URL changes (e.g., from navigation), update the local input state
  useEffect(() => {
    setSearchInputValue(query);
  }, [query]);

  /**
   * Debounced live search effect
   * 
   * This effect implements a debounced search that triggers automatically as the user types.
   * Benefits:
   * - Reduces API calls by waiting for user to pause typing
   * - Improves performance by preventing rapid-fire requests
   * - Better UX with smooth search experience
   * 
   * How it works:
   * 1. User types in search input -> searchInputValue updates
   * 2. Effect clears any existing timer (cancels pending searches)
   * 3. Sets new 500ms timer
   * 4. If user types again before 500ms, timer resets (debounce)
   * 5. After 500ms of no typing, search executes by updating URL
   * 6. URL change triggers useSearch hook to fetch results
   * 
   * Cleanup:
   * - When component unmounts or searchInputValue changes, clear timer
   * - Prevents memory leaks and stale searches
   */
  useEffect(() => {
    // Clear any existing debounce timer to reset the countdown
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only trigger search if there's actual input
    if (searchInputValue.trim()) {
      // Set new timer - search will execute after 500ms of no typing
      debounceTimerRef.current = setTimeout(() => {
        // Navigate with query parameter, which triggers useSearch hook
        navigate(`/search?q=${encodeURIComponent(searchInputValue.trim())}`);
      }, 500); // 500ms debounce delay - balances responsiveness and performance
    }

    // Cleanup function runs on unmount or when searchInputValue changes
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchInputValue, navigate]);

  const showNotFound =
    searchResults && searchResults.length === 0 && !loading && !error;

  // Memoize filtered results to prevent recomputation on every render
  // Only recalculates when searchResults changes
  const filteredResults = useMemo(() => {
    return searchResults
      ? searchResults.filter((movie) => movie.vote_average > 1)
      : [];
  }, [searchResults]);

  // useCallback prevents function recreation on every render
  // Maintains referential equality for child components
  const handleLoadMore = useCallback(() => {
    loadMoreResults();
  }, [loadMoreResults]);

  const handleWatchTrailer = useCallback(async (movieId: number) => {
    setTrailerLoading(true);
    const key = await getMovieTrailer(movieId);
    setTrailerKey(key);
    setModalOpen(true);
    setTrailerLoading(false);
  }, []);

  const handleToggleFavorite = useCallback((movie: Movie) => {
    toggleFavorite(movie);
  }, [toggleFavorite]);

  const handleBackToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleMobileSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInputValue.trim())}`);
    }
  }, [searchInputValue, navigate]);

  const handleClearSearch = useCallback(() => {
    setSearchInputValue('');
  }, []);

  return (
    <>
      {/* ARIA Live Region for Screen Readers - announces search status */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {loading && 'Searching for movies...'}
        {!loading && searchResults && searchResults.length > 0 && 
          `Found ${searchResults.length} results for "${query}"`}
        {showNotFound && `No results found for "${query}"`}
      </div>

      {/* Mobile Search Header - Only visible on mobile */}
      <div className='md:hidden fixed top-0 left-0 right-0 z-50 bg-black text-white flex items-center px-4 shadow-lg h-16'>
        <button
          className='focus:outline-none'
          aria-label='Back to home'
          onClick={handleBackToHome}
          type='button'
        >
          <img src='/arrow-left.svg' className='h-6 w-6 mr-2.5' />
        </button>
        <form onSubmit={handleMobileSearch} className='flex items-center w-full border border-neutral-800 rounded-xl py-2 px-4 h-11'>
          <img src='/Searchlg.svg' className='h-5 w-5 mr-1' />
          <input
            name='search'
            placeholder='Search Movie'
            className='flex-1 bg-transparent outline-none text-sm text-white placeholder-neutral-500'
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          {searchInputValue && (
            <button
              type='button'
              className='ml-2'
              onClick={handleClearSearch}
              aria-label='Clear search input'
            >
              <img src='/closesearch.svg' className='h-4 w-4' />
            </button>
          )}
        </form>
      </div>

      <div className='mx-auto p-4 md:p-8 pt-24 md:mt-20 flex flex-col items-center justify-center min-h-[80vh]'>
      {loading && (
        <div className='w-full max-w-4xl'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='mb-8'>
              <SkeletonMovieCard size='large' />
            </div>
          ))}
        </div>
      )}
      {error && <p className='text-red-500'>{error}</p>}
      {showNotFound && (
        <div className='flex flex-col items-center justify-center'>
          <img
            src='/data-not-foundpng.png'
            alt='Data Not Found'
            className='w-[200px] h-[200px] mb-6'
          />
          <div className='text-base font-semibold text-white mb-2'>
            Data Not Found
          </div>
          <div className='text-base font-normal text-neutral-400'>
            Try other keywords
          </div>
        </div>
      )}
      {filteredResults.length > 0 && (
        <div className='w-full flex flex-col items-center'>
          {filteredResults.map((movie) => (
            <LargeMovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
              onWatchTrailer={() => handleWatchTrailer(movie.id)}
              trailerAvailable={!trailerLoading}
              id={movie.id}
              favoriteButton={
                <FavoriteButton
                  movie={movie}
                  isFavorite={favorites.some((fav) => fav.id === movie.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
          ))}
          {hasMoreResults && (
            <div className='w-full flex items-center justify-center mt-6'>
              <Button
                variant='secondary'
                className='shadow-2xl'
                onClick={handleLoadMore}
                disabled={loading}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
      <VideoModal
        isOpen={modalOpen && !!trailerKey}
        onClose={() => setModalOpen(false)}
        videoId={trailerKey || ''}
      />
    </div>
    </>
  );
};

export default Searchpage;
