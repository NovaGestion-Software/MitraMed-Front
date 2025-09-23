import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { TeethIdsState } from "@/views/app/profesional/odontograma/types/odontogramaTypes";

type SetStateAction<T> = T | ((prev: T) => T);
const apply = <T>(v: SetStateAction<T>, prev: T) =>
  typeof v === "function" ? (v as (p: T) => T)(prev) : v;

export interface OdontogramaState {
  dniOdontogram: string;
  originalData: TeethIdsState;
  teethIdsState: TeethIdsState;
  hasConfirmed: boolean;
  uiLoading: boolean;
  dniInput: string;

  setDniOdontogram: (v: SetStateAction<string>) => void;
  setOriginalData: (v: SetStateAction<TeethIdsState>) => void;
  setTeethIdsState: (v: SetStateAction<TeethIdsState>) => void;
  setHasConfirmed: (v: SetStateAction<boolean>) => void;
  setUiLoading: (v: SetStateAction<boolean>) => void;
  setDniInput: (v: SetStateAction<string>) => void;

  reset: () => void;
  resetTeeth: () => void;
}

const creator: StateCreator<OdontogramaState> = (set) => ({
  dniOdontogram: "",
  originalData: {},
  teethIdsState: {},
  hasConfirmed: false,
  uiLoading: false,
  dniInput: "",

  setDniOdontogram: (v) => set((s) => ({ dniOdontogram: apply(v, s.dniOdontogram) })),
  setOriginalData: (v) => set((s) => ({ originalData: apply(v, s.originalData) })),
  setTeethIdsState: (v) => set((s) => ({ teethIdsState: apply(v, s.teethIdsState) })),
  setHasConfirmed: (v) => set((s) => ({ hasConfirmed: apply(v, s.hasConfirmed) })),
  setUiLoading: (v) => set((s) => ({ uiLoading: apply(v, s.uiLoading) })),
  setDniInput: (v) => set((s) => ({ dniInput: apply(v, s.dniInput) })),

  reset: () =>
    set({
      dniOdontogram: "",
      originalData: {},
      teethIdsState: {},
      hasConfirmed: false,
      uiLoading: false,
      dniInput: "",
    }),

  resetTeeth: () => set({ originalData: {}, teethIdsState: {} }),
});

export const useOdontogramaStore = create<OdontogramaState>()(
  persist(creator, {
    name: "odontograma-store",

    partialize: (s) => ({ dniOdontogram: s.dniOdontogram, dniInput: s.dniInput }),
  }),
);
