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

    onMutate: async ({ storyId, userId, liked }) => {
      await queryClient.cancelQueries({
        queryKey: ["story", "detail", storyId, userId],
      });

      const prev = queryClient.getQueryData<StoryView>([
        "story",
        "detail",
        storyId,
        userId,
      ]);

      queryClient.setQueryData<StoryView>(
        ["story", "detail", storyId, userId],
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
        queryClient.setQueryData(
          ["story", "detail", vars.storyId, vars.userId],
          ctx.prev,
        );
      }
    },

    onSettled: (_data, _error, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["story", "detail", vars.storyId, vars.userId],
      });
    },
  });
}
