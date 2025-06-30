// useStore.ts
import { create } from "zustand";

interface CounterState {
  link: string;
  authOverlay: boolean;
  historyOverlay: boolean;
  bookmarksOverlay: boolean;
  setLink: (link: string) => void;
  setAuthOverlay: (show: boolean) => void;
  setHistoryOverlay: (show: boolean) => void;
  setBookmarksOverlay: (show: boolean) => void;
}

const useOverlayStore = create<CounterState>((set) => ({
  link: "",
  authOverlay: false,
  historyOverlay: false,
  bookmarksOverlay: false,
  setLink: (link: string) => set(() => ({ link })),
  setAuthOverlay: (show: boolean) => set(() => ({ authOverlay: show })),
  setHistoryOverlay: (show: boolean) => set(() => ({ historyOverlay: show })),
  setBookmarksOverlay: (show: boolean) =>
    set(() => ({ bookmarksOverlay: show })),
}));

export default useOverlayStore;
