import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

const allowlist = (process.env.ADMIN_EMAIL_ALLOWLIST || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export default async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const isDev = process.env.NODE_ENV === "development";
  const isRsc = searchParams.has("_rsc");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  if (!supabaseUrl || !supabaseAnonKey) {
    if (isDev) {
      console.warn("[Proxy] [WARNING] Supabase environment variables are missing. Auth session refresh skipped.");
    }
  } else {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            req.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: req.headers,
              },
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            req.cookies.set({
              name,
              value: "",
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: req.headers,
              },
            });
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      });
      await supabase.auth.getUser();
    } catch (err) {
      if (isDev) {
        console.error("[Proxy] [ERROR] Failed to initialize Supabase client:", err);
      }
    }
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/favicon.ico" ||
    isRsc
  ) {
    if (isDev) {
      console.log(`[Proxy] [BYPASS] ${pathname}${isRsc ? " [RSC]" : ""}`);
    }
    return response;
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const email = (req.cookies.get("admin_email")?.value || "").toLowerCase();
    if (!email || !allowlist.includes(email)) {
      if (pathname.startsWith("/api/")) {
        if (isDev) console.log(`[Proxy] [REJECT] Unauthorized API access: ${pathname} -> 401`);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      if (isDev) {
        console.log(`[Proxy] [REDIRECT] Unauthorized access: ${pathname} -> /login`);
      }
      return NextResponse.redirect(url);
    }
    if (isDev) {
      console.log(`[Proxy] [HANDLED] Authorized access: ${pathname}`);
    }
  } else if (isDev) {
    console.log(`[Proxy] [NEXT] ${pathname}`);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
