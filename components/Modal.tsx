'use client';

import { Fragment, type ReactNode } from 'react';

import { IoClose } from 'react-icons/io5';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50  min-h-20' onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity' />
        </TransitionChild>
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center text-center p-4 sm:p-0'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-100'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <DialogPanel className='relative transform overflow-hidden rounded-lg px-4 py-4 text-start shadow-sm bg-white transition-all w-ful sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div className='absolute right-0 top-0 hidden pe-4 pt-4 sm:block z-10'>
                  <button
                    type='button'
                    onClick={onClose}
                    className='rounded-full bg-white text-amber-500 hover:text-amber-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2'>
                    <span className='sr-only'>Close</span>
                    <IoClose className='h-6 w-6' />
                  </button>
                </div>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
