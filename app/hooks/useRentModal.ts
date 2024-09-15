import { create } from "zustand";

interface RentModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
