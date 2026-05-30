export type ProductPCImage = {
  url: string;
  altText: string | null;
};

export type ProductPCMedia = {
  type: "image" | "video";
  url: string;
  altText: string | null;
  poster?: string | null;
};

export type ProductPCVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
};

export type ProductPCData = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  description: string;

  featuredImage: ProductPCImage | null;

  images: ProductPCImage[];

  media: ProductPCMedia[];

  variants: ProductPCVariant[];
};