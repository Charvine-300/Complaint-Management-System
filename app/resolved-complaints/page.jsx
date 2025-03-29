'use client'

import React, { useEffect } from 'react'
import { DashboardLayout, ComplaintsTable, Loading } from '@/components'
import useStore from '@/utils/ComplaintMgmtStore';


const ResolvedComplaints = () => {
  const complaintStore = useStore((state) => state);

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
                  <h1 className='capitalize text-2xl font-medium text-gray-900'>Resolved Complaints</h1>
                </div>
                <ComplaintsTable presetFilters={{ status: ['resolved'], course: [] }} all />
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

export default ResolvedComplaints