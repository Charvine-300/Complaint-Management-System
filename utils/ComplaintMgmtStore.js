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
        noOfCourses: data.courses.length
      }),
      setCoursesList: (courses) => set({ coursesList: courses }),
      getComplaints: async () => {
        try {
          set({ loading: true });
          await axiosInstance.get('complaint/get-all')
          .then((response) => {
            console.log(response.data.data);
            set({ complaints: response.data.data });
          });
        } catch (err) {
          console.err(err);
        } finally {
          set({ loading: false });
        }
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
