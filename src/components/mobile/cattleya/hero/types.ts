export type HeroMediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
};

export type HeroMobileData = {
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