import { type NextRequest, NextResponse } from "next/server";

const redirectMap: Record<string, string> = {
  "/admin": "/admin/dashboard/statistic/umkm-analytic",
  "/admin/dashboard": "/admin/dashboard/statistic/umkm-analytic",
  "/admin/dashboard/statistic": "/admin/dashboard/statistic/umkm-analytic",
  "/admin/dashboard/umkm-data": "/admin/dashboard/umkm-data/umkm-list",
  "/admin/dashboard/fund-program": "/admin/dashboard/fund-program/program-list",
  "/admin/users": "/admin/users/user-list",

  "/auth": "/auth/login",

  "/umkm": "/umkm/dashboard/statistic/business-summary",
  "/umkm/dashboard": "/umkm/dashboard/statistic/business-summary",
  "/umkm/dashboard/statistic": "/umkm/dashboard/statistic/business-summary",
  "/umkm/dashboard/business-management": "/umkm/dashboard/business-management/product-list",
  "/umkm/dashboard/money-inventory": "/umkm/dashboard/money-inventory/money-reports",
  "/umkm/settings": "/umkm/settings/profile",
};

export function redirectDefaultPages(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cleanedPath = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  const target = redirectMap[cleanedPath];
  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url);
  }

  return null;
}
