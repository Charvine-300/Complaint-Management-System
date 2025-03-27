'use client'

import React, { useState } from 'react';
import { Button } from '@/components';
import { useModal } from '@/utils/ModalContext';
import useStore from '@/utils/ComplaintMgmtStore';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';

const InvestigateComplaint = () => {
  const { closeModal } = useModal();
  const complaintStore = useStore((state) => state);
  const [loading, setLoading] = useState(false);

  const handleInvestigate = () => {
     setLoading(true);

        try {
    
          axiosInstance.post('/complaint/mark-as-pending', { complaintId: complaintStore.complaintDetails.id })
          .then((res) => {
            toast.success( res.data.message  || "Complaint is being investigated!");
            closeModal();
            
            complaintStore.clearComplaints();
            complaintStore.getComplaintDetails(complaintStore.complaintDetails.id)
          });
        } catch (error) {
          toast.error(error.response.data.message || 'Complaint Investigation failed');
        } finally {
          setLoading(false);
        }
    
  };

  return (
   <div>
 <p className="text-gray-600">
  Are you sure you want to proceed with this action?
</p>
<p className="text-gray-600 mt-3">
  Taking this step will indicate that the complaint is actively being looked into and necessary actions are underway.
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
          clickAction={handleInvestigate}
          loading={loading}
        />
      </div>
   </div>
  );
};

export default InvestigateComplaint