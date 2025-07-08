import { type NextRequest, NextResponse } from "next/server";

export function roleMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const role = req.cookies.get("role")?.value;

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/umkm") && role !== "umkm") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return null;
}
