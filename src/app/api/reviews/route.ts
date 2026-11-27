import { NextResponse } from "next/server";
import { z } from "zod";
import { insert, newId } from "@/lib/server/store";
import { getProduct } from "@/lib/catalog";

const schema = z.object({
  productSlug: z.string(),
  rating: z.number().int().min(1).max(5),
  name: z.string().trim().min(2).max(60),
  city: z.string().trim().max(60).optional().nullable(),
  text: z.string().trim().min(10, "Write at least a sentence.").max(1500),
});

export async function POST(req: Request) {
  const r = schema.safeParse(await req.json().catch(() => ({})));
  if (!r.success) return NextResponse.json({ error: r.error.issues[0]?.message ?? "Check your review." }, { status: 400 });
  if (!(await getProduct(r.data.productSlug))) return NextResponse.json({ error: "Product not found." }, { status: 404 });
  await insert("reviews", { id: newId("REV"), ...r.data, status: "pending", createdAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
