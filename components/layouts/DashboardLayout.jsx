'use client'

import React, { useState } from 'react'
import useStore from '@/utils/ComplaintMgmtStore';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components'


const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const complaintStore = useStore((state) => state);
  const router = useRouter();

  const logout = () => {
    complaintStore.setAccessToken(null);
    router.push('./auth/login');
  }

  return (
    <div className="flex min-h-screen justify-center">
      {/* Container with max width 1440px */}
      <div className="flex w-full max-w-[1440px] mx-auto">
        {/* Sidebar */}
        <aside
          className={`fixed h-screen inset-y-0 left-0 z-80 w-60 bg-white transition-transform lg:relative lg:translate-x-0 border-r border-gray-200 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex flex-col h-full p-4">
            <div className="mb-5 flex justify-between items-center">
              <img src="/assets/icons/Full_Logo.svg" alt="Logo icon" width={120} height={40} className='lg:block hidden' />

              {/* Sidebar Toggle for Mobile */}
              <button
                className="self-end my-2 lg:hidden block ml-auto"
                onClick={() => setIsSidebarOpen(false)}
              >
                <img src="/assets/icons/close.svg" alt="Close icon" width={25} height={25} />
              </button>
            </div>

            {/* Sidebar Content */}
            <nav className="flex-grow mt-5 space-y-4">
              <div className="flex p-2 gap-2 align-center bg-blue-100 rounded-md">
                <img src="/assets/images/ChartBar.svg" alt="dashboard icon" />
                <p className="text-blue-600">Dashboard</p>
              </div>
              {/* <a href="#" className="block px-2  text-gray-700">Settings</a>
              <a href="#" className="block px-2  text-gray-700">Profile</a> */}
            </nav>

            {/* Logout at Bottom */}
            <div className="mt-auto p-2  cursor-pointer flex items-center justify-between">
              {/* <p>Logout</p> */}
              <div>
                <p className='text-black-600 font-semibold'>{complaintStore.userName}</p>
                <p className='capitalize text-gray-600'>{complaintStore.userType}</p>
              </div>
              <img src="/assets/icons/SignOut.svg" alt="Logout icon" className='cursor-pointer' onClick={logout} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 relative">
          {/* Mobile Sidebar Toggle Button */}
          <div className="fixed top-0 left-0 w-full lg:hidden bg-white shadow-md z-50 px-4 py-1 flex justify-between items-center">
            {/* Mobile Sidebar Toggle Button */}
            <button className="p-2" onClick={() => setIsSidebarOpen(true)}>
              <img src="/assets/icons/hamburger.svg" alt="Hamburger icon" />
            </button>

            <img src="/assets/icons/Full_Logo.svg" alt="Logo icon" className='lg:hidden block' />
          </div>
          <div className="mt-[70px] lg:mt-0">
            {children}
            <Modal />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;