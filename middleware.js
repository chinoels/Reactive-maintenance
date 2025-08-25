// middleware.js
import { NextResponse } from "next/server";

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area", charset="UTF-8"' },
  });
}

// Works in Edge (atob) and Node dev (Buffer)
function base64Decode(input) {
  try {
    if (typeof atob === "function") return atob(input);
  } catch {}
  try {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(input, "base64").toString("utf-8");
    }
  } catch {}
  return "";
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect /admin and subpaths
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    const auth = req.headers.get("authorization") || "";
    const [scheme, encoded] = auth.split(" ");

    if (scheme !== "Basic" || !encoded) {
      return unauthorized();
    }

    const decoded = base64Decode(encoded);
    const idx = decoded.indexOf(":");
    if (idx === -1) return unauthorized();

    const user = decoded.slice(0, idx).trim();
    const pass = decoded.slice(idx + 1).trim();

    const okUser = (process.env.ADMIN_USER || "").trim();
    const okPass = (process.env.ADMIN_PASS || "").trim();

    if (!okUser || !okPass) {
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
    // If you also want to protect admin APIs, uncomment:
    // "/api/getRequests",
    // "/api/updateRequest",
  ],
};
