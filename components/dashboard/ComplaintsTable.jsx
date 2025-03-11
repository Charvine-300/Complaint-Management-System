'use client'

import React, { useState } from 'react'
import { Button } from '@/components';

const ComplaintsTable = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const complaints = [
    { complaint: "Delayed Response", category: "Support", status: "Pending" },
    { complaint: "Wrong Billing", category: "Finance", status: "Resolved" },
    { complaint: "Product Defect", category: "Quality", status: "In Progress" },
    { complaint: "Poor Service", category: "Customer Care", status: "Pending" },
  ];

  return (
    <div className='min-h-[60vh] relative'>
      <h6 className='capitalize text-xl font-medium text-gray-900'>Complaints</h6>

      <div className="overflow-x-auto mt-5 rounded-lg">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr className="text-left font-medium text-gray-600">
              <th className="p-4">Complaint</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {complaints.map((item, index) => {
              const isLastRows = index >= complaints.length - 2; // Check if dropdown will be cut off
              return (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 text-sm relative">
                  <td className="px-4 py-3">{item.complaint}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
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
