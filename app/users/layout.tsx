import Sidebar from '@/components/Sidebar';
import UserList from '@/components/UserList';

import { getUsers } from '@/actions/user.action';

import type{ User } from '@prisma/client';

const UsersPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className='h-full'>
        <UserList users={users as User[]} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersPageLayout;
