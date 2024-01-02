import { create } from "zustand";

type Store = {
  collapsed: boolean;
  setCollapsed: () => void;
};

const useHeaderStore = create<Store>()((set) => ({
  collapsed: false,
  setCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));

export default useHeaderStore;
