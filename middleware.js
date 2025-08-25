// middleware.js
import { NextResponse } from "next/server";

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area", charset="UTF-8"' },
  });
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect /admin (and subpaths). If you also want to protect APIs, add them in config.matcher below.
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    const auth = req.headers.get("authorization") || "";
    const [scheme, encoded] = auth.split(" ");

    if (scheme !== "Basic" || !encoded) {
      return unauthorized();
    }

    // Edge runtime: use atob instead of Buffer
    let decoded = "";
    try {
      decoded = atob(encoded);
    } catch {
      return unauthorized();
    }

    const idx = decoded.indexOf(":");
    if (idx === -1) return unauthorized();
    const user = decoded.slice(0, idx).trim();
    const pass = decoded.slice(idx + 1).trim();

    const okUser = (process.env.ADMIN_USER || "").trim();
    const okPass = (process.env.ADMIN_PASS || "").trim();

    if (!okUser || !okPass) {
      // Env not set on Vercel → block by default
      return new Response("Admin credentials not configured", { status: 500 });
    }

    if (user !== okUser || pass !== okPass) {
      return unauthorized();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // protect admin UI
    // If you later want to protect admin APIs too, uncomment:
    // "/api/getRequests",
    // "/api/updateRequest",
  ],
};
