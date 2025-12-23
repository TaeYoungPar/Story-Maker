import { fetchStory } from "@/api/story";
import { useQuery } from "@tanstack/react-query";

export function useStoryData(storyId?: number) {
  return useQuery({
    queryKey: ["story", storyId],
    queryFn: () => fetchStory(storyId!),
    enabled: !!storyId,
  });
}
