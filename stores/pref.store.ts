import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType } from '@/types/themeTypes';

interface PrefType {
  theme: 'light' | 'dark' | 'system' | null; 
  setTheme: (theme: ThemeType) => void;
}


export const usePrefStore =  create<PrefType>()(
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
      // onRehydrateStorage: (state) => {
      //   console.log('Rehydrating Pref Stores...');
      // }
      }
    
  )
);


