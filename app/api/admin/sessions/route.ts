import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminSession";
import {
  normalizeSessionsPayload,
  readAdminSessionsFile,
  writeAdminSessionsFile,
  type AdminSessionsFile,
} from "@/lib/sessionBlocks";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const sessions = await readAdminSessionsFile();
    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Failed to read sessions file:", error);
    return NextResponse.json({ error: "Failed to read sessions data." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as unknown;
    const payload = normalizeSessionsPayload(body);
    if (!payload) {
      return NextResponse.json({ error: "Invalid sessions payload." }, { status: 400 });
    }

    const updatedPayload: AdminSessionsFile = {
      ...payload,
      updatedAt: new Date().toISOString(),
      blocks: payload.blocks.map((block) => ({
        ...block,
        updated_at: new Date().toISOString(),
      })),
    };

    await writeAdminSessionsFile(updatedPayload);
    return NextResponse.json({ success: true, updatedAt: updatedPayload.updatedAt });
  } catch (error) {
    console.error("Failed to update sessions file:", error);
    return NextResponse.json({ error: "Failed to update sessions data." }, { status: 500 });
  }
}
