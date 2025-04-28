// useStore.ts
import { create } from "zustand";

interface TAlert {
  id: number;
  title: string;
}
interface AlertsState {
  alerts: TAlert[];
  addAlert: (alert: TAlert) => void;
  removeAlert: (id: number) => void;
}

const useAlerts = create<AlertsState>((set) => ({
  alerts: [],
  addAlert: (alert: TAlert) =>
    set((store) => ({ alerts: [alert, ...store.alerts] })),
  removeAlert: (id: number) =>
    set((store) => ({
      alerts: store.alerts.filter((alert: TAlert) => alert.id !== id),
    })),
}));

export default useAlerts;
