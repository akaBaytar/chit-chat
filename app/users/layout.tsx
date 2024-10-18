import Sidebar from '@/components/Sidebar';

const UsersPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
};

export default UsersPageLayout;
