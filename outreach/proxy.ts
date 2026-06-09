import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, AUTH_TOKEN } from "./lib/auth";

export function proxy(req: NextRequest) {
  const authed = req.cookies.get(AUTH_COOKIE)?.value === AUTH_TOKEN;
  if (!authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|api/login|_next|favicon.ico).*)"],
};
