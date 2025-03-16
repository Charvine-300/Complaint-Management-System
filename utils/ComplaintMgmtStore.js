"use client"; // Add this at the top

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "./axiosInstance";

const useStore = create(
  persist(
    (set) => ({
      userType: "",
      userName: "",
      userID: "",
      loading: false,
      noOfCourses: 0,
      complaints: null,
      complaintDetails: null,
      accessToken: null,
      coursesList: null,

      // Actions (not persisted)
      handleUserType: (type) => set({ userType: type }),
      handleUserName: (name) => set({ userName: name }),
      setAccessToken: (token) => set({ accessToken: token }),
      setUpdateUserData: (data) => set({
        coursesList: data.courses,
        accessToken: data.token,
        userName: data.name,
        userID: data.id,
        userType: data.type,
        noOfCourses: data.courses.length,
      }),
      setCoursesList: (courses) => set({ coursesList: courses }),
      getComplaints: async () => {
        try {
          set({ loading: true });
          await axiosInstance.get('complaint/get-all')
          .then((response) => {
            set({ complaints: response.data.data });
          });
        } catch (err) {
          console.log(err);
        } finally {
          set({ loading: false });
        }
      },
      getComplaintDetails: async (id, userComplaints, code) => {
        const foundComplaint = userComplaints.find(x => x.id == id);
      
        if (foundComplaint) {
          set({ complaintDetails: { ...foundComplaint, code } });
        } else {
          set({ complaintDetails: null }); // Handle the case where no complaint is found
        }
      },   
      clearComplaintDetails: () => {
        set({ complaintDetails: null });
      }
    }),
    {
      name: "user-store",
      storage: {
        getItem: (key) => JSON.parse(sessionStorage.getItem(key)), // Read from sessionStorage
        setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)), // Save state only
        removeItem: (key) => sessionStorage.removeItem(key), // Remove state
      },
    }
  )
);

export default useStore;
