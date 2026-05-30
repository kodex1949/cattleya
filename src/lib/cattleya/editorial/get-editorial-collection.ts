// src/lib/cattleya/editorial/get-editorial-collection.ts

import { createClient } from "@/lib/supabase/server";

export type CattleyaEditorialItem = {
  id: string;
  title: string;
  subtitle: string | null;
  href: string;
  media_url: string;
  media_type: "image" | "video";
  sort_order: number;
};

export async function getEditorialCollection(): Promise<
  CattleyaEditorialItem[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cattleya_editorial_collections")
    .select(
      `
        id,
        title,
        subtitle,
        href,
        media_url,
        media_type,
        sort_order
      `,
    )
    .eq("is_active", true)
    .order("sort_order", {
      ascending: true,
    })
    .limit(7);

  if (error) {
    console.error(
      "getEditorialCollection error:",
      error.message,
    );

    return [];
  }

  return data as CattleyaEditorialItem[];
}