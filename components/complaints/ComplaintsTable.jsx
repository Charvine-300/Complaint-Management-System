'use client'

import React, { useState } from 'react';
import { Button, FilterComponent } from '@/components';
import useStore from '@/utils/ComplaintMgmtStore';
import { useRouter } from 'next/navigation';


const ComplaintsTable = ({ presetFilters = null, all = false }) => {
  const router = useRouter();
  const complaintStore = useStore((state) => state);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(presetFilters);

  // Filter complaints based on search term
  let filteredComplaints = complaintStore.complaints.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleComplaintDetails = (id, courseId) => {
    complaintStore.setCourseID(courseId);
    router.push(`/complaints/${id}`);
  };

   // Apply selected filters
   if (filters) {
    // console.log('testing', filters);
    filteredComplaints = filteredComplaints.filter((item) => {
      const statusMatch = filters.status.length === 0 || filters.status.includes(item.status.toLowerCase());
      const leaveMatch = filters.course.length === 0 || filters.course.includes(item.course.code);
      return statusMatch && leaveMatch;
    });
  }

  return (
    <div className='min-h-[60vh] relative'>
      {!all && (
        <div className="flex justify-between items-center">
          <h6 className='capitalize text-xl font-medium text-gray-900'>Complaints</h6>
          <Button title='View all' outlined clickAction={() => router.push('/complaints')} icon="/assets/icons/ArrowUpRight.svg" es='!w-fit px-3 !py-1 !mt-0' />  
        </div>
      )}
      
      {complaintStore.complaints.length > 0 && <div className="flex gap-3 items-center mt-5 w-fit">
        {/* Search Input */}
        <div className="input !flex gap-3 items-center flex-1 !max-w-[400px]">
          <img src="/assets/icons/search.svg" alt="Search icon" className='w-4 h-4'/>
          <input 
            type="text" 
            placeholder='Search complaints'  
            className="flex-1" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          title="Filter"
          outlined
          type="button"
          icon="/assets/icons/filter.svg"
          es="!text-[0px] md:!text-base !w-fit px-2 md:px-5 !mt-0 flex !border-gray-200 !text-gray-400"
          clickAction={() => setShowFilter(!showFilter)}
        />

        {/* Filter Dropdown */}
        {showFilter && <FilterComponent onClose={() => setShowFilter(false)} onApply={(filters) => { setFilters(filters); setShowFilter(false); }} appliedFilters={filters} />}
      </div>}

      {filteredComplaints.length > 0 ? (
        <>
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
              {filteredComplaints.map((item) => (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm relative">
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.course.code}</td>
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
                              return "bg-gray-100 text-gray-700"; // Default
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
              ))}
              </tbody>
            </table>
                  </div>
        </>
            ) : (
              <div className="flex flex-col h-full items-center justify-center">
                  <img src="/assets/icons/not-found.svg" alt="not found" className='w-32 h-32 mb-8' />
                <p  className="text-center py-4 text-gray-600">
                  No search results found
                </p>
                {presetFilters && <Button title='Go to Dashboard' es='!w-fit px-5' clickAction={() => router.push('/dashboard')} />}
              </div>
            )}
    </div>
  );
};

export default ComplaintsTable;
