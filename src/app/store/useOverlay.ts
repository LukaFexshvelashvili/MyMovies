// useStore.ts
import { create } from "zustand";

interface CounterState {
  link: string;
  authOverlay: boolean;
  historyOverlay: boolean;
  bookmarkOverlay: boolean;
  setLink: (link: string) => void;
  setAuthOverlay: (show: boolean) => void;
  setHistoryOverlay: (show: boolean) => void;
  setBookmarkOverlay: (show: boolean) => void;
}

const useOverlayStore = create<CounterState>((set) => ({
  link: "",
  authOverlay: false,
  historyOverlay: false,
  bookmarkOverlay: false,
  setLink: (link: string) => set(() => ({ link })),
  setAuthOverlay: (show: boolean) => set(() => ({ authOverlay: show })),
  setHistoryOverlay: (show: boolean) => set(() => ({ historyOverlay: show })),
  setBookmarkOverlay: (show: boolean) => set(() => ({ bookmarkOverlay: show })),
}));

export default useOverlayStore;
