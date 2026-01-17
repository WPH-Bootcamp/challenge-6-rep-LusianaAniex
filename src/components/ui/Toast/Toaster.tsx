import { Toaster as HotToaster } from 'react-hot-toast';
import type { Toast } from 'react-hot-toast';

const TOAST_WIDTH = {
  mobile: 300,
  desktop: 520,
};

export const AppToaster = () => {
  return (
    <HotToaster
      position='top-center'
      toastOptions={{
        duration: 2000,
        className: '!px-0 !py-0',
        style: {
          maxWidth: '100%',
          width: 'auto',
          background: 'transparent',
          boxShadow: 'none',
        },
        success: {
          style: {
            background: 'transparent',
          },
          icon: null,
        },
        error: {
          style: {
            background: 'transparent',
          },
          icon: null,
        },
      }}
    >
      {(t: Toast) => {
        const isMobile =
          typeof window !== 'undefined' && window.innerWidth < 640;
        const width = isMobile ? TOAST_WIDTH.mobile : TOAST_WIDTH.desktop;
        const isAdding =
          typeof t.message === 'string' &&
          t.message.includes('added to favorites');

        return (
          <div
            className={`
              ${t.visible ? 'animate-enter' : 'animate-leave'}
              bg-black/60 backdrop-blur-md rounded-md
              flex items-center justify-center gap-3 px-4 py-3 shadow-lg
              border border-white/10 translate-y-30
            `}
            style={{ width }}
          >
            <img
              src={isAdding ? '/icon-check.svg' : '/icon-cross.svg'}
              alt={isAdding ? 'Added to favorites' : 'Removed from favorites'}
              className='w-6 h-6'
            />
            <p className='text-white text-sm font-medium text-center'>
              {typeof t.message === 'string' ? t.message : ''}
            </p>
          </div>
        );
      }}
    </HotToaster>
  );
};
