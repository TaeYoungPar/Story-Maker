import { fetchByStoryIdData } from "@/api/story";
import { useQuery } from "@tanstack/react-query";

export function useStoryData(storyId?: number) {
  return useQuery({
    queryKey: ["story", "byId", storyId],
    queryFn: () => fetchByStoryIdData(storyId!),
    enabled: !!storyId,
  });
}
