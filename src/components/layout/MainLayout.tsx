import React, { type ReactNode } from 'react';
import { Navbar } from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col bg-black'>
      <Navbar addClass='sticky top-0 z-50 fixed' />
      <main className='flex-grow -mt-22.5'>{children}</main>
      <Footer />
    </div>
  );
};