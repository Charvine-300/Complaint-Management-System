'use client'

import React from 'react';
import { Button } from '@/components';
import { useModal } from '@/utils/ModalContext';

const DeleteComplaint = () => {
  const { openModal, closeModal } = useModal();

  // TODO - Integrate function for Delete Complaint feature
  return (
   <div>
    <p className="text-gray-600">
      Are you sure you want to delete this complaint?
    </p>
    <p className="text-gray-600">
      This action cannot be undone, and you will lose all records of this complaint.
    </p>

    <div className="flex flex-col md:flex-row md:justify-between gap-3 items-center w-full mt-8">
                            <Button
                            title="Cancel"
                            type="button"
                            outlined
                            es="!text-[0px] md:!text-base md:w-[47%] px-2 md:px-5 !mt-0 flex"
                            clickAction={closeModal}
                            />
                             <Button
                            title="Yes, I understand"
                            type="button"
                            es="!text-[0px] md:!text-base md:w-[47%] px-2 md:px-5 !mt-0 flex"
                            clickAction={() => openModal("delete Complaint", () => <DeleteComplaint />)}
                            />
          </div>
   </div>
  );
};

export default DeleteComplaint