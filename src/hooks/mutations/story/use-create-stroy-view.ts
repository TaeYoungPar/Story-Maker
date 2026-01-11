import { createStoryView } from "@/api/story";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateStoryView(storyId: number, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createStoryView(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["story", "detail", storyId, userId],
      });
    },
  });
}
