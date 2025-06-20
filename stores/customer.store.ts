import { useRef } from 'react';
import { create } from 'zustand';

interface createCustomerStoreType {
  selectedErpId: number | null;
  setSelectedErpId: (id: number | null) => void;
  erpOnChangeRef: React.RefObject<((id: number) => void) | null>;

  // importContact_Obj: Contacts.Contact | null;
  // setImportContact_Obj: (contactInfo: Contacts.Contact) => void;
  // sortByTitle: string;
  // setSortByTitle: (title: string) => void;
}

export const useCreateCustomerStore = create<createCustomerStoreType>()(
  set => ({
    selectedErpId: null,
    setSelectedErpId: id => set(() => ({ selectedErpId: id })),
    erpOnChangeRef: useRef<(id: number) => void>(null),

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
