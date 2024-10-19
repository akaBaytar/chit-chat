'use client';

import useConversation from '@/hooks/useConversation';
import useRoutes from '@/hooks/useRoutes';
import MobileItem from './MobileItem';

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) return null;

  return (
    <footer className='fixed justify-between w-full bottom-0 z-10 flex items-center bg-white border-t-[1px] lg:hidden'>
      {routes.map(({ href, icon, label, active, onClick }) => (
        <MobileItem
          key={label}
          href={href}
          icon={icon}
          label={label}
          active={active}
          onClick={onClick}
        />
      ))}
    </footer>
  );
};

export default MobileFooter;
