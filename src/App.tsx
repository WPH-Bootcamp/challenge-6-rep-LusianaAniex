import { Routes, Route } from 'react-router-dom'; //
import { Suspense, lazy } from 'react';
import LoadingSpinner from './components/ui/Loading';
import { MainLayout } from './components/layout/MainLayout';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

// Lazy load pages
const HomePage = lazy(() => import('./components/pages/homepage/Homepage'));
const MovieDetailPage = lazy(() => import('./components/pages/detailpage'));
const Searchpage = lazy(() => import('./components/pages/searchpage'));
const Favoritepage = lazy(
  () => import('./components/pages/favouritepage/index')
);

function App() {
  return (
    <>
      <MainLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path='/'
              element={
                <ErrorBoundary>
                  <HomePage />
                </ErrorBoundary>
              }
            />
            <Route
              path='/movie/:id'
              element={
                <ErrorBoundary>
                  <MovieDetailPage />
                </ErrorBoundary>
              }
            />
            <Route
              path='/search'
              element={
                <ErrorBoundary>
                  <Searchpage />
                </ErrorBoundary>
              }
            />
            <Route
              path='/favorites'
              element={
                <ErrorBoundary>
                  <Favoritepage />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Suspense>
      </MainLayout>
    </>
  );
}

export default App;
