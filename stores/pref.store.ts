import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthType {
  theme: 'light' | 'dark' | 'system' | null; // Added type for theme
  setTheme: (theme: any) => void;
}
export const usePrefStore = create<AuthType>()(
  persist(
    (set) => ({
      theme: null,
      setTheme: (theme) => set(() => ({ theme: theme })),
    }),
    {
      name: 'pref-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        theme: state.theme, // Only persist theme data
        setTheme: state.setTheme, // Only persist theme state
      }),
    }
  )
);
