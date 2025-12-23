import { useMutation } from "@tanstack/react-query";
import { createStory } from "@/api/story";
import type { UseMutationCallback } from "@/type";

export function useCreateStory(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createStory,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
