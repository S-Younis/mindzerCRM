import { create } from 'zustand';
import * as Contacts from 'expo-contacts';


interface ContactStoreType {
  importContact_Obj: Contacts.Contact | null;
  setImportContact_Obj: (contactInfo: Contacts.Contact) => void;
}

export const useContactStore = create<ContactStoreType>()(
  (set) => ({
    importContact_Obj: null,
    setImportContact_Obj: (contactInfo) => set(() => ({ importContact_Obj: contactInfo })),
  })
  // {
  //   name: 'contacts-store',
  //   storage: createJSONStorage(() => AsyncStorage),
  //   partialize: (state) => ({
  //     importContact_Obj: state.importContact_Obj,
  //     setImportContact_Obj: state.setImportContact_Obj,
  //   }),
  // }
);
