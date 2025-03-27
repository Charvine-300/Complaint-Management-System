"use client";

import React, { useEffect } from 'react'
import { DashboardLayout, Button, LogComplaint, DeleteComplaint, ResolveComplaint, InvestigateComplaint } from '@/components'
import { useParams, useRouter } from "next/navigation";
import useStore from '@/utils/ComplaintMgmtStore';
import loading from '../../../public/assets/lotties/loading.json';
import { useModal } from '@/utils/ModalContext';
import { formatDate } from '@/utils/formatter';
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });


const ComplaintDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { openModal } = useModal();
  const complaintStore = useStore((state) => state);

  const handleEditModal = () => {
    complaintStore.setIsEditing(true);
    openModal("edit Complaint", () => <LogComplaint />);
  }

  useEffect(() => {
    complaintStore.getComplaintDetails(id);
  }, []);
  return (
    <>
      <DashboardLayout>
                {!complaintStore.detailsLoading ? <>

        <div className="border-b border-gray-200 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src="/assets/icons/arrow-left.svg" alt="Back icon" className='cursor-pointer' onClick={() => router.back()} />
            <h1 className='capitalize text-2xl font-medium text-gray-900'>Complaint Details</h1>
          </div>
                          {(complaintStore.userType ?? "").toLowerCase() === "student" && complaintStore.userID === complaintStore.complaintDetails?.studentId && complaintStore.complaintDetails?.status.toLowerCase() !== 'resolved' &&
          <div className="flex gap-3 items-center">
                            <Button
                              title="Edit Complaint"
                              type="button"
                              icon="/assets/icons/edit.svg"
                              es="!text-[0px] md:!text-base !w-fit px-2 md:px-5 !mt-0 flex"
                              clickAction={handleEditModal}
                            />
                             <Button
                              title="Delete Complaint"
                              type="button"
                              icon="/assets/icons/delete.svg"
                              outlined
                              es="!text-[0px] md:!text-base !w-fit px-2 md:px-5 !mt-0 flex"
                              clickAction={() => openModal("delete Complaint", () => <DeleteComplaint />)}
                            />
          </div>}
          {/* TODO - Change statuses when change has been made from the BE */}
                                {(complaintStore.userType ?? "").toLowerCase() === "lecturer" &&   
                                       <div className="flex gap-3 items-center">
                                    {complaintStore.complaintDetails?.status.toLowerCase() === 'submitted' && <Button
                                    title="Investigate Complaint"
                                    type="button"
                                    outlined
                                    icon="/assets/icons/investigate.svg"
                                    es="!text-[0px] md:!text-base !w-fit px-2 md:px-5 !mt-0 flex"
                                    clickAction={() => openModal("investigate complaint", () => <InvestigateComplaint />)}
                                    />}
                                {complaintStore.complaintDetails?.status.toLowerCase() !== 'resolved' && <Button
                          title="Resolve Complaint"
                          type="button"
                          icon="/assets/icons/resolve.svg"
                          es="!text-[0px] md:!text-base !w-fit px-2 md:px-5 !mt-0 flex"
                          clickAction={() => openModal("resolve complaint", () => <ResolveComplaint />)}
                          />}
                                       </div>
                          }
                        </div>
        <div className='m-8'>
          <div className="detail-cell">
            <div className="detail-item">
              <p>Complaint Title:</p>
              <h1 className="text-xl font-bold">{complaintStore.complaintDetails?.title}</h1>
            </div>
            <div className="detail-item">
              <p>Course:</p>
              <p className="recoleta-medium">{`${complaintStore.complaintDetails?.course.code} ${complaintStore.complaintDetails?.course.name}`}</p>
            </div>
          </div>
          
          <div className="detail-cell">
          <div className="detail-item">
              <p>Status:</p>
              <p    className={`px-3 py-1 w-fit rounded-full lowercase text-sm font-medium ${
                  (() => {
                    switch (complaintStore.complaintDetails?.status.toLowerCase()) {
                      case "submitted":
                        return "bg-red-100 text-red-700"; // Red for submitted
                      case "pending":
                        return "bg-yellow-100 text-yellow-700"; // Yellow for pending
                      case "resolved":
                        return "bg-green-100 text-green-700"; // Green for resolved
                      default:
                        return "bg-gray-100 text-gray-700"; // Default (in case of unexpected status)
                    }
                  })()
                }`}>{complaintStore.complaintDetails?.status}</p>
            </div>
            <div className="detail-item">
              <p>Complaint Type:</p>
              <p className="recoleta-medium">{complaintStore.complaintDetails?.type}</p>
            </div>
          
          </div>
          
          <div className="detail-cell">
          <div className="detail-item">
            <p>Created at:</p>
            <p className="recoleta-medium">{formatDate(complaintStore.complaintDetails?.createdAt)}</p>
            </div>
            <div className="detail-item">
            <p>Details:</p>
            <p className="recoleta-medium">{complaintStore.complaintDetails?.details}</p>
            </div>
          </div>
        </div>
                </> : <div className="h-[80vh] w-full flex justify-center items-center">
                          <div>
                          <Lottie animationData={loading} loop={true} />
                          <h1 className='capitalize text-2xl font-medium text-gray-900 text-center'>fetching complaint details...</h1>
                          </div>
                        </div>}
      </DashboardLayout>
    </>
  );
};

export default ComplaintDetails;
