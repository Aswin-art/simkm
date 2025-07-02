import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "./middleware/auth-middleware";

const redirectMap: { [key: string]: string } = {
  "/admin/dashboard": "/admin/dashboard/statistic/umkm-analytic",
  "/admin/dashboard/statistic": "/admin/dashboard/statistic/umkm-analytic",
  "/admin/dashboard/umkm-data": "/admin/dashboard/umkm-data/umkm-list",
  "/admin/dashboard/fund-program": "/admin/dashboard/fund-program/program-list",

  "/umkm/dashboard": "/umkm/dashboard/statistic/umkm-analytic",
  "/umkm/dashboard/statistic": "/umkm/dashboard/statistic/umkm-analytic",
  "/umkm/dashboard/umkm-data": "/umkm/dashboard/umkm-data/umkm-list",
  "/umkm/dashboard/fund-program": "/umkm/dashboard/fund-program/program-list",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // const response = authMiddleware(req);
  // if (response) {
  //   return response;
  // }

  if (pathname in redirectMap) {
    const url = req.nextUrl.clone();
    url.pathname = redirectMap[pathname];
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
