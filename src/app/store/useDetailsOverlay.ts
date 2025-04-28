// useStore.ts
import { create } from "zustand";

interface CounterState {
  detailsId: number | null;
  setDetailsId: (id: number | null) => void;
}

const useDetailsOverlay = create<CounterState>((set) => ({
  detailsId: null,
  setDetailsId: (id: number | null) => set(() => ({ detailsId: id })),
}));

export default useDetailsOverlay;
