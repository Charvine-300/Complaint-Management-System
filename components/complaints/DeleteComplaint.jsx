'use client'

import React, { useState } from 'react';
import { Button } from '@/components';
import { useModal } from '@/utils/ModalContext';
import useStore from '@/utils/ComplaintMgmtStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';

const DeleteComplaint = () => {
  const router = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const complaintStore = useStore((state) => state);
  
  const handleDelete = () => {
    setLoading(true);
    try {
      axiosInstance.post('/complaint/delete', { complaintId: complaintStore.complaintDetails.id })
      .then((res) => {
        toast.success( res.data.message  || "Complaint deleted successfully!");
        closeModal();
        complaintStore.clearComplaints();
        
        router.back();
      });
    } catch (error) {
      toast.error(error.response.data.message || 'Complaint Delete failed');
    } finally {
      setLoading(false);
      console.log(loading);
    }
  };

  // TODO - Integrate function for Delete Complaint feature
  return (
    <div>
      <p className="text-gray-600">
        Are you sure you want to delete this complaint?
      </p>
      <p className="text-gray-600 mt-5">
        This action cannot be undone, and you will lose all records of this complaint.
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
          title="Delete Complaint"
          type="button"
          es="md:w-[47%] px-2 md:px-5 !mt-0 flex"
          loading={loading}
          clickAction={handleDelete}
        />
      </div>
    </div>
  );
};

export default DeleteComplaint