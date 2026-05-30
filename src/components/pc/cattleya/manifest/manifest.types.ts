export type ManifestProduct = {
  id: string;
  title: string;
  subtitle: string | null;
  tag: string | null;
  href: string;
  image: string | null;
  video?: string | null;
  price: string;
  unitPrice: string | null;
  variants: string[];
};