'use client'

import React from 'react'
import { DashboardLayout, StatsCard, Button, ComplaintsTable } from '@/components'
import useStore from '@/utils/ComplaintMgmtStore';

const Dashboard = () => {
  const complaintStore = useStore((state) => state);
  return (
    <>
      <DashboardLayout>
        <div className="border-b border-gray-600 py-3 flex justify-between items-center">
          <h1 className='capitalize text-2xl font-medium text-gray-900'>{complaintStore.userType} dashboard</h1>
          {/* TODO - Only show buttons for students */}
          <Button type='button' icon='/assets/icons/plus.svg' es='!w-fit px-3 !mt-0 block md:hidden'  />
          <Button title='Log Complaint' type='button' icon='/assets/icons/plus.svg' es='!w-fit px-5 !mt-0 hidden md:flex'  />
        </div>
        
        <div className="my-8">
          <h3 className='capitalize text-gray-900 text-lg'>{complaintStore.userType} statistics</h3>
          <div className="mt-5 flex gap-3 flex-col md:flex-row flex-wrap">
            <StatsCard title='No. of courses' value={92} icon='/assets/icons/grey-clipboard.svg' />
            <StatsCard title='Logged complaints' value={92} icon='/assets/icons/blue-clipboard.svg' />
            <StatsCard title='Pending complaints' value={92} icon='/assets/icons/red-clipboard.svg' />
            <StatsCard title='Resolved complaints' value={92} icon='/assets/icons/green-clipboard.svg' />
          </div>
        </div>

        <div className="mt-12">
          <ComplaintsTable />
        </div>
      </DashboardLayout>
    </>
  )
}

export default Dashboard