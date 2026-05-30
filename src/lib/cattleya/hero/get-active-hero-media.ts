import "server-only";

import { createClient } from "@/lib/supabase/server";

export type HeroMediaItem = {
  id: string;

  type: "image" | "video";

  url: string;

  eyebrow: string | null;

  title: string;

  description: string | null;

  caption: string | null;

  primary_cta_label: string | null;

  primary_cta_href: string | null;

  secondary_cta_label: string | null;

  secondary_cta_href: string | null;
};

type HeroMediaRow = {
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

  media_url: string | null;

  is_active: boolean;
};

function isValidAbsoluteUrl(value: string) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export async function getActiveHeroMedia(): Promise<
  HeroMediaItem[]
> {
  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("hero_content_pc")
      .select(`
        id,
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
        is_active
      `)
      .eq("is_active", true)
      .order("position", {
        ascending: true,
      })
      .returns<HeroMediaRow[]>();

  if (error) {
    console.error(
      "Failed to fetch hero media:",
      error.message,
    );

    return [];
  }

  if (
    !data ||
    data.length === 0
  ) {
    return [];
  }

  return data
    .filter(
      (item) =>
        item.media_url &&
        isValidAbsoluteUrl(
          item.media_url,
        ),
    )
    .map((item) => ({
      id: item.id,

      type:
        item.media_type ===
        "video"
          ? "video"
          : "image",

      url:
        item.media_url as string,

      eyebrow:
        item.eyebrow,

      title: item.title,

      description:
        item.description,

      caption:
        item.caption,

      primary_cta_label:
        item.primary_cta_label,

      primary_cta_href:
        item.primary_cta_href,

      secondary_cta_label:
        item.secondary_cta_label,

      secondary_cta_href:
        item.secondary_cta_href,
    }));
}