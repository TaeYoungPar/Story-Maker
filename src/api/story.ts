import type { ShortsOptions } from "@/type";
import supabase from "@/utils/supabase";

export async function createStory(options: ShortsOptions) {
  const { data, error } = await supabase.functions.invoke("create-story", {
    body: options,
  });

  if (error) throw error;
  return data;
}

export async function fetchStory(storyId: number) {
  const { data, error } = await supabase
    .from("stories")
    .select("id, content, is_public, author_id, created_at")
    .eq("id", storyId)
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
