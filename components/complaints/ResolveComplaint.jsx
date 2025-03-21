'use client'

import React from 'react';
import { Button } from '@/components';
import { useModal } from '@/utils/ModalContext';
import useStore from '@/utils/ComplaintMgmtStore';

const ResolveComplaint = () => {
  const { openModal, closeModal } = useModal();
  const complaintStore = useStore((state) => state);

  // TODO - Integrate function for Resolve Complaint feature
  const handleResolve = () => {
    let code = findItem(complaintStore.courseID);
    
    complaintStore.clearComplaints();
    complaintStore.getComplaintDetails(defaultComplaint.id, code)
  };

  return (
   <div>
    <p className="text-gray-600">
      Are you sure you want to mark this complaint as resolved?
    </p>
    <p className="text-gray-600">
      This action will confirm that the issue has been addressed and no further action is needed.
    </p>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 items-center w-full mt-8">
        <Button
          title="Cancel"
          type="button"
          outlined
          es="md:w-[47%] px-2 md:px-5 !mt-0 flex"
          clickAction={closeModal}
        />
        <Button
          title="Yes, I understand"
          type="button"
          es="md:w-[47%] px-2 md:px-5 !mt-0 flex"
          // clickAction={() =)}
        />
      </div>
   </div>
  );
};

export default ResolveComplaint