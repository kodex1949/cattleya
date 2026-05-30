export type HeroPCMediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
};

export type HeroPCContentRow = {
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

export type ActiveHeroPCContent = {
  eyebrow: string | null;
  title: string;
  description: string | null;
  caption: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  media: HeroPCMediaItem[];
};