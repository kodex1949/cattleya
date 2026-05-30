export type CartMoney = {
  amount: string;
  currencyCode: string;
};

export type CartImage = {
  url: string;
  altText: string | null;
};

export type CartProduct = {
  title: string;
  handle: string;
};

export type CartVariant = {
  id: string;
  title: string;
  price: CartMoney;
  product: CartProduct;
  image?: CartImage | null;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: CartVariant;
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