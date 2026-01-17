import React from 'react';
import type { ButtonProps } from './Button.interface';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm font-semibold h-11 md:h-13',
    md: 'px-6 py-2 text-base h-13',
    lg: 'px-8 py-3 text-lg h-16',
    icon: 'p-2 h-10 w-10',
  };

  // Width classes (only for non-icon sizes)
  const widthClasses = {
    sm: 'min-w-20',
    md: 'w-57.5',
    lg: 'min-w-64',
    icon: '',
  };

  const baseClasses =
    'rounded-full font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2';

  // Add disabled state
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const variantClasses = {
    primary:
      'bg-primary-300 text-white hover:bg-primary-400 focus:ring-primary-300 active:scale-[0.98]',
    secondary:
      'bg-neutral-950 text-white hover:bg-neutral-900 border border-neutral-800 focus:ring-neutral-800 active:scale-[0.98]',
    ghost:
      'bg-transparent text-white hover:bg-neutral-800/50 focus:ring-neutral-700 active:scale-[0.98]',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${size !== 'icon' ? widthClasses[size] : ''}
        ${variantClasses[variant]}
        ${disabledClasses}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <span className={`flex items-center ${size === 'icon' ? '' : 'mr-1'}`}>
          {icon}
        </span>
      )}
      {size !== 'icon' && children}
    </button>
  );
};
