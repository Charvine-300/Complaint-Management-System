'use client'

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components';
// import useStore from '@/utils/ComplaintMgmtStore';

const FilterComponent = ({ onClose, onApply, appliedFilters }) => {
  // const complaintStore = useStore((state) => state);
  const [filters, setFilters] = useState({
    status: [],
    course: [],
  });

  useEffect(() => {
    setFilters(appliedFilters || { status: [], course: [] });
  }, [appliedFilters]);

  const filterRef = useRef(null);

  const resetFilters = () => {
    setFilters({
      status: [],
      course: [],
    });

    onApply(filters);
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: updatedCategory };
    });
  };

  return (
    <div ref={filterRef} className="absolute top-28 bg-white shadow-xl border border-gray-200 shadow-blue-300/50 p-4 rounded-md w-64 z-10">
      {/* status Status */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Complaint Status</h4>
        {["submitted", "pending", "resolved"].map((status) => (
          <label key={status} className="flex capitalize items-center gap-2 mb-1 text-gray-700">
            <input 
              type="checkbox" 
              checked={filters.status.includes(status)}
              onChange={() => handleCheckboxChange("status", status)}
            />
            {status}
          </label>
        ))}
      </div>

      {/* Leave Status */}
      {/* TODO - Use course code in filter feature */}
      {/* <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Course Code</h4>
        {complaintStore.coursesList.map((status) => (
          <label key={status.code} className="flex items-center gap-2 mb-1 text-gray-700">
            <input 
              type="checkbox" 
              checked={filters.course.includes(status.code)}
              onChange={() => handleCheckboxChange("course", status.code)}
            />
            {status.code}
          </label>
        ))}
      </div> */}

      {/* Apply Button */}
      <div className="mt-5 flex gap-3 flex-nowrap">
        <Button title="Filter" clickAction={() => onApply(filters)} es="!mt-0 w-full" />
        <Button title="Reset" clickAction={resetFilters} es="!mt-0 w-full" outlined />
      </div>
      
    </div>
  );
};

export default FilterComponent;
