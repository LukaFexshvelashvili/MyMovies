import { create } from "zustand";

type TtrailerOverlayStore = {
  trailerLink: string;
  setTrailerLink: (trailerId: string) => void;
};
const useTrailerOverlay = create<TtrailerOverlayStore>((set) => ({
  trailerLink: "",
  setTrailerLink: (trailerLink: string) => set(() => ({ trailerLink })),
}));

export default useTrailerOverlay;
