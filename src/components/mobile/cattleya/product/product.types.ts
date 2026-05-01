export type ProductMedia = {
  url: string;
  altText?: string | null;
  type?: "image" | "video";
  poster?: string | null;
};

export type ProductImage = ProductMedia;

export type ShopifyMediaSource = {
  url: string;
  mimeType?: string;
  format?: string;
};

export type ShopifyMediaNode = {
  mediaContentType?: "IMAGE" | "VIDEO" | "EXTERNAL_VIDEO" | "MODEL_3D" | string;
  alt?: string | null;
  previewImage?: {
    url: string;
  } | null;
  image?: {
    url: string;
    altText?: string | null;
  } | null;
  sources?: ShopifyMediaSource[];
  originUrl?: string | null;
};

export type ProductSelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title?: string;
  availableForSale: boolean;
  image?: ProductImage | null;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  selectedOptions: ProductSelectedOption[];
};

export type ProductMobileData = {
  id: string;
  title: string;
  handle?: string;
  vendor?: string | null;
  description?: string | null;
  featuredImage?: ProductImage | null;

  images: {
    edges: {
      node: ProductImage;
    }[];
  };

  media?: {
    edges: {
      node: ShopifyMediaNode;
    }[];
  };

  variants: {
    edges: {
      node: ProductVariant;
    }[];
  };
};

export type ProductOptionGroup = {
  name: string;
  values: string[];
};