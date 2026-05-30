import "server-only";

import { createClient } from "@supabase/supabase-js";

import type {
  ActiveHeroPCContent,
  HeroPCMediaItem,
} from "@/components/pc/hero/hero.types";

type HeroPCRow = {
  id: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  caption: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  media_type: "image" | "video";
  media_url: string;
  position: number;
};

export async function getActiveHeroPCContent(): Promise<ActiveHeroPCContent | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase env vars");
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("hero_content_pc")
    .select(
      "id, eyebrow, title, description, caption, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href, media_type, media_url, position",
    )
    .eq("is_active", true)
    .order("position", { ascending: true });

  if (error) {
    console.error("Hero PC Supabase error:", error.message);
    return null;
  }

  if (!data || data.length === 0) return null;

  const rows = data as HeroPCRow[];
  const firstItem = rows[0];

  const media: HeroPCMediaItem[] = rows.map((item) => ({
    id: item.id,
    type: item.media_type === "video" ? "video" : "image",
    url: item.media_url,

    eyebrow: item.eyebrow,
    title: item.title,
    description: item.description,
    caption: item.caption,

    primary_cta_label: item.primary_cta_label,
    primary_cta_href: item.primary_cta_href,
    secondary_cta_label: item.secondary_cta_label,
    secondary_cta_href: item.secondary_cta_href,
  }));

  console.log("HERO PC MEDIA WITH TEXT:", media);

  return {
    eyebrow: firstItem.eyebrow,
    title: firstItem.title,
    description: firstItem.description,
    caption: firstItem.caption,
    primary_cta_label: firstItem.primary_cta_label,
    primary_cta_href: firstItem.primary_cta_href,
    secondary_cta_label: firstItem.secondary_cta_label,
    secondary_cta_href: firstItem.secondary_cta_href,
    media,
  };
}