import "server-only";

import { createClient } from "@/lib/supabase/server";

type HeroMediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
};

type HeroContentRow = {
  eyebrow: string | null;
  title: string;
  description: string | null;
  caption: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  media: unknown;
};

export type ActiveHeroContent = {
  eyebrow: string | null;
  title: string;
  description: string | null;
  caption: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  media: HeroMediaItem[];
};

function isValidAbsoluteUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function parseMedia(value: unknown): HeroMediaItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is { id?: unknown; type?: unknown; url?: unknown } => {
      return typeof item === "object" && item !== null;
    })
    .map((item, index): HeroMediaItem => {
      const mediaType: "image" | "video" =
        item.type === "video" ? "video" : "image";

      return {
        id: typeof item.id === "string" ? item.id : String(index + 1),
        type: mediaType,
        url: typeof item.url === "string" ? item.url : "",
      };
    })
    .filter((item) => item.url.length > 0 && isValidAbsoluteUrl(item.url));
}

export async function getActiveHeroContent(): Promise<ActiveHeroContent | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero_content")
    .select(`
      eyebrow,
      title,
      description,
      caption,
      primary_cta_label,
      primary_cta_href,
      secondary_cta_label,
      secondary_cta_href,
      media
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<HeroContentRow>();

  if (error) {
    console.error("Failed to fetch active hero content:", error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    eyebrow: data.eyebrow,
    title: data.title,
    description: data.description,
    caption: data.caption,
    primary_cta_label: data.primary_cta_label,
    primary_cta_href: data.primary_cta_href,
    secondary_cta_label: data.secondary_cta_label,
    secondary_cta_href: data.secondary_cta_href,
    media: parseMedia(data.media),
  };
}