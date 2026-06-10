import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // When behind a reverse proxy (nginx → port 3004), rewrite the request URL
  // so next-intl sees the correct public host (no port number).
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  let req = request;
  if (forwardedHost) {
    const url = request.nextUrl.clone();
    url.host = forwardedHost;
    url.protocol = forwardedProto;
    url.port = "";
    req = new NextRequest(url, request);
  }

  const response = intlMiddleware(req);

  // Strip any leaked internal port from redirect Location headers
  const location = response.headers.get("location");
  if (location) {
    try {
      const loc = new URL(location);
      if (loc.port && loc.port !== "443" && loc.port !== "80") {
        loc.port = "";
        const fixed = NextResponse.redirect(loc.toString(), { status: response.status ?? 307 });
        // Copy cookies from the original response
        response.cookies.getAll().forEach((c) => fixed.cookies.set(c));
        return fixed;
      }
    } catch {
      // not an absolute URL, leave as-is
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
