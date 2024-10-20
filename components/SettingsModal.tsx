/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import toast from 'react-hot-toast';
import { CldUploadButton } from 'next-cloudinary';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

import type { User } from '@prisma/client';

const SettingsModal = ({
  user,
  isOpen,
  onClose,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
      email:user?.email,
      image: user?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('An error occurred.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-6 text-gray-900'>
              Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-500'>
              Edit your public profile
            </p>
            <div className='mt-12 flex flex-col gap-y-6'>
              <Input
                id='name'
                label='Name'
                required
                errors={errors}
                register={register}
                disabled={isLoading}
              />
              <div>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Photo
                </label>
                <div className='mt-2 flex items-center gap-x-4'>
                  <Image
                    src={image || user?.image || '/user.png'}
                    alt='Avatar'
                    width={48}
                    height={48}
                    className='block rounded-full object-cover'
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset='chit-chat'>
                    <Button type='button' secondary disabled={isLoading}>
                      Change Avatar
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-4'>
            <Button secondary disabled={isLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>Update</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
