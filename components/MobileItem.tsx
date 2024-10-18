'use client';

import Link from 'next/link';

import clsx from 'clsx';

import { MobileItemProps } from '@/types';

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        'group flex justify-center gap-3 p-3 w-full text-sm text-gray-500 font-semibold leading-6 hover:text-gray-900 hover:bg-gray-100 transition',
        active && 'text-gray-900 bg-gray-100'
      )}>
      <Icon className='h-6 w-6 shrink-0' />
      <span className='sr-only'>{label}</span>
    </Link>
  );
};

export default MobileItem;
