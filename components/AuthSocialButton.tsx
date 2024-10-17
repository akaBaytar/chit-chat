import { SocialButtonProps } from '@/types';

const AuthSocialButton: React.FC<SocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex justify-center w-full px-5 py-2.5 rounded-lg shadow-sm bg-white text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'>
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
