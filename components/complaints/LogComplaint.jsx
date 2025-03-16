'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components';
import useStore from '@/utils/ComplaintMgmtStore';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';
import { useModal } from '@/utils/ModalContext';


const LogComplaint = () => {
  const [loading, setLoading] = useState(false);
  const complaintStore = useStore((state) => state);
  const defaultComplaint = complaintStore.complaintDetails || {};
  const { closeModal } = useModal();

  const typesList = ['Assessments and Exams', 'Projects', 'Presentations', 'Other'];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  }  = useForm({ 
    mode: "onChange",
    defaultValues: defaultComplaint,
  });

  const onSubmit = async (data) => {
    // console.log(data);
    // TODO - Update to either log or edit complaints
    setLoading(true);
    try {
      await axiosInstance.post('/complaint/create', data)
      .then((res) => {
        toast.success( res.data.message  || "Complaint logged successfully!");
        closeModal();
        complaintStore.getComplaints();
      });
    } catch (error) {
      toast.error(error.response.data.message || 'Complaint Log failed');
    } finally {
      setLoading(false);
    }
  }

  const titleValue = watch("title", ""); 

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="my-5 w-full font-dmSans">
  {/* Complaint Title Field */}
      <div className="input-field-group">
  <label htmlFor="title" className="label">Title</label>
  <div className="relative">
    <input
      type="text"
      id="title"
      {...register("title", { 
        required: "Complaint title is required", 
        // minLength: { value: 6, message: "Title must be at least 6 characters" },
        maxLength: { value: 40, message: "Title cannot exceed 40 characters" }
      })}
      className="pr-10 input"
      placeholder="e.g. Unable to access the LMS"
    />
  </div>
  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

   {/* Display real-time feedback on character count */}
   {titleValue.length > 0 && (
        <p className={`text-sm text-right ${errors.title ? 'text-red-600' : 'text-gray-600'}`}>
          {titleValue.length}/40
        </p>
      )}
</div>

{/* Complaint Type */}
  <div className="input-field-group">
    <label className="label">Complaint Type</label>
    <div className="flex flex-col gap-4">
      {typesList.map((item, idx) => {
        return (
          <label className="flex items-center gap-2 text-sm" key={idx}>
            <input
              type="radio"
              value={item}
              {...register("type", { required: "Complaint Type is required" })}
              className="radio-input cursor-pointer"
            />
            {item}
          </label>
        )
      })}
    </div>

    {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
  </div>

{/* Course for Complaint */}
  <div className="input-field-group">
    <label className="label">Course</label>
    <div className="flex flex-col gap-4">
      {complaintStore.coursesList.map(item => {
        return (
          <label className="flex items-center gap-2 text-sm" key={item.id}>
            <input
              type="radio"
              value={item.id}
              {...register("courseId", { required: "Course is required" })}
              className="radio-input cursor-pointer"
            />
            {`${item.code} - ${item.name}`}
          </label>
        )
      })}
    </div>

  {errors.courseId && <p className="text-red-500 text-sm">{errors.courseId.message}</p>}
  </div>

{/* Complaint Details Field */}
<div className="input-field-group">
  <label htmlFor="details" className="label">Details</label>
  <div className="relative">
    <textarea
      id="details"
      {...register("details", { 
        required: false, 
      })}
      className="pr-10 input h-22 resize-none"
      placeholder="Explain the issue in detail"
    ></textarea>
  </div>
  {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
</div>

          {/* Submit Button */}
          <Button title='Submit' type='submit' loading={loading} />
        </form>
    </>
  )
}

export default LogComplaint