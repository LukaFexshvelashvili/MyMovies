import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchHistoryState {
  history: string[];
  addToHistory: (item: string) => void;
  clearHistory: () => void;
}

export const useWatchHistory = create<WatchHistoryState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (item) =>
        set((state) => ({
          history: [item, ...state.history.filter((i) => i !== item)].slice(
            0,
            10
          ),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "mymovies-wh",
    }
  )
);
