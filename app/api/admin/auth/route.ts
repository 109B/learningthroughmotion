import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminSessionToken } from "@/lib/adminSession";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Check password against environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD not set in environment");
      return NextResponse.json({
        error: "Server configuration error - ADMIN_PASSWORD not set in Vercel"
      }, { status: 500 });
    }

    if (password === adminPassword) {
      const sessionToken = createAdminSessionToken();
      if (!sessionToken) {
        return NextResponse.json({
          error: "Server configuration error - session secret missing"
        }, { status: 500 });
      }

      // Set a secure cookie for the session
      const cookieStore = await cookies();
      cookieStore.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({
      error: "Server error - please try again"
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // Logout - clear the cookie
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
