'use client'

import React, { useEffect } from 'react'
import { DashboardLayout, Button, ComplaintsTable, LogComplaint } from '@/components'
import loading from '../../public/assets/lotties/loading.json';
import useStore from '@/utils/ComplaintMgmtStore';
import { useModal } from '@/utils/ModalContext';
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Complaints = () => {
  const { openModal } = useModal();
  const complaintStore = useStore((state) => state);

  const handleComplaint = () => {
    complaintStore.clearComplaintDetails();
    openModal("log Complaint", () => <LogComplaint />);
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
            title="Log Complaint"
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
                      <Lottie animationData={loading} loop={true} />
                      <h1 className='capitalize text-2xl font-medium text-gray-900 text-center'>fetching complaints...</h1>
                      </div>
                    </div>}
      </DashboardLayout>
    </>
  )
}

export default Complaints