'use client'

import React from 'react'
import { Button } from '@/components';
import useStore from '@/utils/ComplaintMgmtStore';
import { useRouter } from 'next/navigation';
import { findItem } from '@/utils/formatter';

const ComplaintsTable = ({ all = false }) => {
  const router = useRouter();
  const complaintStore = useStore((state) => state);

  const handleComplaintDetails = (id, courseId) => {
    complaintStore.setCourseID(courseId);
    router.push(`/complaints/${id}`);
  };

  return (
    <div className='min-h-[60vh] relative'>
      {!all && <div className="flex justify-between items-center">
      <h6 className='capitalize text-xl font-medium text-gray-900'>Complaints</h6>
      <Button title='View all' outlined  clickAction={() => router.push('/complaints')}  icon="/assets/icons/ArrowUpRight.svg" es='!w-fit px-3 !py-1 !mt-0' />  
      </div>}
      <div className="overflow-x-auto mt-5 rounded-lg">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr className="text-left font-medium text-gray-600">
              <th className="p-4">Complaint</th>
              <th className="p-4">Course Code</th>
              <th className="p-4 hidden md:block">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {complaintStore.complaints?.map((item) => {
              return (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm relative">
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{findItem(item.courseId)}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                 className={`px-3 py-1 rounded-full lowercase text-sm font-medium ${
                  (() => {
                    switch (item.status.toLowerCase()) {
                      case "submitted":
                        return "bg-red-100 text-red-700"; // Red for submitted
                      case "pending":
                        return "bg-yellow-100 text-yellow-700"; // Yellow for pending
                      case "resolved":
                        return "bg-green-100 text-green-700"; // Green for resolved
                      default:
                        return "bg-gray-100 text-gray-700"; // Default (in case of unexpected status)
                    }
                  })()
                }`}
                
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Action Column */}
                  <td className="px-4 py-3 text-center relative">
                    <Button title='View' outlined es='!w-fit px-5 !mt-0' clickAction={() => handleComplaintDetails(item.id, item.courseId)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintsTable;
