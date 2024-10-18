import { User } from '@prisma/client';
import UserBox from './UserBox';

const UserList = ({ users }: { users: User[] }) => {
  return (
    <aside className='fixed block w-full start-0 inset-y-0 pb-20 lg:pb-0 lg:start-20 lg:w-80 lg:block overflow-y-auto border-e border-gray-200'>
      <div className='px-5'>
        <div className='flex flex-col'>
          <h3 className='text-2xl font-bold text-gray-900 py-5'>People</h3>
        </div>
        <div className='flex flex-col gap-3'>
          {users.length > 0 ? (
            users.map((user) => <UserBox key={user.id} user={user} />)
          ) : (
            <p className='text-lg'>No users found.</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
