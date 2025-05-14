import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarksState {
  bookmarks: (string | number)[];
  addToBookmarks: (item: string | number) => void;
  removeFromBookmarks: (item: string | number) => void;
  clearBookmarks: () => void;
}

export const useBookmarks = create<BookmarksState>()(
  persist<BookmarksState>(
    (set) => ({
      bookmarks: [],
      addToBookmarks: (item) =>
        set((state) => ({
          bookmarks: [item, ...state.bookmarks.filter((i) => i != item)],
        })),
      removeFromBookmarks: (item) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((i) => i != item),
        })),
      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: "mymovies-bookmarks",
    }
  )
);
