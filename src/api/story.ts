import type { ShortsOptions, StoryView } from "@/type";
import supabase from "@/utils/supabase";

export async function createStory(options: ShortsOptions) {
  const { data, error } = await supabase.functions.invoke("create-story", {
    body: options,
  });

  if (error) throw error;
  return data;
}

export async function fetchByStoryIdData(
  storyId: number,
  userId: string,
): Promise<StoryView> {
  const { data, error } = await supabase
    .from("stories")
    .select(
      `
    *,
    views:story_views(count),
    likes:story_likes(count),
    my_like:story_likes(user_id)
  `,
    )
    .eq("id", storyId)
    .eq("story_likes.user_id", userId)
    .single();

  if (error) throw error;

  return {
    ...data,
    views: data.views?.[0]?.count ?? 0,
    like_count: data.likes?.[0]?.count ?? 0,
    liked: data.my_like.length > 0,
  };
}

export async function fetchByUserIdData(userId: string): Promise<StoryView[]> {
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
  const { data, error } = await supabase
    .from("stories")
    .update({ is_public: !isPublic })
    .eq("id", storyId)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function fetchStoriesByUserInfinite(
  userId: string,
  page: number,
): Promise<StoryView[]> {
  const PAGE_SIZE = 2;
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("stories")
    .select(
      `
      *,
      views:story_views(count),
      likes:story_likes(count),
      my_like:story_likes(user_id)
    `,
    )
    .eq("author_id", userId)
    .eq("story_likes.user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return (
    data?.map((story) => ({
      ...story,
      views: story.views?.[0]?.count ?? 0,
      like_count: story.likes?.[0]?.count ?? 0,
      liked: story.my_like.length > 0,
    })) ?? []
  );
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

export async function likeStory(storyId: number, userId: string) {
  const { error } = await supabase.from("story_likes").insert({
    story_id: storyId,
    user_id: userId,
  });
  if (error) throw error;
}

export async function unlikeStory(storyId: number, userId: string) {
  const { error } = await supabase
    .from("story_likes")
    .delete()
    .eq("story_id", storyId)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function fetchPublicStoriesInfinity(
  userId: string,
  page: number,
): Promise<StoryView[]> {
  const PAGE_SIZE = 5;
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("stories")
    .select(
      `
      *,
      views:story_views(count),
      likes:story_likes(count),
      my_like:story_likes(user_id)
    `,
    )
    .eq("is_public", true)
    .eq("story_likes.user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return (
    data?.map((story) => ({
      ...story,
      views: story.views?.[0]?.count ?? 0,
      like_count: story.likes?.[0]?.count ?? 0,
      liked: story.my_like.length > 0,
    })) ?? []
  );
}
