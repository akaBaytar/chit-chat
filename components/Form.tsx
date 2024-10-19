/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import axios from 'axios';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';

import { CldUploadButton } from 'next-cloudinary';

import MessageInput from './MessageInput';
import useConversation from '@/hooks/useConversation';

import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

const MessageForm = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { message: '' } });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', { ...data, conversationId });
  };

  const onSuccess = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className='py-4 px-6 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={onSuccess}
        uploadPreset='chit-chat'>
        <HiPhoto size={30} className='text-amber-500' />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 lg:gap-4  w-full'>
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Send a message'
        />
        <button
          type='submit'
          className='rounded-full p-2 bg-amber-500 cursor-pointer hover:bg-amber-600 transition'>
          <HiPaperAirplane size={16} className='text-gray-100' />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
