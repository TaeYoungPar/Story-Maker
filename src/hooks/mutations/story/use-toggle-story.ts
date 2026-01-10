import { togglePublic } from "@/api/story";
import type { StoryEntity } from "@/type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export function useToggleStory(storyId: number, userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePublic,

    onMutate: async () => {
      const prev = queryClient.getQueryData<StoryEntity>([
        "story",
        "detail",
        storyId,
      ]);
      const willPublic = prev ? !prev.is_public : true;

      // 1) 상세 정보 즉시 반영
      queryClient.setQueryData<StoryEntity>(
        ["story", "detail", storyId],
        (old) => (old ? { ...old, is_public: willPublic } : old),
      );

      // 2) 내 목록 패치
      queryClient.setQueriesData<InfiniteData<StoryEntity[]>>(
        { queryKey: ["story", "list", "user", userId] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) =>
              page.map((story) =>
                story.id === storyId
                  ? { ...story, is_public: willPublic }
                  : story,
              ),
            ),
          };
        },
      );

      // 3) 공개 목록 패치
      queryClient.setQueriesData<InfiniteData<StoryEntity[]>>(
        { queryKey: ["story", "list", "public"] },
        (old) => {
          if (!old) return old;
          const exists = old.pages.some((page) =>
            page.some((story) => story.id === storyId),
          );

          // 공개로 바뀌고 리스트에 없으면 → 첫 페이지에 추가
          if (willPublic && !exists && prev) {
            return {
              ...old,
              pages: [
                [{ ...prev, is_public: true }, ...old.pages[0]],
                ...old.pages.slice(1),
              ],
            };
          }

          // 비공개로 바뀌면 → 제거
          if (!willPublic && exists) {
            return {
              ...old,
              pages: old.pages.map((page) =>
                page.filter((story) => story.id !== storyId),
              ),
            };
          }

          // 이미 리스트에 있으면 → 전체 덮어쓰기
          return {
            ...old,
            pages: old.pages.map((page) =>
              page.map((story) =>
                story.id === storyId
                  ? { ...(prev ?? story), is_public: willPublic }
                  : story,
              ),
            ),
          };
        },
      );
    },
  });
}
