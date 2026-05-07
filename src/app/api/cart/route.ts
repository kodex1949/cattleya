import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const CART_COOKIE = "cattleya_cart_id";

const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;

const CART_FRAGMENT = `
fragment CartFragment on Cart {
  id
  checkoutUrl
  totalQuantity

  lines(first: 50) {
    nodes {
      id
      quantity

      merchandise {
        ... on ProductVariant {
          id
          title

          image {
            url
            altText
          }

          price {
            amount
            currencyCode
          }

          product {
            title
            handle
            vendor

            featuredImage {
              url
              altText
            }
          }
        }
      }

      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }

  cost {
    subtotalAmount {
      amount
      currencyCode
    }

    totalAmount {
      amount
      currencyCode
    }
  }
}
`;

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(
    SHOPIFY_ENDPOINT,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        "X-Shopify-Storefront-Access-Token":
          process.env
            .SHOPIFY_STOREFRONT_TOKEN ??
          "",
      },

      body: JSON.stringify({
        query,
        variables,
      }),

      cache: "no-store",
    }
  );

  const json =
    await response.json();

  if (json.errors) {
    throw new Error(
      json.errors[0]?.message ??
        "Shopify Error"
    );
  }

  return json.data as T;
}

export async function GET() {
  const cookieStore =
    await cookies();

  const cartId =
    cookieStore.get(
      CART_COOKIE
    )?.value;

  if (!cartId) {
    return NextResponse.json({
      cart: null,
    });
  }

  const query = `
    ${CART_FRAGMENT}

    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
  `;

  const data =
    await shopifyFetch<{
      cart: unknown;
    }>(query, {
      cartId,
    });

  return NextResponse.json({
    cart: data.cart,
  });
}

export async function POST(
  request: Request
) {
  const body =
    (await request.json()) as {
      merchandiseId?: string;
      quantity?: number;
    };

  if (!body.merchandiseId) {
    return NextResponse.json(
      {
        error:
          "Missing merchandiseId",
      },
      {
        status: 400,
      }
    );
  }

  const cookieStore =
    await cookies();

  const currentCartId =
    cookieStore.get(
      CART_COOKIE
    )?.value;

  const query = currentCartId
    ? `
      ${CART_FRAGMENT}

      mutation AddToCart(
        $cartId: ID!,
        $lines: [CartLineInput!]!
      ) {
        cartLinesAdd(
          cartId: $cartId,
          lines: $lines
        ) {
          cart {
            ...CartFragment
          }
        }
      }
    `
    : `
      ${CART_FRAGMENT}

      mutation CreateCart(
        $lines: [CartLineInput!]!
      ) {
        cartCreate(
          input: {
            lines: $lines
          }
        ) {
          cart {
            ...CartFragment
          }
        }
      }
    `;

  const variables =
    currentCartId
      ? {
          cartId:
            currentCartId,

          lines: [
            {
              merchandiseId:
                body.merchandiseId,

              quantity:
                body.quantity ??
                1,
            },
          ],
        }
      : {
          lines: [
            {
              merchandiseId:
                body.merchandiseId,

              quantity:
                body.quantity ??
                1,
            },
          ],
        };

  const data =
    await shopifyFetch<{
      cartCreate?: {
        cart: {
          id: string;
        };
      };

      cartLinesAdd?: {
        cart: {
          id: string;
        };
      };
    }>(query, variables);

  const cart =
    data.cartCreate?.cart ??
    data.cartLinesAdd?.cart ??
    null;

  if (cart?.id) {
    cookieStore.set(
      CART_COOKIE,
      cart.id,
      {
        path: "/",

        maxAge:
          60 *
          60 *
          24 *
          30,

        sameSite: "lax",

        secure:
          process.env.NODE_ENV ===
          "production",
      }
    );
  }

  return NextResponse.json({
    cart,
  });
}

export async function PATCH(
  request: Request
) {
  const body =
    (await request.json()) as {
      lineId?: string;
      quantity?: number;
    };

  const cookieStore =
    await cookies();

  const cartId =
    cookieStore.get(
      CART_COOKIE
    )?.value;

  if (
    !cartId ||
    !body.lineId
  ) {
    return NextResponse.json(
      {
        error:
          "Missing cart data",
      },
      {
        status: 400,
      }
    );
  }

  const mutation = `
    ${CART_FRAGMENT}

    mutation UpdateCartLines(
      $cartId: ID!,
      $lines: [CartLineUpdateInput!]!
    ) {
      cartLinesUpdate(
        cartId: $cartId,
        lines: $lines
      ) {
        cart {
          ...CartFragment
        }
      }
    }
  `;

  const data =
    await shopifyFetch<{
      cartLinesUpdate: {
        cart: unknown;
      };
    }>(mutation, {
      cartId,

      lines: [
        {
          id: body.lineId,
          quantity:
            body.quantity ?? 1,
        },
      ],
    });

  return NextResponse.json({
    cart:
      data.cartLinesUpdate.cart,
  });
}