import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === "Asim@111" && password === "Asim@111") {
    const res = NextResponse.redirect(new URL("/admin", req.url));

    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
