// useStore.ts
import { create } from "zustand";

interface TAlert {
  id: number | string;
  title: string;
}
interface AlertsState {
  alerts: TAlert[];
  addAlert: (alert: TAlert) => void;
  removeAlert: (id: number | string) => void;
}

const useAlerts = create<AlertsState>((set) => ({
  alerts: [],
  addAlert: (alert: TAlert) =>
    set((store) => ({ alerts: [alert, ...store.alerts] })),
  removeAlert: (id: number | string) =>
    set((store) => ({
      alerts: store.alerts.filter((alert: TAlert) => alert.id !== id),
    })),
}));

export default useAlerts;
