import { type Database } from "./database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type Theme = "system" | "dark" | "light";

export type ShortsLength = "10" | "20" | "30";
export type ShortsGenre = "공포" | "감동" | "유머";
export type ShortsEnding = "반전" | "교훈" | "열린 결말";

// src/type/index.ts
export type ShortsOptions = {
  length: ShortsLength;
  genre: ShortsGenre;
  ending: ShortsEnding;
};
