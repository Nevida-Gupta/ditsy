import { NextResponse } from "next/server";
import { z } from "zod";
import { insert, list, newId } from "@/lib/server/store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const r = z.object({ email: z.string().trim().toLowerCase().email() }).safeParse(body);
  if (!r.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  const existing = await list<{ email: string }>("subscribers");
  if (!existing.some((s) => s.email === r.data.email)) await insert("subscribers", { id: newId("SUB"), email: r.data.email, createdAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
