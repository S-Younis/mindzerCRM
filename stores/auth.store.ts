import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthType {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
  isLoggedIn: boolean;
  logIn: (user: any) => void;
  logOut: () => void;
}
export const useAuthStore = create<AuthType>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoggedIn: false,
      logIn: (user) => set(() => ({ isLoggedIn: true, user })),
      logOut: () => set(() => ({ isLoggedIn: false, token: null, user: null })),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user, // Only persist user data
        isLoggedIn: state.isLoggedIn, // Only persist login state
      }),
    }
  )
);
