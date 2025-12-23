import type { ShortsOptions } from "@/type";
import supabase from "@/utils/supabase";

export async function createStory(options: ShortsOptions) {
  const { data, error } = await supabase.functions.invoke("create-story", {
    body: options,
  });

  if (error) throw error;
  return data;
}
