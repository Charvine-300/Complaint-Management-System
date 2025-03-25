'use client'

import React, { useEffect } from 'react'
import { DashboardLayout, ComplaintsTable } from '@/components'
import loading from '../../public/assets/lotties/loading.json';
import useStore from '@/utils/ComplaintMgmtStore';
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
                      <Lottie animationData={loading} loop={true} />
                      <h1 className='capitalize text-2xl font-medium text-gray-900 text-center'>fetching complaints...</h1>
                      </div>
                    </div>}
      </DashboardLayout>
    </>
  )
}

export default ResolvedComplaints