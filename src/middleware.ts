import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const { device } = userAgent(request);

  const isMobile =
    device.type === "mobile" ||
    device.type === "tablet";

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(isMobile ? "/mobile" : "/pc", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};