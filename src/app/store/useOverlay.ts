// useStore.ts
import { create } from "zustand";

interface CounterState {
  link: string;
}

const useOverlayStore = create<CounterState>((set) => ({
  link: "",
  setLink: (link: string) => set(() => ({ link })),
}));

export default useOverlayStore;
