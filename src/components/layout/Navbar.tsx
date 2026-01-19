import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../ui/Input/Input';
import { useNavigate, Link } from 'react-router-dom';

interface NavbarProps {
  addClass?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const debounceTimerRef = useRef<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  /**
   * Debounced live search effect for desktop navbar
   * Triggers automatic search 300ms after user stops typing
   */
  useEffect(() => {
    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only trigger search if there's actual input
    if (searchValue.trim()) {
      // Set new timer - search will execute after 300ms of no typing
      debounceTimerRef.current = setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      }, 300); // 300ms debounce delay - matches search page behavior
    }

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchValue, navigate]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;

    if (query.trim()) {
      setSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      <nav
        className={`${
          isScrolled ? 'bg-neutral-950/60 backdrop-blur-lg' : 'bg-transparent'
        }  px-6 sm:px-15 lg:px-25 xl:px-35  sticky top-0 z-50 h-16 lg:h-22.5  flex items-center transition-all duration-300`}
      >
        <div className=' flex items-center justify-between w-full'>
          <div className='flex items-center space-x-20'>
            <Link
              to='/'
              className='flex space-x-2 items-center hover:opacity-80 transition-opacity'
            >
              <img
                src='/Logo.svg'
                alt='logo'
                className='h-[25px] lg:h-10 transition-all duration-300 ease-in-out'
              />
            </Link>
            <div className='text-base hidden md:flex space-x-12 text-shadow-lg'>
              <Link
                to='/'
                className='text-white hover:opacity-80 transition-all'
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                Home
              </Link>
              <Link
                to='/favorites'
                className='text-white hover:opacity-80 transition-all'
              >
                Favorites
              </Link>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <form
              onSubmit={handleSearch}
              className='relative max-w-60 flex items-center justify-end '
            >
              <div className='hidden sm:flex items-center relative '>
                <img
                  src='/Searchlg.svg'
                  className='absolute left-4 w-6 h-6 text-neutral-500'
                />
                <Input
                  name='search'
                  placeholder='Search Movie'
                  className='hidden md:block pl-12 w-full py-2 px-4 rounded-2xl bg-neutral-950/60 border-neutral-800 focus:outline-none focus:ring-0 text-white text-sm md:text-base h-14 '
                  value={searchValue}
                  onChange={handleInputChange}
                  ref={searchInputRef}
                />{' '}
              </div>
              {searchValue && (
                <button
                  type='button'
                  className='absolute right-4'
                  onClick={handleClear}
                  tabIndex={-1}
                  aria-label='Clear search input'
                >
                  <img
                    src='/closesearch.svg'
                    className='h-4 w-4 lg:h-5 lg:w-5  cursor-pointer'
                  />
                </button>
              )}
            </form>
            <div className='md:hidden flex items-center space-x-6'>
              {/* Search Button - positioned inline */}
              <button
                className={`focus:outline-none ${
                  searchOpen ? 'bg-neutral-800/80 rounded-full' : ''
                }`}
                aria-label='Open search'
                onClick={() => setSearchOpen(true)}
                type='button'
              >
                <img src='/Search.svg' className='h-6 w-6' />
              </button>

              {/* Hamburger Menu Button - positioned inline */}
              <button
                className='focus:outline-none z-50 p-2 text-white transition-colors'
                style={{
                  right: `max(1rem, env(safe-area-inset-right))`,
                }}
                aria-label='Open menu'
                onClick={() => setMenuOpen(true)}
                type='button'
              >
                <img src='/HamburgerMenu.svg' className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div
          className='fixed inset-0 z-50 bg-black/10 backdrop-blur-2xl text-white flex flex-col px-4 py-4.5'
          style={{ background: 'black' }}
        >
          <div className='flex items-center justify-between h-16 mb-6'>
            <div className='flex items-center space-x-2'>
              <img src='/Logo.svg' alt='logo' className='h-7' />
            </div>
            <button
              className='focus:outline-none justify-end'
              aria-label='Close menu'
              onClick={() => setMenuOpen(false)}
              type='button'
            >
              <img src='/Close.svg' className='h-4 w-4 mr-1' />
            </button>
          </div>
          <nav className='flex flex-col gap-8 text-base'>
            <Link
              to='/'
              onClick={(e) => {
                setMenuOpen(false);
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className='text-white text-base hover:opacity-80 transition-all'
            >
              Home
            </Link>
            <Link
              to='/favorites'
              onClick={() => setMenuOpen(false)}
              className='text-white text-base hover:opacity-80 transition-all'
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
      {searchOpen && (
        <div className='fixed inset-0 z-50 bg-black/10 backdrop-blur-2xl text-white flex flex-col ' style={{ background: 'black' }}>
        <div className='fixed top-0 left-0 right-0 z-50 bg-black/95 text-white flex items-center px-4  shadow-lg h-16'>
        <button
          className='focus:outline-none'
          aria-label='Back to home'
          onClick={() => {
            setSearchOpen(false);
            setSearchValue('');
            navigate('/');
          }}
          type='button'
        >
          <img src='/arrow-left.svg' className='h-6 w-6 mr-2.5' />
        </button>
          <form onSubmit={handleSearch} className='flex items-center w-full border border-neutral-800 rounded-xl py-2 px-4 h-11'>
            <img src='/Searchlg.svg' className='h-5 w-5 mr-1' />
            <input
              ref={searchInputRef}
              name='search'
              placeholder='Search Movie'
              className='flex-1 bg-transparent outline-none text-sm text-white placeholder-neutral-500'
              autoFocus
              value={searchValue}
              onChange={handleInputChange}
            />
            {searchValue && (
              <button
                type='button'
                className='ml-2'
                onClick={handleClear}
                tabIndex={-1}
                aria-label='Clear search input'
              >
                <img src='Search.svg' className='h-5 w-5' />
              </button>
            )}
          </form>
          
        </div>
        </div>
      )}
    </>
  );
};
