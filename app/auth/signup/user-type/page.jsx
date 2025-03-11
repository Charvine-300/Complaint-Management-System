'use client';

import { AuthLayout, Button } from '@/components';
import React from 'react';
import { useRouter } from "next/navigation";
import useStore from '@/utils/ComplaintMgmtStore';


const UserType = () => {
  const complaintStore = useStore((state) => state);
  const router = useRouter();

  const handleNavigate = (userType) => {
    complaintStore.handleUserType(userType);
    router.push('/auth/signup');
  }

  return (
    <AuthLayout>
      <div className="mx-auto">
        <img
          src="/assets/icons/Full_Logo.svg"
          alt="App Logo"
          className="block mx-auto mt-8 lg:hidden"
        />
        <div className="mx-auto max-w-md text-center my-6">
          <h1 className="capitalize font-medium text-black-600 recoleta-medium text-xl">Choose user</h1>
          <p className="text-gray-500 mt-3 text-base">Get started with Zenly</p>

          <div className="flex flex-col justify-center mx-auto w-[80%] my-6">
          <Button title='Sign up as Lecturer' type='button' clickAction={() => handleNavigate('Lecturer')} />
          <Button title='Sign up as Student' type='button' clickAction={() => handleNavigate('Student')} outlined />
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default UserType