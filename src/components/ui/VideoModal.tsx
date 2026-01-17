import { IoClose } from 'react-icons/io5';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export const VideoModal = ({ isOpen, onClose, videoId }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/80' onClick={onClose} />
      <div className='relative w-full max-w-4xl mx-4'>
        <button
          onClick={onClose}
          className='absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors'
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