'use client'

import React, { useState } from 'react';
import { Button } from '@/components';
import { useModal } from '@/utils/ModalContext';
import useStore from '@/utils/ComplaintMgmtStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';

const DeleteAccount = () => {
  const router = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const complaintStore = useStore((state) => state);
  
  const handleDelete = () => {
    setLoading(true);
    try {
      axiosInstance.post('/account/delete', { complaintId: complaintStore.userId })
      .then((res) => {
        toast.success( res.data.message  || "Account deleted successfully!");
        
        router.push('/auth/signup');
      });
    } catch (error) {
      toast.error(error.response.data.message || 'Account Deletion failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
    <p className="text-gray-600">
  Are you sure you want to delete your account?
</p>
<p className="text-gray-600 mt-5">
  This action cannot be undone. All your data, including your profile, settings, and saved information, will be permanently erased. You will lose access to your account and any associated services.
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
          title="Delete Account"
          type="button"
          es="md:w-[47%] px-2 md:px-5 !mt-0 flex !bg-red-500"
          loading={loading}
          clickAction={handleDelete}
        />
      </div>
    </div>
  );
};

export default DeleteAccount