import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/adminSession";

export const runtime = "nodejs";

const historyDirPath = path.join(process.cwd(), "content", "admin", "history");

export async function GET() {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    await fs.mkdir(historyDirPath, { recursive: true });
    const files = (await fs.readdir(historyDirPath))
      .filter((file) => file.startsWith("roadmap-") && file.endsWith(".json"))
      .sort()
      .reverse()
      .slice(0, 20);

    return NextResponse.json({ snapshots: files });
  } catch (error) {
    console.error("Failed to read roadmap history:", error);
    return NextResponse.json({ error: "Failed to read roadmap history." }, { status: 500 });
  }
}
