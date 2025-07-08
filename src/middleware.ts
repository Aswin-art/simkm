import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/auth-middleware";
import { roleMiddleware } from "./middleware/role-middleware";
import { redirectDefaultPages } from "./middleware/redirect-default-pages";

export function middleware(req: NextRequest) {
  const authResponse = authMiddleware(req);
  if (authResponse) return authResponse;

  const roleResponse = roleMiddleware(req);
  if (roleResponse) return roleResponse;

  const redirectResponse = redirectDefaultPages(req);
  if (redirectResponse) return redirectResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/umkm/:path*", "/auth/:path*"],
};
