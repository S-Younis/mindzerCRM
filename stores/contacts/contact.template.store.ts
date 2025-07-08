import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type contactFactor = {
  id: number;
  name: string;
  isSelected: boolean;
};

type sortType = {
  sortTitle: string;
  sortDirc: 'asc' | 'desc';
};

interface ContactTemplateType {
  templateFactors: contactFactor[] | [];
  setTemplateFactors: (arr: contactFactor[]) => void;
  defaultFactors: contactFactor[] | [];
  // Sorting factors
  sortType: sortType | null;
  setSortType: (type: sortType | null) => void;
  // Filter factors
}

export const useContactTemplateStore = create<ContactTemplateType>()(
  persist(
    set => ({
      templateFactors: [
        { id: 1, name: 'Email', isSelected: true },
        { id: 2, name: 'Job Title', isSelected: true },
        { id: 3, name: 'Phone Number', isSelected: false },
        { id: 4, name: 'Status', isSelected: false },
        { id: 5, name: 'Country', isSelected: false },
      ],
      setTemplateFactors: factor => set(() => ({ templateFactors: factor })),
      defaultFactors: [
        { id: 1, name: 'Email', isSelected: true },
        { id: 2, name: 'Job Title', isSelected: true },
        { id: 3, name: 'Phone Number', isSelected: false },
        { id: 4, name: 'Status', isSelected: false },
        { id: 5, name: 'Country', isSelected: false },
      ],
      // Sorting factors
      sortType: null,
      setSortType: type => set(() => ({ sortType: type })),
      // Filter factors
    }),
    {
      name: 'contact-template-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        templateFactors: state.templateFactors,
        defaultFactors: state.defaultFactors,
        sortType: state.sortType,
      }),
    }
  )
);
