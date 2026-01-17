import React, { useState, useEffect } from 'react';
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;

    if (query.trim()) {
      setSearchOpen(false);
      setSearchValue('');
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
                  className='hidden md:block pl-12 w-full py-2 px-4 rounded-2xl bg-neutral-950/60 border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-500 text-base h-14 '
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
                    src='/Search.svg'
                    className='h-4 w-4 opacity-25 cursor-pointer'
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
          className='fixed inset-0 z-50 bg-black/10 backdrop-blur-2xl text-white flex flex-col px-7 py-8'
          style={{ background: 'black' }}
        >
          <div className='flex items-center justify-between mb-12'>
            <div className='flex items-center space-x-2'>
              <img src='/Logo.svg' alt='logo' className='h-7' />
            </div>
            <button
              className='focus:outline-none justify-end'
              aria-label='Close menu'
              onClick={() => setMenuOpen(false)}
              type='button'
            >
              <img src='/Close.svg' className='h-5 w-5 mr-4' />
            </button>
          </div>
          <nav className='flex flex-col gap-8 text-xl'>
            <Link
              to='/'
              onClick={(e) => {
                setMenuOpen(false);
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className='text-neutral-400 hover:opacity-80 transition-all'
            >
              Home
            </Link>
            <Link
              to='/favorites'
              onClick={() => setMenuOpen(false)}
              className='text-neutral-400 hover:opacity-80 transition-all'
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
      {searchOpen && (
        <div className='fixed top-0 left-0 right-0 z-50 bg-black/95 text-white flex items-center px-4 py-4 shadow-lg h-22.5'>
          <form onSubmit={handleSearch} className='flex items-center w-full'>
            <img src='/Search.svg' className='h-6 w-6 mr-3' />
            <input
              ref={searchInputRef}
              name='search'
              placeholder='Search Movie'
              className='flex-1 bg-transparent outline-none text-lg text-white placeholder-neutral-400'
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
          <button
            className='ml-4 focus:outline-none'
            aria-label='Close search'
            onClick={() => setSearchOpen(false)}
            type='button'
          >
            <img src='/Close.svg' className='h-5 w-5' />
          </button>
        </div>
      )}
    </>
  );
};
