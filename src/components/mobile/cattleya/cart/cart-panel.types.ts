export type CartMoney = {
  amount: string;
  currencyCode: string;
};

export type CartImage = {
  url: string;
  altText?: string | null;
};

export type CartProduct = {
  title: string;
  handle: string;
  vendor?: string | null;
  featuredImage?: CartImage | null;
};

export type CartVariant = {
  id: string;
  title: string;
  image?: CartImage | null;
  price: CartMoney;
  product: CartProduct;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: CartVariant;
  cost: {
    totalAmount: CartMoney;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    nodes: CartLine[];
  };
  cost: {
    subtotalAmount: CartMoney;
    totalAmount: CartMoney;
  };
};

export type CartApiResponse = {
  cart: ShopifyCart | null;
  error?: string;
};