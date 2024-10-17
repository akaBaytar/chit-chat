'use client';

import clsx from 'clsx';

import { ButtonProps } from '@/types';

const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  children,
  fullWidth,
  danger,
  secondary,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex justify-center rounded-lg px-5 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-gray-900',
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-default',
        danger &&
          'bg-red-500 hover:bg-rose-600 focus-visible:outline-red-600 text-gray-100',
        !secondary &&
          !danger &&
          'text-gray-900 bg-amber-300 hover:bg-amber-400 focus-visible:outline-amber-400'
      )}>
      {children}
    </button>
  );
};

export default Button;
