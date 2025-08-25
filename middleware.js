// middleware.js (project root)
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect /admin and all subpaths
  const isAdminPage = pathname.startsWith("/admin");

  // Optionally protect admin APIs too:
  // const isAdminApi =
  //   pathname.startsWith("/api/getRequests") ||
  //   pathname.startsWith("/api/updateRequest");

  if (isAdminPage /* || isAdminApi */) {
    const auth = req.headers.get("authorization") || "";
    const [scheme, encoded] = auth.split(" ");

    if (scheme !== "Basic" || !encoded) {
      return new Response("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
      });
    }

    const [user, pass] = Buffer.from(encoded, "base64").toString().split(":");

    const okUser = process.env.ADMIN_USER || "";
    const okPass = process.env.ADMIN_PASS || "";

    if (user !== okUser || pass !== okPass) {
      return new Response("Access denied", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // protect admin UI
    // "/api/getRequests", // <- uncomment to protect these APIs too
    // "/api/updateRequest",
  ],
};
