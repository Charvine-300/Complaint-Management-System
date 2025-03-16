"use client";

import React, { useEffect } from 'react'
import { DashboardLayout, StatsCard, Button, ComplaintsTable, LogComplaint, DeleteComplaint } from '@/components'
import { useParams, useRouter } from "next/navigation";
import useStore from '@/utils/ComplaintMgmtStore';
import Lottie from "lottie-react";
import loading from '../../../public/assets/lotties/loading.json';
import { useModal } from '@/utils/ModalContext';
import { formatDate } from '@/utils/formatter';


const ComplaintDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { openModal } = useModal();
  const complaintStore = useStore((state) => state);

  // TODO - Add get complaint details API

  return (
    <>
      <DashboardLayout>
        <div className="border-b border-gray-200 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src="/assets/icons/arrow-left.svg" alt="Back icon" className='cursor-pointer' onClick={() => router.back()} />
            <h1 className='capitalize text-2xl font-medium text-gray-900'>Complaint Details</h1>
          </div>
                          {(complaintStore.userType ?? "").toLowerCase() === "student" && (
          <div className="flex gap-3 items-center">
                            <Button
                            title="Edit Complaint"
                            type="button"
                            icon="/assets/icons/edit.svg"
                            es="!text-[0px] md:!text-base !w-fit px-2 md:px-5 !mt-0 flex"
                            clickAction={() => openModal("edit Complaint", () => <LogComplaint />)}
                            />
                             <Button
                            title="Delete Complaint"
                            type="button"
                            icon="/assets/icons/delete.svg"
                            outlined
                            es="!text-[0px] md:!text-base !w-fit px-2 md:px-5 !mt-0 flex"
                            clickAction={() => openModal("delete Complaint", () => <DeleteComplaint />)}
                            />
          </div>
                          )}
                        </div>
        <div className='m-8'>
          <div className="detail-cell">
            <div className="detail-item">
              <p>Complaint Title:</p>
              <h1 className="text-xl font-bold">{complaintStore.complaintDetails?.title}</h1>
            </div>
            <div className="detail-item">
              <p>Course:</p>
              <p className="recoleta-medium">{complaintStore.complaintDetails?.code}</p>
            </div>
          </div>
          
          <div className="detail-cell">
          <div className="detail-item">
              <p>Status:</p>
              {/* TODO - update status colors */}
              <p  className={`px-3 py-1 w-fit rounded-full lowercase text-md font-medium ${
                        complaintStore.complaintDetails?.status.toLowerCase() === "pending"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}>{complaintStore.complaintDetails?.status}</p>
            </div>
            <div className="detail-item">
              <p>Complaint Type:</p>
              <p className="recoleta-medium">{complaintStore.complaintDetails?.type}</p>
            </div>
          
          </div>
          
          <div className="detail-cell">
          <div className="detail-item">
            <p>Date & Time:</p>
            <p className="recoleta-medium">{formatDate(complaintStore.complaintDetails?.createdAt)}</p>
            </div>
            <div className="detail-item">
            <p>Details:</p>
            <p className="recoleta-medium">{complaintStore.complaintDetails?.details}</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ComplaintDetails;
