'use client';

import { AuthLayout, Button } from '@/components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import useStore from '@/utils/ComplaintMgmtStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login = () => {
  const complaintStore = useStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/signin', data);

      if (response?.data.token) {
          const userObject = {
            id: response.data.data.id,
            name: response.data.data.name,
            token: response.data.token,
            courses: response.data.data.courses,
            type: data.role,
          };
          complaintStore.setUpdateUserData(userObject);
        router.push('/dashboard');
      }
  
      return response.data;
    } catch (error) {
      // console.error('API Error:', error);

      toast.error(error.response.data.message || 'Login failed');
      setLoading(false);
    }
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
          <h1 className="capitalize font-medium text-black-600 recoleta-medium text-xl">Log in</h1>
          <p className="text-gray-500 mt-3 text-base">Welcome back to Zenly</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="my-5 px-6 w-full font-dmSans">
          {/* User Type Select */}
          <div className="input-field-group">
          <label className="label">User Type</label>
<div className="flex gap-4">
  <label className="flex items-center gap-2 text-sm">
    <input
      type="radio"
      value="lecturer"
      {...register("role", { required: "User type is required" })}
      className="radio-input cursor-pointer"
    />
    Lecturer
  </label>

  <label className="flex items-center gap-2 text-sm">
    <input
      type="radio"
      value="student"
      {...register("role", { required: "User type is required" })}
      className="radio-input cursor-pointer"
    />
    Student
  </label>
</div>

{errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
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

          {/* Additional Feature */}
          {/* <p className="my-5 text-right text-sm text-gray-800">Forgot Password?</p> */}

          {/* Submit Button */}
          <Button title='Log in' type='submit' loading={loading} />
          <p className="text-center text-gray-800 text-sm mt-5">Don't have an account? <Link href="/auth/signup/user-type" className="cursor-pointer text-blue-500"> Sign up</Link> </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
