import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json();

  // Check password against environment variable
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD not set in environment");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  if (password === adminPassword) {
    // Set a secure cookie for the session
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}

export async function DELETE() {
  // Logout - clear the cookie
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");

  return NextResponse.json({ success: true });
}
