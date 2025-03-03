'use client';

import { AuthLayout } from '@/components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const Signup = () => {
  // TODO - Add state management for selected user type
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    // TODO: Handle login API call here
  };

  // TODO - Remove constants
  const coursesList = ["CSC 310", "CSC 413", "CSC 419", "CSC 410", "CSC 434", "CSC 456"];

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else if (selectedCourses.length < 7) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleDelete = (course) => {
    setSelectedCourses(selectedCourses.filter((c) => c !== course));
  };
  

  return (
    <AuthLayout>
      <div className="mx-auto">
        <img
          src="/assets/icons/Full_Logo.svg"
          alt="App Logo"
          className="block mx-auto mt-8 lg:hidden"
        />
        <div className="mx-auto max-w-md text-center my-6">
          <h1 className="capitalize font-medium text-black-600 recoleta-medium text-xl">Sign up</h1>
          <p className="text-gray-500 mt-3 text-base">Get started with Zenly</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="my-5 px-6 w-full font-dmSans">
          {/* First Name Input */}
          <div className="input-field-group">
            <label htmlFor="first_name" className="label">First Name</label>
            <input
              type="text"
              id="first_name"
              {...register("first_name", { required: "First name is required" })}
              className="input"
              placeholder="John"
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
          </div>

           {/* First Name Input */}
           <div className="input-field-group">
            <label htmlFor="last_name" className="label">Last Name</label>
            <input
              type="text"
              id="last_name"
              {...register("last_name", { required: "Last name is required" })}
              className="input"
              placeholder="Doe"
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
          </div>

          {/* Email Input */}
          <div className="input-field-group">
            <label htmlFor="email" className="label">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="input"
              placeholder="janedoe@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

           {/* List of courses Input */}
           <div className="input-field-group relative">
      <label className="label">
        List of courses to apply for (min: 3, max: 7)
      </label>
      
      <div className="relative">
        <div
          type="button"
          onClick={toggleDropdown}
          className="input text-left w-full flex justify-end items-center cursor-pointer !py-3.5"
        >
        <img 
  src="/assets/icons/CaretDown.svg" 
  alt="dropdown arrow" 
  className={`block ml-auto transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
/>
        </div>


        {isOpen && (
          <div className={`absolute z-10 w-full mt-2 bg-white border border-gray-300 shadow-lg rounded-md p-2 
            transition-all duration-300 ease-in-out transform origin-top 
            ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
          `}
        >        
            {coursesList.map((course) => (
              <label key={course} className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course)}
                  onChange={() => handleSelect(course)}
                  className="accent-blue-500"
                />
                <span>{course}</span>
              </label>
            ))}
          </div>
        )}
                {selectedCourses && (
  <div className='flex gap-3 flex-wrap mt-3'>
    {selectedCourses.map((item, index) => (
      <div className='bg-blue-300 text-sm flex px-3 py-1 rounded-sm gap-1 items-center' key={index}>
        <p>{item}</p>
        <img src="/assets/icons/delete.svg" alt="delete icon" className='w-3 h-4 cursor-pointer' onClick={() => handleDelete(item)} />
      </div>
    ))}
  </div>
)}
      </div>

      {errors.courses && <p className="text-red-500 text-sm">{errors.courses.message}</p>}
      <input type="hidden" {...register("courses", {
        validate: () =>
          selectedCourses.length >= 3 && selectedCourses.length <= 7
            ? true
            : "You must select between 3 and 7 courses",
        value: selectedCourses
      })} />
    </div>

          {/* Password Input */}
          <div className="input-field-group">
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                className="pr-10 input"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center p-2"
              >
                <img
                  src={showPassword ? "/assets/icons/eye-open.svg" : "/assets/icons/eye-close.svg"}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="w-5 h-5"
                />
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <Link href='/auth/signup/user-type' className="text-error-600 block cursor-pointer my-5 text-right text-sm text-gray-800">Change user type</Link>

          {/* Submit Button */}
          <button type="submit" className="btn primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
          <p className="text-center text-gray-800 text-sm mt-5"> Already have an account? <Link href="/auth/login" className="cursor-pointer text-blue-500"> Log in </Link> </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
