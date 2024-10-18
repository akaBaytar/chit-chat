import MobileFooter from './MobileFooter';
import DesktopSidebar from './DesktopSidebar';

import getUser from '@/helpers/getUser';

import type { User } from '@prisma/client';

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return (
    <div className='h-full'>
      <DesktopSidebar user={user as User} />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
