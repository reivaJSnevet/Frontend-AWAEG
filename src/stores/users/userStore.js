import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      setUser: (user) => set({ user }),
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
