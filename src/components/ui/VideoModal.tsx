import { IoClose } from 'react-icons/io5';
import { useEffect, useRef } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export const VideoModal = ({ isOpen, onClose, videoId }: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /**
   * Focus management for accessibility
   * - Save previous focus when modal opens
   * - Set focus to modal
   * - Restore focus when modal closes
   */
  useEffect(() => {
    if (isOpen) {
      // Save current focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the modal
      modalRef.current?.focus();
    } else {
      // Restore focus when modal closes
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  /**
   * Handle Escape key to close modal
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center'
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Video player modal"
    >
      <div 
        className='absolute inset-0 bg-black/80' 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className='relative w-full max-w-4xl mx-4'>
        <button
          onClick={onClose}
          className='absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors'
          aria-label="Close video modal"
        >
          <IoClose size={32} />
        </button>
        <div className='relative pt-[56.25%]'>
          <iframe
            className='absolute inset-0 w-full h-full'
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};