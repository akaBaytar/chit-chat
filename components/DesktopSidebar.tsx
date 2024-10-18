'use client';

import { useState } from 'react';

import DesktopItem from './DesktopItem';
import useRoutes from '@/hooks/useRoutes';

const DesktopSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const routes = useRoutes();

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-e-[1px] lg:pb-4 lg:flex lg:flex-col lg:justify-between xl:px-6'>
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center gap-1'>
          {routes.map(({ href, icon, label, active, onClick }) => (
            <DesktopItem
              key={label}
              href={href}
              icon={icon}
              label={label}
              active={active}
              onClick={onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
