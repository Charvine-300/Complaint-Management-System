import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  userType: 'Student',
  accessToken: null,
  handleUserType: (type) => set({ userType: type }),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))


export default useStore;