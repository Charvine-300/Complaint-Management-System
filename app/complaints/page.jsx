'use client'

import React, { useEffect } from 'react'
import { DashboardLayout, Button, ComplaintsTable, LogComplaint, Loading } from '@/components'
import useStore from '@/utils/ComplaintMgmtStore';
import { useModal } from '@/utils/ModalContext';


const Complaints = () => {
  const { openModal } = useModal();
  const complaintStore = useStore((state) => state);

  const handleComplaint = () => {
    complaintStore.clearComplaintDetails();
    openModal("Lodge Complaint", () => <LogComplaint />);
  };

  useEffect(() => {
      if (complaintStore && complaintStore.accessToken) {
        if (!complaintStore?.complaints) {
          complaintStore.getComplaints();
        }
      }
    }, []);

  return (
    <>
      <DashboardLayout>
            {!complaintStore.loading && complaintStore.complaints ? <>
          <div className="border-b border-gray-200 py-3 flex justify-between items-center">
                  <h1 className='capitalize text-2xl font-medium text-gray-900'>All Complaints</h1>
                  {(complaintStore.userType ?? "").toLowerCase() === "student" && (
          <Button
            title="Lodge Complaint"
            type="button"
            icon="/assets/icons/plus.svg"
            es="!text-[0px] md:!text-base !w-fit px-5 !mt-0 flex"
            clickAction={handleComplaint}
          />
        )}
                </div>
                <ComplaintsTable all />
            </> :  <div className="h-[80vh] w-full flex justify-center items-center">
                      <div>
                        <Loading color='border-blue-500' es='border-8 w-32 h-32 mb-8' />
                        <h1 className='capitalize text-2xl font-medium text-gray-900 text-center'>fetching complaints...</h1>
                      </div>
                    </div>}
      </DashboardLayout>
    </>
  )
}

export default Complaints