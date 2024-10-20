'use client';

import clsx from 'clsx';

import type { InputProps } from '@/types';

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  errors,
  disabled,
  required,
  register,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-9 text-gray-900'>
        {label}
      </label>
      <div className='mt-1'>
        <input
          id={id}
          type={type}
          disabled={disabled}
          autoComplete={id}
          {...register(id, { required })}
          className={clsx(
            'form-input block w-full rounded-lg border-0 py-1.5 sm:text-sm sm:leading-6 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-400',
            disabled && 'opacity-50 cursor-default',
            errors[id] && 'focus:ring-rose-600'
          )}
        />
      </div>
    </div>
  );
};

export default Input;
