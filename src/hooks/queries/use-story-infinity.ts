import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchStoriesByUserInfinite } from "@/api/story";

export function useStoryInfinite(userId: string) {
  return useInfiniteQuery({
    queryKey: ["story", "list", "user", userId],
    queryFn: ({ pageParam = 0 }) =>
      fetchStoriesByUserInfinite(userId, pageParam),
    enabled: !!userId,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 2 ? allPages.length : undefined;
    },
  });
}
