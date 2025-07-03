import { NextRequest, NextResponse } from "next/server";

import { authMiddleware } from "./middleware/auth-middleware";

const redirectMap: { [key: string]: string } = {
  "/admin": "/admin/dashboard/statistic/umkm-analytic",
  "/admin/dashboard": "/admin/dashboard/statistic/umkm-analytic",
  "/admin/dashboard/statistic": "/admin/dashboard/statistic/umkm-analytic",
  "/admin/dashboard/umkm-data": "/admin/dashboard/umkm-data/umkm-list",
  "/admin/dashboard/fund-program": "/admin/dashboard/fund-program/program-list",

  "/admin/users": "/admin/users/user-list",

  "/umkm": "/umkm/dashboard/statistic/business-summary",
  "/umkm/dashboard": "/umkm/dashboard/statistic/business-summary",
  "/umkm/dashboard/statistic": "/umkm/dashboard/statistic/business-summary",
  "/umkm/dashboard/business-management": "/umkm/dashboard/business-management/product-list",
  "/umkm/dashboard/money-inventory": "/umkm/dashboard/money-inventory/money-reports",

  "/umkm/settings": "/umkm/settings/profile",
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
  matcher: ["/admin/:path*", "/umkm/:path*", "/auth/:path*"],
};
