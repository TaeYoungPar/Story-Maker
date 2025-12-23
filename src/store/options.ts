import type {
  ShortsEnding,
  ShortsGenre,
  ShortsLength,
  ShortsOptions,
} from "@/type";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState: { options: ShortsOptions } = {
  options: {
    length: "10",
    genre: "공포",
    ending: "반전",
  },
};

export const useShortsOptions = create(
  combine(initialState, (set) => ({
    setLength: (length: ShortsLength) =>
      set((state) => ({
        options: {
          ...state.options,
          length,
        },
      })),
    setGenre: (genre: ShortsGenre) =>
      set((state) => ({
        options: {
          ...state.options,
          genre,
        },
      })),

    setEnding: (ending: ShortsEnding) =>
      set((state) => ({
        options: {
          ...state.options,
          ending,
        },
      })),

    resetOptions: () => set(initialState),
  })),
);
