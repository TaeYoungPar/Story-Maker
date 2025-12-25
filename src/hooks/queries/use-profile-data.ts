import { createProfile, fetchProfile } from "@/api/profile";
import { useSession } from "@/store/session";

import { useQuery } from "@tanstack/react-query";

export function useProfileData(userId?: string) {
  const session = useSession();
  const isMine = userId === session?.user.id;
  return useQuery({
    queryKey: ["profile", "byId", userId!],
    queryFn: async () => {
      const profile = await fetchProfile(userId!);

      if (!profile && isMine) {
        return await createProfile(userId!);
      }

      return profile;
    },
    enabled: !!userId,
  });
}
