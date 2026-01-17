import { IoChevronForward, IoChevronBack } from 'react-icons/io5';

type NavigationButtonProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
};

export const NavigationButton = ({
  direction,
  onClick,
  disabled,
}: NavigationButtonProps) => {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? IoChevronBack : IoChevronForward;
  const positionClass = isPrev
    ? 'left-2 lg:left-0 lg:-translate-x-12'
    : 'right-2 lg:right-0 lg:translate-x-12';

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${positionClass} bg-neutral-800/80 hover:bg-neutral-700/80 rounded-full p-2 transition-colors z-20 cursor-pointer`}
      disabled={disabled}
      aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} movies`}
    >
      <Icon size={24} />
    </button>
  );
};