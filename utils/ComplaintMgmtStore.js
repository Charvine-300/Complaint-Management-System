import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      userType: "",
      userName: "",
      accessToken: null,
      coursesList: null,

      // Actions (not persisted)
      handleUserType: (type) => set({ userType: type }),
      handleUserName: (name) => set({ userName: name }),
      setAccessToken: (token) => set({ accessToken: token }),
      setCoursesList: (courses) => set({ coursesList: courses }),
      // logout: () => set({ accessToken: null }),
    }),
    {
      name: "user-store",
      storage: {
        getItem: (key) => JSON.parse(sessionStorage.getItem(key)), // Read from sessionStorage
        setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)), // Save state only
        removeItem: (key) => sessionStorage.removeItem(key), // Remove state
      },
    //   partialize: (state) => ({
    //     bears: state.bears,
    //     userType: state.userType,
    //     accessToken: state.accessToken,
    //   }),
    }
  )
);

export default useStore;
