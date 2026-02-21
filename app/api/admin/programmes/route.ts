import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminSession";
import {
  normalizeProgrammeCardOverridesPayload,
  readProgrammeCardOverridesFile,
  writeProgrammeCardOverridesFile,
  type ProgrammeCardOverrideFile,
} from "@/lib/programmeCardOverrides";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const payload = await readProgrammeCardOverridesFile();
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to read programme overrides:", error);
    return NextResponse.json({ error: "Failed to read programme card overrides." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as unknown;
    const payload = normalizeProgrammeCardOverridesPayload(body);
    if (!payload) {
      return NextResponse.json({ error: "Invalid programme overrides payload." }, { status: 400 });
    }

    const now = new Date().toISOString();
    const updated: ProgrammeCardOverrideFile = {
      ...payload,
      updatedAt: now,
      overrides: payload.overrides.map((item) => ({
        ...item,
        updatedAt: now,
      })),
    };

    await writeProgrammeCardOverridesFile(updated);
    return NextResponse.json({ success: true, updatedAt: now });
  } catch (error) {
    console.error("Failed to write programme overrides:", error);
    return NextResponse.json({ error: "Failed to save programme card overrides." }, { status: 500 });
  }
}
