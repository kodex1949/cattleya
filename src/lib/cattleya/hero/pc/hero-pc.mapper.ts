import type {
  ActiveHeroPCContent,
  HeroPCContentRow,
  HeroPCMediaItem,
} from "./hero-pc.types";

import { isValidAbsoluteUrl } from "./hero-pc.utils";

function parseMedia(value: unknown): HeroPCMediaItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is { id?: unknown; type?: unknown; url?: unknown } => {
      return typeof item === "object" && item !== null;
    })
    .map((item, index): HeroPCMediaItem => {
      const mediaType: "image" | "video" =
        item.type === "video" ? "video" : "image";

      return {
        id: typeof item.id === "string" ? item.id : `hero-media-${index + 1}`,
        type: mediaType,
        url: typeof item.url === "string" ? item.url : "",
      };
    })
    .filter((item) => item.url.length > 0 && isValidAbsoluteUrl(item.url));
}

export function mapHeroPCContent(
  data: HeroPCContentRow
): ActiveHeroPCContent {
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