'use client';

import { AuthLayout, Button, Loading } from '@/components';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import useStore from '@/utils/ComplaintMgmtStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const Signup = () => {
  const complaintStore = useStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError
  } = useForm();

    
  const getCourses = async () => {
    setCoursesLoading(true);

    await axiosInstance.get('/course/get-all')
    .then((response) => {
      setCourseList(response.data.data);
    })
    .catch((e) => toast.error(e.response.data.message || 'Failed to load courses'))
    .finally(() => setCoursesLoading(false));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    // Merge first_name and last_name into name
    const { first_name, last_name, ...rest } = data;
    const transformedData = {
        ...rest,
        name: `${first_name} ${last_name}`.trim(),
    };

    try {
      const response = await axiosInstance.post(`/auth/register/${complaintStore.userType.toLowerCase()}`, transformedData);
      toast.success(response.data.message);
      
      if (response?.data.token) {
        const userObject = {
          id: response.data.data.id,
          name: response.data.data.name,
          token: response.data.token,
          courses: response.data.data.courses
        };
        complaintStore.setUpdateUserData(userObject);

        router.push('/dashboard');
      }

    } catch (error) {
      toast.error(error.response.data.message || error.message || 'Signup failed');
      setLoading(false);
    }
  };

  let minCourses = complaintStore.userType.toLowerCase() == 'student' ? 3 : 1;
  let maxCourses = complaintStore.userType.toLowerCase() == 'student' ? 7 : 3;

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (course) => {
    setSelectedCourses((prevSelectedCourses) => {
        const isSelected = prevSelectedCourses.some((c) => c.id === course.id);
      
        if (isSelected) {
            // Remove course from selectedCourses
            const updatedCourses = prevSelectedCourses.filter((c) => c.id !== course.id);
            
            // Update selectedCourses and courseIds together
            setValue(
                "courseIds",
                updatedCourses.map((c) => c.id)
            );

            // Check if selection is now below minimum
            if (updatedCourses.length < minCourses) {
                setError("courseIds", { type: "manual", message: `You must select at least ${minCourses} courses.` });
            } else {
                clearErrors("courseIds");
            }

            return updatedCourses;
        }

        if (prevSelectedCourses.length < maxCourses) {
            const newSelectedCourses = [...prevSelectedCourses, course];

            // Update selectedCourses and courseIds together
            setValue(
                "courseIds",
                newSelectedCourses.map((c) => c.id)
            );

            // Remove any existing errors
            if (newSelectedCourses.length >= minCourses) {
                clearErrors("courseIds");
            }

            return newSelectedCourses;
        } else {
            setError("courseIds", { type: "manual", message: `You can only select up to ${maxCourses} courses.` });
            setIsOpen(false);
            return prevSelectedCourses;
        }
    });
};
  
  useEffect(() => {
    getCourses();
    complaintStore.resetStore(); // Clear saved state
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);
  
  return (
    <AuthLayout>
      <div className="mx-auto">
        <img
          src="/assets/icons/Full_Logo.svg"
          alt="App Logo"
          className="block mx-auto mt-8 lg:hidden"
        />
        <div className="mx-auto max-w-md text-center my-6">
          <h1 className="font-medium text-black-600 recoleta-medium text-xl">Sign Up as a {complaintStore.userType}</h1>
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
           <div className="input-field-group relative" ref={dropdownRef}>
          <div className="flex gap-3 items-center">
            <label className="label">
              Select courses (min: {minCourses}, max: {maxCourses})
            </label>
              {coursesLoading && <Loading color='border-blue-500' />}
          </div>
      
      <div className="relative">
        <div
          className="input w-full !flex justify-between items-center cursor-pointer !py-3.5"
        >
          {selectedCourses && (
  <div className='flex gap-3 flex-wrap w-[90%] max-h-[108px] overflow-y-auto'>
    {selectedCourses.map((item, index) => (
      <div className='bg-blue-300 text-sm flex px-3 py-1 rounded-sm gap-1 items-center' key={index}>
        <p>{item.code}</p>
        <img src="/assets/icons/delete.svg" alt="delete icon" className='w-3 h-4 cursor-pointer' onClick={() => handleSelect(item)} />
      </div>
    ))}
  </div>
)}
        <img 
  src="/assets/icons/CaretDown.svg" 
  alt="dropdown arrow" 
  onClick={toggleDropdown}
  className={`block ml-auto transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} 
/>
        </div>


        {isOpen && (
          <div className={`absolute z-10 w-full mt-2 max-h-[258px] overflow-y-auto bg-white border border-gray-300 shadow-lg rounded-md p-2 
            transition-all duration-300 ease-in-out transform origin-top 
            ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
          `}
        >        
          {courseList && courseList.map((course) => (
              <label key={course.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course)}
                  onChange={() => handleSelect(course)}
                  className="accent-blue-500"
                />
                <span>{`${course.code} - ${course.name}`}</span>
              </label>
            ))}
          </div>
        )}       
      </div>

      {errors.courseIds && <p className="text-red-500 text-sm">{errors.courseIds.message}</p>}
      <input type="hidden" {...register("courseIds", {
        validate: () =>
          selectedCourses.length >= minCourses && selectedCourses.length <= maxCourses
            ? true
            : `You must select between ${minCourses} and ${maxCourses} courses`,
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
          <p className="text-right text-gray-800 text-sm mt-5"> Wrong user? <Link href='/auth/signup/user-type' className="text-blue-500 cursor-pointer my-5 text-sm">Change user type</Link> </p>
          

          {/* Submit Button */}
          <Button title='Sign up' type='submit' loading={loading} />
          <p className="text-center text-gray-800 text-sm mt-5"> Already have an account? <Link href="/auth/login" className="cursor-pointer text-blue-500"> Log in </Link> </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
