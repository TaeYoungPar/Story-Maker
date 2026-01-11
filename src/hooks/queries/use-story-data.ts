import { fetchByStoryIdData } from "@/api/story";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function useStoryData(storyId?: number) {
  const session = useSession();
  const userId = session?.user?.id;
  return useQuery({
    queryKey: ["story", "detail", storyId, userId],
    queryFn: () => fetchByStoryIdData(storyId!, userId!),
    enabled: !!storyId && !!session?.user,
  });
}
