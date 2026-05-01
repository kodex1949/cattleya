import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // éviter boucle infinie
  if (
    pathname.startsWith("/mobile") ||
    pathname.startsWith("/pc") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") || "";

  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  const url = request.nextUrl.clone();

  if (isMobile) {
    url.pathname = "/mobile";
  } else {
    url.pathname = "/pc";
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/"],
};