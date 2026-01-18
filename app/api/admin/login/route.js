import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === "Asim@111" && password === "Asim@111") {
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: true,        // REQUIRED on Vercel
      sameSite: "lax",     // ✅ FIX (NOT none)
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
