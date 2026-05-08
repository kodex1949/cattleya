import { createClient } from "@/lib/supabase/server";

export type HomeCategory = {
  id: string;
  title: string;
  label: string | null;
  description: string | null;
  collection_handle: string;
  image_url: string;
  background: string | null;
  accent: string | null;
};

export async function getHomeCategories(): Promise<HomeCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("home_categories")
    .select(
      `
        id,
        title,
        label,
        description,
        collection_handle,
        image_url,
        background,
        accent
      `
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Supabase home_categories error:", error);
    return [];
  }

  return data ?? [];
}