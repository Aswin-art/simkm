import { type NextRequest, NextResponse } from "next/server";

export function authMiddleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const token = req.cookies.get("auth-token")?.value;
  const role = req.cookies.get("role")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isUmkmRoute = pathname.startsWith("/umkm");
  const isAuthRoute = pathname.startsWith("/auth");

  if (!token && (isAdminRoute || isUmkmRoute)) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === "/auth/login") {
    const redirectTo = searchParams.get("redirect");

    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }

    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (role === "umkm") {
      return NextResponse.redirect(new URL("/umkm", req.url));
    }
  }

  return null;
}
