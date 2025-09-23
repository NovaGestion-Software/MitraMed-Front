import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type SetStateAction<T> = T | ((prev: T) => T);
const apply = <T>(v: SetStateAction<T>, prev: T) =>
  typeof v === "function" ? (v as (p: T) => T)(prev) : v;

export interface HistorialClinicoState {
  hc: boolean;
  dniHistory: string;
  hasConfirmed: boolean;
  uiLoading: boolean;
  dniInput: string;

  setHc: (v: SetStateAction<boolean>) => void;
  setDniHistory: (v: SetStateAction<string>) => void;
  setHasConfirmed: (v: SetStateAction<boolean>) => void;
  setUiLoading: (v: SetStateAction<boolean>) => void;
  setDniInput: (v: SetStateAction<string>) => void;

  reset: () => void;
}

const creator: StateCreator<HistorialClinicoState> = (set) => ({
  hc: false,
  dniHistory: "",
  hasConfirmed: false,
  uiLoading: false,
  dniInput: "",

  setHc: (v) => set((s) => ({ hc: apply(v, s.hc) })),
  setDniHistory: (v) => set((s) => ({ dniHistory: apply(v, s.dniHistory) })),
  setHasConfirmed: (v) => set((s) => ({ hasConfirmed: apply(v, s.hasConfirmed) })),
  setUiLoading: (v) => set((s) => ({ uiLoading: apply(v, s.uiLoading) })),
  setDniInput: (v) => set((s) => ({ dniInput: apply(v, s.dniInput) })),

  reset: () =>
    set({ hc: false, dniHistory: "", hasConfirmed: false, uiLoading: false, dniInput: "" }),
});

// ⚠️ Export NOMBRE — sin default
export const useHistorialClinicoStore = create<HistorialClinicoState>()(
  persist(creator, {
    name: "hc-historialclinico",
    partialize: (s) => ({ dniHistory: s.dniHistory, dniInput: s.dniInput }),
  }),
);
