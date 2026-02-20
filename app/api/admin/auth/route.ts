import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminSessionToken, SESSION_COOKIE_NAME } from "@/lib/adminSession";
import {
  checkAdminLoginRateLimit,
  clearAdminLoginFailures,
  recordAdminLoginFailure,
} from "@/lib/adminRateLimit";

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);
    const rateKey = `admin:login:${clientKey}`;
    const rate = await checkAdminLoginRateLimit(rateKey);
    if (rate.limited) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
      );
    }

    const { password } = await request.json();

    // Check password against environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD not set in environment");
      return NextResponse.json({
        error: "Server configuration error - ADMIN_PASSWORD not set"
      }, { status: 500 });
    }

    if (process.env.NODE_ENV === "production" && !sessionSecret) {
      console.error("ADMIN_SESSION_SECRET not set in production");
      return NextResponse.json({
        error: "Server configuration error - ADMIN_SESSION_SECRET not set"
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
      cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      await clearAdminLoginFailures(rateKey);
      return NextResponse.json({ success: true });
    }

    await recordAdminLoginFailure(rateKey);
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
    cookieStore.delete(SESSION_COOKIE_NAME);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
