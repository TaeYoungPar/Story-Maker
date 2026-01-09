import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeStory, unlikeStory } from "@/api/story";
import type { StoryView } from "@/type";

type ToggleLikeArgs = {
  storyId: number;
  userId: string;
  liked: boolean;
};

export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storyId, userId, liked }: ToggleLikeArgs) => {
      if (liked) {
        await unlikeStory(storyId, userId);
      } else {
        await likeStory(storyId, userId);
      }
    },

    onMutate: async ({ storyId, liked }) => {
      await queryClient.cancelQueries({
        queryKey: ["story", "byId", storyId],
      });

      const prev = queryClient.getQueryData<StoryView>([
        "story",
        "byId",
        storyId,
      ]);

      queryClient.setQueryData<StoryView>(
        ["story", "byId", storyId],
        (story) => {
          if (!story) return story;
          return {
            ...story,
            liked: !liked,
            like_count: liked ? story.like_count - 1 : story.like_count + 1,
          };
        },
      );

      return { prev };
    },

    onError: (_err, vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["story", "byId", vars.storyId], ctx.prev);
      }
    },

    onSettled: (_data, _error, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["story", "byId", vars.storyId],
      });
    },
  });
}
