'use client'

import React, { useEffect } from 'react'
import { DashboardLayout, StatsCard, Button, ComplaintsTable, LogComplaint, Loading } from '@/components'
import useStore from '@/utils/ComplaintMgmtStore';
import { useModal } from '@/utils/ModalContext';

const Dashboard = () => {
  const complaintStore = useStore((state) => state);
  const { openModal } = useModal();

  useEffect(() => {
    if (complaintStore && complaintStore.accessToken) {
      if (!complaintStore?.complaints) {
        complaintStore.getComplaints();
      }
    }
  }, []);

  const handleComplaint = () => {
    complaintStore.clearComplaintDetails();
    openModal("Lodge Complaint", () => <LogComplaint />);
  };

  return (
    <>
      <DashboardLayout>
        {!complaintStore.loading && complaintStore.complaints ? <>
        <div className="border-b border-gray-200 py-3 flex justify-between items-center">
          <h1 className='capitalize text-2xl font-medium text-gray-900'>{complaintStore.userType} dashboard</h1>
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
        
        <div className="my-8">
          <h3 className='capitalize text-gray-900 text-lg'>{complaintStore.userType} statistics</h3>
          <div className="mt-5 flex gap-3 flex-col md:flex-row flex-wrap">
            <StatsCard title='No. of courses' value={complaintStore.noOfCourses || 0} icon='/assets/icons/grey-clipboard.svg' />
            <StatsCard title='Logged complaints' value={complaintStore.loggedComplaints || 0} icon='/assets/icons/blue-clipboard.svg' />
            <StatsCard title='Pending complaints' value={complaintStore.pendingComplaints || 0} icon='/assets/icons/red-clipboard.svg' />
            <StatsCard title='Resolved complaints' value={complaintStore.resolvedComplaints || 0} icon='/assets/icons/green-clipboard.svg' />
          </div>
        </div>

        <div className="mt-12">
          <ComplaintsTable />
        </div>
        </> :
        <div className="h-[80vh] w-full flex justify-center items-center">
          <div>
            <Loading color='border-blue-500' es='border-8 w-32 h-32 mb-8' />
          <h1 className='capitalize text-2xl font-medium text-gray-900 text-center'>fetching user details...</h1>
          </div>
        </div>
}
      </DashboardLayout>
    </>
  )
}

export default Dashboard