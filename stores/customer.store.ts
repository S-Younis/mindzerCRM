import { create } from 'zustand';

interface createCustomerStoreType {
  erpOnChange: ((value: number) => void) | null;
  setErpOnChange: (callback: (value: number) => void) => void;
  clearErpOnChange: () => void;
  //
  selectedErpId: number;
  setSelectedErpId: (id: number) => void;
}

export const useCreateCustomerStore = create<createCustomerStoreType>()(set => ({
  erpOnChange: null,
  setErpOnChange: callback => set({ erpOnChange: callback }),
  clearErpOnChange: () => set({ erpOnChange: null, selectedErpId: -1 }),
  //
  selectedErpId: -1,
  setSelectedErpId: id => set({ selectedErpId: id }),
}));
