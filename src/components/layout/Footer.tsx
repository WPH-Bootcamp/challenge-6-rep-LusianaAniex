import React from 'react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
  return (
    <footer className='bg-black text-neutral-600 py-8  h-30 border-t border-neutral-800 '>
      <div className='px-4 sm:px-15 lg:px-25 xl:px-35 pb-9 lg:pb-10 flex flex-col md:flex-row items-left justify-start md:justify-between'>
        <Link
          to='/'
          className='flex items-center space-x-2 hover:opacity-80 transition-opacity'
        >
          <img src='/Logo.svg' alt='FooterLogo' className='h-7 lg:h-10' />
        </Link>
        <div className='text-neutral-600 text-text-xs md:text-base mt-2 lg:mt-0'>
          Copyright ©2025 Movie Explorer
        </div>
      </div>
    </footer>
  );
};

export default Footer;
