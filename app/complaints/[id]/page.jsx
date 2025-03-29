"use client";

import React, { useEffect, useState } from 'react'
import { DashboardLayout, Button, LogComplaint, DeleteComplaint, ResolveComplaint, InvestigateComplaint, Loading } from '@/components'
import { useParams, useRouter } from "next/navigation";
import useStore from '@/utils/ComplaintMgmtStore';
import loading from '../../../public/assets/lotties/loading.json';
import { useModal } from '@/utils/ModalContext';
import { formatDate, timeAgo } from '@/utils/formatter';
import dynamic from "next/dynamic";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';


const Lottie = dynamic(() => import("lottie-react"), { ssr: false });


const ComplaintDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { openModal } = useModal();
  const [btnLoading, setBtnLoading] = useState(false);
  const complaintStore = useStore((state) => state);

  const handleEditModal = () => {
    complaintStore.setIsEditing(true);
    openModal("edit Complaint", () => <LogComplaint />);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setBtnLoading(true);
    data = { ...data, complaintId: complaintStore.complaintDetails.id }
    
    try {
      axiosInstance.post('/response/add', data)
      .then((res) => {
        toast.success( res.data.message  || "Response added successfully!");
        reset();

        // Update Comments
        complaintStore.getComplaintComments(id);
      });
    } catch (error) {
      toast.error(error.response.data.message || 'Response add failed');
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    complaintStore.getComplaintDetails(id);
    complaintStore.getComplaintComments(id);
  }, []);
  return (
    <>
      <DashboardLayout>
                {!complaintStore.detailsLoading ? <>

        <div className="border-b border-gray-200 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src="/assets/icons/arrow-left.svg" alt="Back icon" className='cursor-pointer' onClick={() => router.back()} />
            <h1 className='capitalize text-2xl  font-medium text-gray-900'>Complaint Details</h1>
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
        <div className='my-8'>
          <div className="detail-cell">
            <div className="detail-item">
              <p>Complaint Title:</p>
              <h1 className="text-xl font-semibold">{complaintStore.complaintDetails?.title}</h1>
            </div>
            <div className="detail-item">
              <p>Course:</p>
              <p className="text-md font-semibold">{`${complaintStore.complaintDetails?.course.code} ${complaintStore.complaintDetails?.course.name}`}</p>
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
              <p className="text-md font-semibold">{complaintStore.complaintDetails?.type}</p>
            </div>
          
          </div>
          
          <div className="detail-cell">
          <div className="detail-item">
            <p>Created at:</p>
            <p className="text-md font-semibold">{formatDate(complaintStore.complaintDetails?.createdAt)}</p>
            </div>
            <div className="detail-item">
            <p>Details:</p>
            <p className="text-md font-semibold">{complaintStore.complaintDetails?.details}</p>
            </div>
          </div>
        </div>


        {/* Complaint Comments */}
        <h1 className='capitalize text-2xl  font-medium text-gray-900 my-5'>Comments</h1>
        {complaintStore.complaintDetails?.status.toLowerCase() !== 'resolved' && <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-start my-3 w-full">
          {/* Search Input */}
          <div className="flex flex-col gap-3 flex-1 max-w-[600px]">
            <input
              type="text"
              placeholder="Add comments..."
              {...register("comment", { required: "Comment is required" })}
              disabled={complaintStore.complaintDetails?.status.toLowerCase() === "resolved" || btnLoading}
              className="input !w-full"
            />
            {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
          </div>

          <Button
            type="submit"
            icon="/assets/icons/send.svg"
            es="!w-fit px-3 !h-[42px] !mt-0"
            loading={btnLoading}
            disabled={btnLoading}
          />
        </form>}

        {!complaintStore.commentsLoading ? 
        <>
        {complaintStore.complaintComments?.length > 0 ? <div className='flex flex-col'>
          {complaintStore.complaintComments?.map((item) => (
            <div className="flex items-start gap-3 my-5" key={item.id}>
              <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center">
                <img src={`${item.lecturer ? '/assets/icons/lecturer.svg' : '/assets/icons/student.svg'}`} alt={item.id}  className='w-4 h-4' />
              </div>
              <div className="flex flex-col gap-1 flex-1 max-w-[600px]">
                <p className='text-lg'> {item.comment} </p>
                <p className="text-sm text-gray-600">{`${item.lecturer ? `${item.lecturer.name} (Lecturer)` : `${item.student.name} (Student)`} | ${timeAgo(item.createdAt)}`}</p>
              </div>
            </div>
          ))}
          </div> :

          <div className="w-full flex flex-col items-center gap-2 my-16">
            <h3 className='capitalize font-medium text-gray-900 text-center'>no comments</h3>
            {complaintStore.complaintDetails?.status.toLowerCase() !== 'resolved' &&  <p className="text-sm capitalize text-gray-600">add new comments</p>}
          </div>
        }
        </> : 
        <div className="w-full flex flex-col gap-5 my-16">
                            <Loading color='border-blue-500' es='!w-12 !h-12' />
                          <h3 className='capitalize font-medium text-gray-900 text-center'>fetching comments...</h3>
                </div>
          }
                </> : <div className="h-[80vh] w-full flex justify-center items-center">
                          <div>
                          <Lottie animationData={loading} loop={true} />
                          <h1 className='capitalize text-2xl  font-medium text-gray-900 text-center'>fetching complaint details...</h1>
                          </div>
                        </div>}

      </DashboardLayout>
    </>
  );
};

export default ComplaintDetails;
