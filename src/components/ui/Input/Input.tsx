import React from 'react';
import type { InputProps } from './Input.interface';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full py-2 px-4 rounded-2xl bg-neutral-950/60 text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
