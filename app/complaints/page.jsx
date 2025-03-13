'use client'

import React, { useEffect } from 'react'
import { DashboardLayout, StatsCard, Button, ComplaintsTable, LogComplaint } from '@/components'
import useStore from '@/utils/ComplaintMgmtStore';
import { useRouter } from 'next/navigation';


const Complaints = () => {
    const router = useRouter();
    const complaintStore = useStore((state) => state);

  return (
    <>
      <DashboardLayout>
          <div className="border-b border-gray-200 py-3 flex justify-between items-center">
                  <h1 className='capitalize text-2xl font-medium text-gray-900'>All Complaints</h1>
                  {/* <Button type='button' icon='/assets/icons/plus.svg' es='!w-fit px-3 !mt-0 block md:hidden'  /> */}
                  {(complaintStore.userType ?? "").toLowerCase() === "student" && (
          <Button
            title="Log Complaint"
            type="button"
            icon="/assets/icons/plus.svg"
            es="!text-[0px] md:!text-base !w-fit px-5 !mt-0 flex"
            clickAction={() => openModal("log Complaint", () => <LogComplaint />)}
          />
        )}
        
                </div>
      </DashboardLayout>
    </>
  )
}

export default Complaints