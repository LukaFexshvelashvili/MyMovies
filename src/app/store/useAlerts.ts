import { create } from "zustand";

interface TAlert {
  id: number;
  title: string;
}

interface AlertsState {
  alerts: TAlert[];
  addAlert: (alert: { title: string }) => void;
  removeAlert: (id: number | string) => void;
}

const useAlerts = create<AlertsState>((set) => ({
  alerts: [],
  addAlert: (alert) =>
    set((store) => {
      const nextId = store.alerts.length > 0 ? store.alerts[0].id + 1 : 1;
      const newAlert: TAlert = {
        id: nextId,
        title: alert.title,
      };
      return {
        alerts: [newAlert, ...store.alerts],
      };
    }),
  removeAlert: (id) =>
    set((store) => ({
      alerts: store.alerts.filter((alert) => alert.id !== id),
    })),
}));

export default useAlerts;
