import { create } from 'zustand';
import * as Contacts from 'expo-contacts';

interface ContactStoreType {
  importContact_Obj: Contacts.Contact | null;
  setImportContact_Obj: (contactInfo: Contacts.Contact) => void;
  scannedContact_Obj: any;
  setScannedContact_Obj: (contactInfo: any) => void;
  sortByTitle: string;
  setSortByTitle: (title: string) => void;
}

export const useContactStore = create<ContactStoreType>()(
  set => ({
    importContact_Obj: null,
    scannedContact_Obj: null,
    setImportContact_Obj: contactInfo => set(() => ({ importContact_Obj: contactInfo })),
    setScannedContact_Obj: contactDetails => set(() => ({ scannedContact_Obj: contactDetails })),
    sortByTitle: 'None',
    setSortByTitle: title => set(() => ({ sortByTitle: title })),
  })
);
