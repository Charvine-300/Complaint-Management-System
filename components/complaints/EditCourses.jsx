'use client'

import React, { useState, useEffect } from 'react';
import { Button, Loading } from '@/components';
import { useModal } from '@/utils/ModalContext';
import useStore from '@/utils/ComplaintMgmtStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';
import { useForm } from 'react-hook-form';

const EditCourses = () => {
  const complaintStore = useStore((state) => state);
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(
    complaintStore.coursesList.map((course) => course.id) || []
  );  

  const getCourses = async () => {
    setCoursesLoading(true);
    try {
      const response = await axiosInstance.get('/course/get-all');
      setCourseList(response.data.data);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to load courses');
    } finally {
      setCoursesLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm();

  let minCourses = complaintStore.userType.toLowerCase() === 'student' ? 3 : 1;
  let maxCourses = complaintStore.userType.toLowerCase() === 'student' ? 7 : 3;

  
  const handleSelect = (course) => {
    setSelectedCourses((prevSelectedCourses) => {
      const isSelected = prevSelectedCourses.includes(course.id);
      let updatedCourses;

      if (isSelected) {
        updatedCourses = prevSelectedCourses.filter((id) => id !== course.id);
      } else if (prevSelectedCourses.length < maxCourses) {
        updatedCourses = [...prevSelectedCourses, course.id];
      } else {
        setError("courseIds", {
          type: "manual",
          message: `You can only select up to ${maxCourses} courses.`,
        });
        return prevSelectedCourses;
      }

      setValue("courseIds", updatedCourses);
      updatedCourses.length >= minCourses ? clearErrors("courseIds") : setError("courseIds", { type: "manual", message: `You must select at least ${minCourses} courses.` });
      return updatedCourses;
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    setSelectedCourses(complaintStore.coursesList.map((course) => course.id));
    setValue("courseIds", complaintStore.coursesList.map((course) => course.id)); // Sync with react-hook-form
  }, [complaintStore.coursesList, setValue]);

  const handleEditCourses = (data) => {
    console.log(data);

    // Handle submission logic
    setLoading(true);
    try {
      axiosInstance.post('/course/edit', data)
      .then((res) => {
        toast.success( res.data.message  || "Courses edited successfully!");
        complaintStore.setCoursesList(res.data.data);

        closeModal();
        complaintStore.clearComplaints();
      });
    } catch (error) {
      toast.error(error.response.data.message || 'Course editing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-gray-600">Manage your courses effortlessly! Update the list of courses you're taking or teaching to keep your profile current.</p>
      <p className="text-gray-600 mt-3">Adding or removing courses will instantly reflect on your account, ensuring you stay organized and up to date.</p>

      <form onSubmit={handleSubmit(handleEditCourses)} className="my-5 w-full font-dmSans">
        <div className="input-field-group relative">
          <label className="label">Select courses (min: {minCourses}, max: {maxCourses})</label>
          {coursesLoading && <Loading color='border-blue-500' es='w-12 h-12 my-5' />}
          <div className="mt-3 space-y-2">
            {courseList.map((course) => (
              <label key={course.id} className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleSelect(course)}
                  className="accent-blue-500"
                />
                <span>{`${course.code} - ${course.name}`}</span>
              </label>
            ))}
          </div>
          {errors.courseIds && <p className="text-red-500 text-sm">{errors.courseIds.message}</p>}
          <input type="hidden" {...register("courseIds", {
            validate: () =>
              selectedCourses.length >= minCourses && selectedCourses.length <= maxCourses
                ? true
                : `You must select between ${minCourses} and ${maxCourses} courses`,
            value: selectedCourses,
          })} />
        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between gap-3 items-center w-full mt-8">
          <Button title="Cancel" type="button" loading={loading} outlined es="md:w-[47%] px-2 md:px-5 !mt-0 flex" clickAction={closeModal} />
          <Button title="Edit Courses" type="submit" es="md:w-[47%] px-2 md:px-5 !mt-0 flex" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default EditCourses;
