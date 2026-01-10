import { fetchPublicStoriesInfinity } from "@/api/story";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePublicStoriesInfinity(userId: string) {
  return useInfiniteQuery({
    queryKey: ["story", "list", "public"],
    queryFn: ({ pageParam = 0 }) =>
      fetchPublicStoriesInfinity(userId, pageParam),
    enabled: !!userId,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 5 ? allPages.length : undefined;
    },
  });
}
