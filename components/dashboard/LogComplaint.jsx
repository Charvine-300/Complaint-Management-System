'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components'

const LogComplaint = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  }  = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    console.log(data);
  }

  const titleValue = watch("title", ""); 

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="my-5 w-full font-dmSans">
      <div className="input-field-group">
  {/* Complaint Title Field */}
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

{/* Complaint Details Field */}
<div className="input-field-group">
  <label htmlFor="details" className="label">Details</label>
  <div className="relative">
    <textarea
      id="details"
      {...register("details", { 
        required: false, 
      })}
      className="pr-10 input h-32 resize-none"
      placeholder="Explain the issue in detail..."
    ></textarea>
  </div>
  {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
</div>

          {/* Submit Button */}
          <Button title='Log in' type='submit' loading={loading} />
        </form>
    </>
  )
}

export default LogComplaint