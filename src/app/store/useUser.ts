import { create } from "zustand";
import { TUser } from "../types/UserTypes";

type TUseUser = {
  user: TUser | null;
  setUser: (data: TUser | null) => void;
  editUser: (data: Partial<TUser>) => void;
};

const useUser = create<TUseUser>((set) => ({
  user: null,
  setUser: (data) =>
    set(() => ({
      user: data,
    })),
  editUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
}));

export default useUser;
