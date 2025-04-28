// useStore.ts
import { create } from "zustand";

interface SettingsState {
  server_starter: string;
}

const useSettings = create<SettingsState>(() => ({
  server_starter: "http://localhost/mymovies_server/",
}));

export default useSettings;
