export type CollectionProduct = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  image: string;
  variants: string[];
  price: {
    amount: string;
    currencyCode: string;
  };
};

export type CollectionData = {
  title: string;
  description?: string | null;
  products: CollectionProduct[];
};