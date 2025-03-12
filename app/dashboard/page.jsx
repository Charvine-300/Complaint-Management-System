'use client'

import React, { useEffect } from 'react'
import { DashboardLayout, StatsCard, Button, ComplaintsTable, LogComplaint } from '@/components'
import useStore from '@/utils/ComplaintMgmtStore';
import Lottie from "lottie-react";
import loading from '../../public/assets/lotties/loading.json';
import { useModal } from '@/utils/ModalContext';

const Dashboard = () => {
  const complaintStore = useStore((state) => state);
  const { openModal } = useModal();

  useEffect(() => {
    complaintStore.getComplaints();
  }, []);
  return (
    <>
      <DashboardLayout>
        {!complaintStore.loading && complaintStore.complaints ? <>
        <div className="border-b border-gray-200 py-3 flex justify-between items-center">
          <h1 className='capitalize text-2xl font-medium text-gray-900'>{complaintStore.userType} dashboard</h1>
          <Button type='button' icon='/assets/icons/plus.svg' es='!w-fit px-3 !mt-0 block md:hidden'  />
          <Button title='Log Complaint' type='button' icon='/assets/icons/plus.svg' es='!w-fit px-5 !mt-0 hidden md:flex'  clickAction={() => openModal('log Complaint', () => <LogComplaint />)}  />
        </div>
        
        <div className="my-8">
          <h3 className='capitalize text-gray-900 text-lg'>{complaintStore.userType} statistics</h3>
          <div className="mt-5 flex gap-3 flex-col md:flex-row flex-wrap">
            <StatsCard title='No. of courses' value={complaintStore.noOfCourses || 0} icon='/assets/icons/grey-clipboard.svg' />
            <StatsCard title='Logged complaints' value={92} icon='/assets/icons/blue-clipboard.svg' />
            <StatsCard title='Pending complaints' value={92} icon='/assets/icons/red-clipboard.svg' />
            <StatsCard title='Resolved complaints' value={92} icon='/assets/icons/green-clipboard.svg' />
          </div>
        </div>

        <div className="mt-12">
          <ComplaintsTable />
        </div>
        </> :
        <div className="h-[80vh] w-full flex justify-center items-center">
          <div>
          <Lottie animationData={loading} loop={true} />
          <h1 className='capitalize text-2xl font-medium text-gray-900 text-center'>fetching user details...</h1>
          </div>
        </div>
}
      </DashboardLayout>
    </>
  )
}

export default Dashboard