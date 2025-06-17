import { create } from 'zustand';

interface CustomerStoreType {
  // importContact_Obj: Contacts.Contact | null;
  // setImportContact_Obj: (contactInfo: Contacts.Contact) => void;
  // sortByTitle: string;
  // setSortByTitle: (title: string) => void;
}

export const useCustomerStore = create<CustomerStoreType>()(
  (set) => ({
    // importContact_Obj: null,
    // setImportContact_Obj: (contactInfo) => set(() => ({ importContact_Obj: contactInfo })),
    // sortByTitle: 'None',
    // setSortByTitle: (title) => set(() => ({ sortByTitle: title })),
  })
  // {
  //   name: 'customers-store',
  //   storage: createJSONStorage(() => AsyncStorage),
  //   partialize: (state) => ({
  //     importContact_Obj: state.importContact_Obj,
  //     setImportContact_Obj: state.setImportContact_Obj,
  //   }),
  // }
);
