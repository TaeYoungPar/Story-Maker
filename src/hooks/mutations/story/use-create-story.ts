import { useMutation } from "@tanstack/react-query";
import { createStory } from "@/api/story";
import type { UseMutationCallback } from "@/type";
import { useNavigate } from "react-router-dom";

export function useCreateStory(callbacks?: UseMutationCallback) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createStory,
    onSuccess: (data) => {
      navigate(`/story/${data.id}`, {
        state: {
          title: data.title,
          content: data.content,
        },
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
