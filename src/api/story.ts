import type { ShortsOptions } from "@/type";
import supabase from "@/utils/supabase";

export async function createStory(options: ShortsOptions) {
  const { data, error } = await supabase.functions.invoke("create-story", {
    body: options,
  });

  if (error) throw error;
  return data;
}

export async function fetchByStoryIdData(storyId: number) {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", storyId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchByUserIdData(userId: string) {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("author_id", userId);

  if (error) throw error;
  return data;
}

export async function fetchRecentStory() {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

export async function togglePublic({
  storyId,
  isPublic,
}: {
  storyId: number;
  isPublic: boolean;
}) {
  const { error } = await supabase
    .from("stories")
    .update({ is_public: !isPublic })
    .eq("id", storyId);

  if (error) throw error;
}

const PAGE_SIZE = 2;

export async function fetchStoriesByUserInfinite(userId: string, page: number) {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
}
