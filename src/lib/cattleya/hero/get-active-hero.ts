import "server-only";

import { createClient } from "@/lib/supabase/server";

type HeroMediaRow = {
  id: string;
  is_active: boolean;
  type: "image" | "video";
  media_url: string | null;
  eyebrow: string | null;
  title: string;
  description: string | null;
  caption: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
};

export type ActiveHero = {
  type: "image" | "video";
  mediaUrl: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  caption: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
};

function isValidAbsoluteUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function getActiveHero(): Promise<ActiveHero | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero_media")
    .select(
      `
        id,
        is_active,
        type,
        media_url,
        eyebrow,
        title,
        description,
        caption,
        primary_cta_label,
        primary_cta_href,
        secondary_cta_label,
        secondary_cta_href
      `,
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<HeroMediaRow>();

  if (error) {
    console.error("Failed to fetch active hero:", error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  if (!data.media_url || !isValidAbsoluteUrl(data.media_url)) {
    console.error("Invalid hero media_url:", data.media_url);
    return null;
  }

  return {
    type: data.type,
    mediaUrl: data.media_url,
    eyebrow: data.eyebrow,
    title: data.title,
    description: data.description,
    caption: data.caption,
    primary_cta_label: data.primary_cta_label,
    primary_cta_href: data.primary_cta_href,
    secondary_cta_label: data.secondary_cta_label,
    secondary_cta_href: data.secondary_cta_href,
  };
}