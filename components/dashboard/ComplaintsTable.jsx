'use client'

import React from 'react'
import { Button } from '@/components';
import useStore from '@/utils/ComplaintMgmtStore';

const ComplaintsTable = () => {
  const complaintStore = useStore((state) => state);

  function findItem(id) {
    let courseDetails = complaintStore.coursesList.find(item => item.id === id);
    // console.log('Course code found!', courseDetails, complaintStore.coursesList, id);
    return courseDetails.code;
  }

  return (
    <div className='min-h-[60vh] relative'>
      <h6 className='capitalize text-xl font-medium text-gray-900'>Complaints</h6>
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
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "Pending"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Action Column */}
                  <td className="px-4 py-3 text-center relative">
                    <Button title='View' outlined es='!w-fit px-5 !mt-0' />    
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
