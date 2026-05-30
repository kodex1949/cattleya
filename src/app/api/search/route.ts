import { NextResponse } from "next/server";

import { searchProducts } from "@/lib/shopify/search/search-products";

export async function GET(
  request: Request,
) {
  const { searchParams } =
    new URL(request.url);

  const query =
    searchParams.get("q") ?? "";

  const products =
    await searchProducts(query);

  return NextResponse.json(products);
}