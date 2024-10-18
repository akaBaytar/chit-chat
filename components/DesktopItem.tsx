'use client';

import Link from 'next/link';

import clsx from 'clsx';

import { DesktopItemProps } from '@/types';

const DesktopItem: React.FC<DesktopItemProps> = ({
  active,
  href,
  label,
  icon: Icon,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'group flex gap-3 p-3 text-sm text-gray-500 font-semibold leading-6 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition',
          active && 'text-gray-900 bg-gray-100'
        )}>
        <Icon className='h-6 w-6 shrink-0' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
