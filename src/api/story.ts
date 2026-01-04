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
    .select(
      `
    *,
    story_views:story_views(count)
  `,
    )
    .eq("id", storyId)
    .single();

  if (error) throw error;

  return {
    ...data,
    views: data.story_views?.[0]?.count ?? 0,
  };
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
    .select(
      `
      *,
      story_views:story_views(count)
    `,
    )
    .eq("author_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return data.map((story) => ({
    ...story,
    views: story.story_views?.[0]?.count ?? 0,
  }));
}

export async function deleteStoryByid(storyId: number) {
  const { error } = await supabase.from("stories").delete().eq("id", storyId);

  if (error) throw error;
}

export async function createStoryView(storyId: number) {
  const { error } = await supabase.from("story_views").insert({
    story_id: storyId,
  });

  if (error) throw error;
}
