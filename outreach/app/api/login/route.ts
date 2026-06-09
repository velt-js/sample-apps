import { NextResponse } from "next/server";
import { AUTH_COOKIE, AUTH_TOKEN, SITE_PASSWORD } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();

  if (form.get("password") === SITE_PASSWORD) {
    const res = NextResponse.redirect(new URL("/", req.url), 303);
    res.cookies.set(AUTH_COOKIE, AUTH_TOKEN, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  }

  return NextResponse.redirect(new URL("/login?error=1", req.url), 303);
}
