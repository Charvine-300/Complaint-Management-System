'use client'

import React from 'react'
import { DashboardLayout, Button, ComplaintsTable, LogComplaint } from '@/components'
import useStore from '@/utils/ComplaintMgmtStore';
import { useModal } from '@/utils/ModalContext';


const Complaints = () => {
  const { openModal } = useModal();
  const complaintStore = useStore((state) => state);

  const handleComplaint = () => {
    complaintStore.clearComplaintDetails();
    openModal("log Complaint", () => <LogComplaint />);
  };

  return (
    <>
      <DashboardLayout>
          <div className="border-b border-gray-200 py-3 flex justify-between items-center">
                  <h1 className='capitalize text-2xl font-medium text-gray-900'>All Complaints</h1>
                  {(complaintStore.userType ?? "").toLowerCase() === "student" && (
          <Button
            title="Log Complaint"
            type="button"
            icon="/assets/icons/plus.svg"
            es="!text-[0px] md:!text-base !w-fit px-5 !mt-0 flex"
            clickAction={handleComplaint}
          />
        )}
                </div>
                <ComplaintsTable all />
      </DashboardLayout>
    </>
  )
}

export default Complaints