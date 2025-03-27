'use client';

import { useModal } from '@/utils/ModalContext';
import { useEffect } from 'react';

const Modal = () => {
  const { isOpen, title, content, closeModal } = useModal();

  // Disable scrolling on body when modal is open
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      if (isOpen) {
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
      } else {
        document.body.style.overflow = ''; // Restore scrolling
      }

      return () => {
        document.body.style.overflow = ''; // Cleanup on unmount
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-80 p-4 overflow-y-auto">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-[90%] mx-auto 
                   max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h5 className="text-xl capitalize">{title}</h5>
          <button className="cursor-pointer" onClick={closeModal}>
            <img src="/assets/icons/close.svg" alt="Close icon" width={20} height={20} />
          </button>
        </div>

        {/* Content Section */}
        <div className="mt-5">
          {content && content()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
