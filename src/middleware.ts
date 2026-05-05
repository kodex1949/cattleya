import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore fichiers statiques / API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") || "";

  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);

  const isOnMobileRoute = pathname.startsWith("/mobile");
  const isOnPcRoute = pathname.startsWith("/pc");

  // 📱 MOBILE → redirige vers /mobile
  if (isMobile && !isOnMobileRoute) {
    return NextResponse.redirect(new URL(`/mobile`, request.url));
  }

  // 💻 PC → redirige vers /pc
  if (!isMobile && !isOnPcRoute) {
    return NextResponse.redirect(new URL(`/pc`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};