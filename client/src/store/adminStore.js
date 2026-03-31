import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAdminStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username, password) => {
        if (
          username === import.meta.env.VITE_ADMIN_USERNAME &&
          password === import.meta.env.VITE_ADMIN_PASSWORD
        ) {
          set({ isAuthenticated: true });
          return true;
        }
        // fallback defaults
        if (username === 'admin' && password === 'nithyamdivyam@2024') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: 'nd-admin-auth' }
  )
);

export default useAdminStore;
