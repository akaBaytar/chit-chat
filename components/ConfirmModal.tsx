'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import toast from 'react-hot-toast';
import { DialogTitle } from '@headlessui/react';
import { FiAlertTriangle } from 'react-icons/fi';

import Modal from './Modal';
import Button from './Button';
import useConversation from '@/hooks/useConversation';

const ConfirmModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { conversationId } = useConversation();

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push('/conversations');
        router.refresh();
      })
      .catch(() => toast.error('An error occurred.'))
      .finally(() => setIsLoading(false));
  }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div className='mx-auto flex flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 h-12 w-12 bg-rose-100'>
          <FiAlertTriangle className='h-6 w-6 text-rose-500' />
        </div>
        <div className='mt-3 text-center sm:ms-4 sm:mt-0 sm:text-start'>
          <DialogTitle
            as='h3'
            className='text-base font-semibold leading-6 text-gray-900'>
            Delete Conversation
          </DialogTitle>
          <div className='mt-2'>
            <p className='text-pretty text-sm text-gray-500'>
              Are you sure you want delete this conversation? This action cannot
              be undone.
            </p>
          </div>
        </div>
      </div>
      <div className='mt-4 flex justify-center sm:justify-start sm:flex-row-reverse gap-4'>
        <Button danger disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button secondary disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
