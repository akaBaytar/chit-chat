'use client';

import { MessageInputProps } from '@/types';

const MessageInput: React.FC<MessageInputProps> = ({
  errors,
  id,
  register,
  placeholder,
  required,
  type,
}) => {
  return (
    <div className='relative w-full'>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id, { required })}
        className='text-gray-900 font-light py-2 px-4 bg-gray-100 w-full rounded-lg focus-visible:outline-none'
      />
    </div>
  );
};

export default MessageInput;
