import "server-only";

import { createClient } from "@/lib/supabase/server";

import type {
  ActiveHeroPCContent,
  HeroPCMediaItem,
} from "@/components/pc/hero/hero.types";

type HeroContentPCRow = {
  id: string;
  is_active: boolean;
  position: number;
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
  created_at: string;
};

function mapHeroPCRowToMediaItem(row: HeroContentPCRow): HeroPCMediaItem {
  return {
    id: row.id,
    type: row.media_type,
    url: row.media_url,
    eyebrow: row.eyebrow,
    title: row.title,
    description: row.description,
    caption: row.caption,
    primary_cta_label: row.primary_cta_label,
    primary_cta_href: row.primary_cta_href,
    secondary_cta_label: row.secondary_cta_label,
    secondary_cta_href: row.secondary_cta_href,
  };
}

export async function getActiveHeroPCContent(): Promise<ActiveHeroPCContent | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero_content_pc")
    .select(
      `
        id,
        is_active,
        position,
        eyebrow,
        title,
        description,
        caption,
        primary_cta_label,
        primary_cta_href,
        secondary_cta_label,
        secondary_cta_href,
        media_type,
        media_url,
        created_at
      `,
    )
    .eq("is_active", true)
    .order("position", { ascending: true })
    .returns<HeroContentPCRow[]>();

  if (error) {
    console.error("Failed to fetch hero_content_pc:", error.message);
    return null;
  }

  const slides = (data ?? []).map(mapHeroPCRowToMediaItem);

  if (slides.length === 0) {
    return null;
  }

  const firstSlide = slides[0];

  return {
    eyebrow: firstSlide.eyebrow,
    title: firstSlide.title,
    description: firstSlide.description,
    caption: firstSlide.caption,
    primary_cta_label: firstSlide.primary_cta_label,
    primary_cta_href: firstSlide.primary_cta_href,
    secondary_cta_label: firstSlide.secondary_cta_label,
    secondary_cta_href: firstSlide.secondary_cta_href,
    media: slides,
  };
}