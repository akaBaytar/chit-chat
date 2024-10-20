'use client';

import Image from 'next/image';

import Modal from './Modal';

const ImageModal = ({
  src,
  isOpen,
  onClose,
}: {
  src?: string;
  isOpen?: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='w-96 h-96'>
        <Image src={src as string} alt='Image' className='object-cover' fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
