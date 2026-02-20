import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24;

type SessionPayload = {
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  if (process.env.NODE_ENV === "production") {
    return secret;
  }
  return secret || process.env.ADMIN_PASSWORD || "";
}

function sign(data: string, secret: string) {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function createAdminSessionToken() {
  const secret = getSessionSecret();
  if (!secret) return null;

  const payload: SessionPayload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string) {
  const secret = getSessionSecret();
  if (!secret) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const expectedSignature = sign(encodedPayload, secret);
  if (signature.length !== expectedSignature.length) return false;

  const matches = timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
  if (!matches) return false;

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload;

    return Number.isFinite(payload.exp) && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function hasValidAdminSession() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(SESSION_COOKIE_NAME);
  return Boolean(adminSession && verifyAdminSessionToken(adminSession.value));
}

export async function requireAdminSession() {
  if (!(await hasValidAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
