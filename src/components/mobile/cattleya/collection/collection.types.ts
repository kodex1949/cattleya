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