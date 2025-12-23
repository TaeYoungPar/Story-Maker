import { togglePublic } from "@/api/story";
import type { StoryEntity } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleStory(storyId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePublic,
    onSuccess: () => {
      queryClient.setQueryData<StoryEntity>(["story", storyId], (story) => {
        if (!story) return story;

        return {
          ...story,
          is_public: !story.is_public,
        };
      });
    },
  });
}
