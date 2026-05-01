export type ShopifyMenuItem = {
  id: string;
  title: string;
  url: string;
  type?: string;
  items?: ShopifyMenuItem[];
};