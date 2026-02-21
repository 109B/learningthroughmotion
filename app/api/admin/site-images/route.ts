import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminSession";
import {
  normalizeSiteImageOverridesPayload,
  readSiteImageOverridesFile,
  writeSiteImageOverridesFile,
} from "@/lib/siteImageOverrides";
import type { SiteImageOverridesFile } from "@/lib/siteImageConfig";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const payload = await readSiteImageOverridesFile();
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to read site image overrides:", error);
    return NextResponse.json({ error: "Failed to read site image overrides." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as unknown;
    const payload = normalizeSiteImageOverridesPayload(body);
    if (!payload) {
      return NextResponse.json({ error: "Invalid site image overrides payload." }, { status: 400 });
    }

    const now = new Date().toISOString();
    const updated: SiteImageOverridesFile = {
      ...payload,
      updatedAt: now,
      overrides: payload.overrides.map((item) => ({
        ...item,
        updatedAt: now,
      })),
    };

    await writeSiteImageOverridesFile(updated);
    return NextResponse.json({ success: true, updatedAt: now });
  } catch (error) {
    console.error("Failed to write site image overrides:", error);
    return NextResponse.json({ error: "Failed to save site image overrides." }, { status: 500 });
  }
}
