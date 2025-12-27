// src/store/bootStore.ts
import { create } from "zustand";
import type { ReadyKey } from "../types/common";

type BootState = {
  ready: Record<ReadyKey, boolean>;
  markReady: (key: ReadyKey) => void;
  isAllReady: () => boolean;
};

export const useBootStore = create<BootState>((set, get) => ({
  ready: {
    SOCKET: false,
    AVATARS: false,
    PIXI: false,
  },

  markReady: (key: ReadyKey) => {
    set((state) => ({
      ready: { ...state.ready, [key]: true },
    }));
  },
  isAllReady: () => {
    return Object.values(get().ready).every((value) => value);
  },
}));
