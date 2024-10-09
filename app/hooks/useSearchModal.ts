import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
