import { useQuery } from "@tanstack/react-query";

export function useRecentStoryData() {
  return useQuery({
    queryKey: ["story"],
  });
}
