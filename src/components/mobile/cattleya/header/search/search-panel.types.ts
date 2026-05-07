export type SearchNote = {
  title: string;
  subtitle: string;
  image: string;
};

export type SearchProduct = {
  id: string;
  title: string;
  handle: string;
  vendor?: string | null;
  productType?: string | null;
  featuredImage?: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};