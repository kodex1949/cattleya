export type ManifestProduct = {
  id: string;
  title: string;
  href: string;
  image: string;
  video?: string | null;
  price: string;
  subtitle?: string;
  tag?: string;
  variants?: string[];
};