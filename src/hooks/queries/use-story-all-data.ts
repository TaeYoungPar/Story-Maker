import { fetchByUserIdData } from "@/api/story";
import { useQuery } from "@tanstack/react-query";

export function useStoryByUserIdData(userId?: string) {
  return useQuery({
    queryKey: ["story", "list", "byUser", userId],
    queryFn: () => fetchByUserIdData(userId!),
    enabled: !!userId,
  });
}
