import { Fragment, useMemo, useState } from 'react';

import { format } from 'date-fns';
import { IoClose, IoTrash } from 'react-icons/io5';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import Avatar from './Avatar';
import ConfirmModal from './ConfirmModal';

import useOtherUser from '@/hooks/useOtherUser';

import type { DrawerProps } from '@/types';

const ProfileDrawer = ({ data, isOpen, onClose }: DrawerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) return `${data.users.length} members`;

    return 'Active';
  }, [data.isGroup, data.users.length]);

  return (
    <>
      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as='div' onClose={onClose} className='relative z-50'>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-gray-900 bg-opacity-50' />
          </TransitionChild>
          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed flex max-w-full ps-10 inset-y-0 right-0'>
                <TransitionChild
                  as={Fragment}
                  enter='transform transition ease-in-out duration-300'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-300'
                  leaveTo='translate-x-full'>
                  <DialogPanel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex flex-col h-full py-6 shadow-sm overflow-y-auto bg-gray-100'>
                      <div className='px-4 sm:px-6'>
                        <div className='flex items-start justify-end'>
                          <div className='ms-3 flex h-7 items-center'>
                            <button
                              type='button'
                              onClick={onClose}
                              className='rounded-full bg-amber-500 text-black hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2'>
                              <span className='sr-only'>Close Panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                        <div className='flex flex-col items-center'>
                          <div className='mb-2'>
                            <Avatar user={otherUser} />
                          </div>
                          <div className='text-lg'>{title}</div>
                          <div className='text-sm text-gray-500'>
                            {statusText}
                          </div>
                          <div className='flex gap-10 my-8'>
                            <div
                              onClick={() => setIsModalOpen(true)}
                              className='flex flex-col gap-3 items-center cursor-pointer'>
                              <div className='w-10 h-10 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center transition'>
                                <IoTrash size={20} />
                              </div>
                              <div className='text-sm font-light text-gray-500'>
                                Delete Conversation
                              </div>
                            </div>
                          </div>
                          <div className='w-full py-5 sm:px-0 bg-gray-200 rounded-lg'>
                            <dl className='space-y-4 px-4 sm:px-6'>
                              {!data.isGroup && (
                                <>
                                  <p className='font-medium'>
                                    {otherUser.name}&apos;s Info
                                  </p>
                                  <div>
                                    <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                      Email:
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                      {otherUser.email}
                                    </dd>
                                  </div>
                                </>
                              )}
                              {!data.isGroup && (
                                <>
                                  <div>
                                    <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                      Joined:
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                  <hr />
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileDrawer;
