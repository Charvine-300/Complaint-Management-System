'use client'

import React from 'react'
import { DashboardLayout, SubHeadings, Button, EditCourses } from '@/components';
import useStore from '@/utils/ComplaintMgmtStore';
import { getWord } from '@/utils/formatter';
import { useModal } from '@/utils/ModalContext';

const Settings = () => {
  const complaintStore = useStore((state) => state);
  const { openModal } = useModal();

  return (
    <>
      <DashboardLayout>
        <div className="border-b border-gray-200 py-3 flex justify-between items-center">
          <h1 className='capitalize text-2xl font-medium text-gray-900'>Settings</h1>
        </div>

        <div className="my-8">
          <img src='/assets/images/onboarding-bg-p-800.png' alt="BG settings"   className="w-full h-[119px] block mb-8 object-cover rounded-md" />

          <div className="flex items-center gap-3 mt-8 mb-16" >
                        <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center">
                          <img src={`${complaintStore.userType.toLowerCase() === 'lecturer' ? '/assets/icons/lecturer.svg' : '/assets/icons/student.svg'}`}  className='w-6 h-6' />
                        </div>
                        <div className="flex flex-col gap-1 flex-1 max-w-[600px]">
                          <p className="text-lg font-semibold"> {complaintStore.userName} </p>
                          <p className="text-sm text-gray-600">{complaintStore.userEmail}</p>
                        </div>
                      </div>

          <SubHeadings title='personal information' img='/assets/icons/personal-info.svg' />
          <div className='border border-gray-300 rounded-md p-6 mt-5 mb-12'>
            <div className="detail-cell">
              <div className="detail-item !gap-1">
                <p className='text-sm'>First Name</p>
                <p className="text-lg font-semibold">{getWord(complaintStore?.userName, 'first')}</p>
              </div>
              <div className="detail-item !gap-1">
                <p className='text-sm'>Last Name</p>
                <p className="text-lg font-semibold">{getWord(complaintStore?.userName, 'last')}</p>
              </div>
            </div>
            <div className="detail-cell !items-start">
              <div className="detail-item !gap-1">
                <p className='text-sm'>Role</p>
                <p className="text-lg font-semibold capitalize">{complaintStore?.userType}</p>
              </div>
              <div className="detail-item !gap-1">
                <p className='text-sm'>Courses</p>
                <div className="flex flex-wrap gap-2">
  {complaintStore.coursesList?.map((item, index) => (
    <div
      className="bg-blue-300 text-sm text-black flex px-3 py-2 rounded-sm gap-1 items-center"
      key={index}
    >
      <p>{`${item.code} - ${item.name}`}</p>
    </div>
  ))}

</div>
<Button
                              title="Edit Courses"
                              type="button"
                              outlined
                              es="block !w-fit px-2 md:px-5"
                              clickAction={() => openModal("edit courses", () => <EditCourses />)}
                            />
              </div>
            </div>
          </div>

          <SubHeadings title='termination' img='/assets/icons/security.svg' />
        </div>
      </DashboardLayout>
    </>
  )
};

export default Settings;