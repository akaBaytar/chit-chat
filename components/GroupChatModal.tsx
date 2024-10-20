'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import toast from 'react-hot-toast';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Select from './Select';

import type { User } from '@prisma/client';

const GroupChatModal = ({
  users,
  isOpen,
  onClose,
}: {
  users: User[];
  isOpen?: boolean;
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
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/conversations', { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('An error occurred.'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-6 text-gray-900'>
              Create a Group Chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-500'>
              Create a chat with more than two people
            </p>
            <div className='mt-12 flex flex-col gap-y-6'>
              <Input
                id='name'
                label='Group Name'
                register={register}
                disabled={isLoading}
                errors={errors}
                required
              />
              <Select
                label='Group Members'
                value={members}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value, { shouldValidate: true })
                }
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-4'>
          <Button secondary disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit'>Create a Group</Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
