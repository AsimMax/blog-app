import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // allow login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // protect admin routes
  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin-auth");

    if (!authCookie) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}
