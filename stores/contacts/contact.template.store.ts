import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type contactFactor = {
  id: number;
  name: string;
  isSelected: boolean;
};

interface ContactTemplateType {
  templateFactors: contactFactor[] | [];
  setTemplateFactors: (arr: contactFactor[]) => void;
}

export const useContactTemplateStore = create<ContactTemplateType>()(
  persist(
    set => ({
      templateFactors: [
        { id: 1, name: 'Email', isSelected: true },
        { id: 2, name: 'Job Title', isSelected: true },
        { id: 3, name: 'Phone Number', isSelected: false },
        { id: 4, name: 'Status', isSelected: false },
      ],
      setTemplateFactors: factor => set(() => ({ templateFactors: factor })),
    }),
    {
      name: 'contact-template-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        templateFactors: state.templateFactors,
        setTemplateFactors: state.setTemplateFactors,
      }),
    }
  )
);
