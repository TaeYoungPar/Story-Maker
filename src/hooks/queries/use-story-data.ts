import { fetchByStoryIdData } from "@/api/story";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function useStoryData(storyId?: number) {
  const session = useSession();
  return useQuery({
    queryKey: ["story", "byId", storyId, session?.user.id],
    queryFn: () => fetchByStoryIdData(storyId!, session!.user.id),
    enabled: !!storyId && !!session?.user,
  });
}
