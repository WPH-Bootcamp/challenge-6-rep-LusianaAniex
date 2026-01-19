import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({
  message,
  className = '',
}: ErrorMessageProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 ${className}`}
    >
      <FaExclamationTriangle className='text-red-500 text-4xl mb-4' />
      <h2 className='text-2xl font-bold text-red-500 mb-2'>Error</h2>
      <p className='text-gray-300 text-center max-w-md'>{message}</p>
    </div>
  );
};
