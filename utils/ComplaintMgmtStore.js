"use client"; // Add this at the top

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "./axiosInstance";

const initialState = {
  userType: "",
  userName: "",
  userID: "",
  loading: false,
  detailsLoading: false,
  isEditing: false,
  noOfCourses: 0,
  loggedComplaints: 0,
  pendingComplaints: 0,
  resolvedComplaints: 0,
  complaints: null,
  courseID: null,
  complaintDetails: null,
  accessToken: null,
  coursesList: null,
};

const useStore = create(
  persist(
    (set) => ({
      ...initialState,

      // Actions (not persisted)
      handleUserType: (type) => set({ userType: type }),
      handleUserName: (name) => set({ userName: name }),
      setAccessToken: (token) => set({ accessToken: token }),
      setUpdateUserData: (data) => 
        set((state) => ({
          coursesList: data.courses,
          accessToken: data.token,
          userName: data.name,
          userID: data.id,
          noOfCourses: data.courses.length,
          userType: data.type !== undefined ? data.type : state.userType, // Only update if `data.type` exists
        })),      
      setCoursesList: (courses) => set({ coursesList: courses }),
      getComplaints: async () => {
        try {
          set({ loading: true });
      
          const response = await axiosInstance.get("complaint/get-all");
          const complaints = response.data.data;
      
          set({
            complaints, 
            loggedComplaints: complaints.length,
            pendingComplaints: complaints.filter(complaint => complaint.status.toLowerCase() === "pending").length,
            resolvedComplaints: complaints.filter(complaint => complaint.status.toLowerCase() === "resolved").length,
          });
      
        } catch (err) {
          console.error(err);
        } finally {
          set({ loading: false });
        }
      },      
      getComplaintDetails: async (id, code) => {
        try {
          set({ detailsLoading: true });
          await axiosInstance.get(`complaint/get/${id}`)
          .then((response) => {
            set({ complaintDetails: { ...response.data.data, code } });
          });
        } catch (err) {
          console.log(err);
        } finally {
          set({ detailsLoading: false });
        }
      }, 
      clearComplaintDetails: () => {
        set({ complaintDetails: null });
      },
      clearComplaints: () => {
        set({ complaints: null })
      },
      setCourseID: (courseID) => {
        set({ courseID });
      },
      setIsEditing: (status) => {
        set({ isEditing: status });
      },      
      resetStore: () => {
        set(initialState);
        sessionStorage.removeItem("user-store"); // Clear persisted state
      },
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
