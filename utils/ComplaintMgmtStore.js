import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      userType: "Student",
      accessToken: null,

      // Actions (not persisted)
      handleUserType: (type) => set({ userType: type }),
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => set({ accessToken: null }),
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
