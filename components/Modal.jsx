'use client';

import { useModal } from '@/utils/ModalContext';
import { useEffect } from 'react';

const Modal = () => {
  const { isOpen, title, content, closeModal } = useModal();
  
    // Disable scrolling when the modal is open
    useEffect(() => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        if (isOpen) {
          document.body.style.overflow = 'hidden'; // Prevent scrolling
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
    <div className="fixed w-screen h-screen inset-0 flex items-center justify-center modal-overlay z-80">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-[90%] mx-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h5 className="text-xl capitalize">{title}</h5>
        <button
        className='cursor-pointer'
                onClick={closeModal}
              >
                <img src="/assets/icons/close.svg" alt="Close icon" width={20} height={20} />
              </button>
        </div>
        {/* Render dynamic content */}
        <div className="mt-5">
          {content && content()}  
        </div>

      </div>
    </div>
  );
};

export default Modal;
