import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { deleteStoryByid } from "@/api/story";
import type { StoryEntity } from "@/type";

export function useDeleteStory(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStoryByid,

    onSuccess: (_, storyId) => {
      queryClient.setQueryData<InfiniteData<StoryEntity[]>>(
        ["story", "list", "user", userId],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) =>
              page.filter((story) => story.id !== storyId),
            ),
          };
        },
      );

      queryClient.setQueryData<InfiniteData<StoryEntity[]>>(
        ["story", "list", "public"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) =>
              page.filter((story) => story.id !== storyId),
            ),
          };
        },
      );
    },
  });
}
