import "server-only";

import { createClient } from "@/lib/supabase/server";

export type HeroMediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
};

type HeroMediaRow = {
  id: string;
  type: "image" | "video";
  media_url: string | null;
  is_active: boolean;
};

function isValidAbsoluteUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function getActiveHeroMedia(): Promise<HeroMediaItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero_media")
    .select("id, type, media_url, is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .returns<HeroMediaRow[]>();

  if (error) {
    console.error("Failed to fetch hero media:", error.message);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data
    .filter((item) => item.media_url && isValidAbsoluteUrl(item.media_url))
    .map((item) => ({
      id: item.id,
      type: item.type,
      url: item.media_url as string,
    }));
}