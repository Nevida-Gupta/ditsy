import { NextResponse } from "next/server";
import { z } from "zod";
import { insert, newId } from "@/lib/server/store";
import type { Enquiry } from "@/lib/server/types";

const phone = z.string().transform((s) => s.replace(/[^\d+]/g, "")).refine((s) => /^(\+?91)?[6-9]\d{9}$/.test(s), "Enter a 10-digit Indian mobile number");

const schema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("bulk"),
    occasion: z.string().min(1, "Choose an occasion"),
    quantity: z.number({ invalid_type_error: "Enter a number" }).int().min(10, "Bulk orders start at 10").max(10000),
    budgetPerGift: z.string().min(1, "Choose a budget"),
    city: z.string().trim().min(2, "Enter the delivery city"),
    deliveryDate: z.string().refine((d) => !isNaN(Date.parse(d)) && Date.parse(d) > Date.now(), "Choose a future date"),
    customisation: z.string().max(2000).optional(),
    name: z.string().trim().min(2, "Enter your name"),
    phone,
    email: z.union([z.literal(""), z.string().email("Enter a valid email")]).optional(),
    company: z.string().max(200).optional(),
    details: z.record(z.unknown()).optional(),
  }),
  z.object({
    type: z.literal("giftbox"),
    name: z.string().trim().min(2, "Enter your name"),
    phone,
    quantity: z.number().int().min(1).max(10000),
    occasion: z.string().optional(),
    city: z.string().optional(),
    deliveryDate: z.string().optional(),
    details: z.record(z.unknown()).optional(),
  }),
]);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    parsed.error.issues.forEach((i) => { const k = String(i.path[0] ?? "form"); fields[k] ??= i.message; });
    return NextResponse.json({ error: "Please check the highlighted fields.", fields }, { status: 400 });
  }
  const enquiry: Enquiry = { id: newId("ENQ"), createdAt: new Date().toISOString(), status: "new", ...parsed.data, email: "email" in parsed.data ? parsed.data.email || undefined : undefined };
  await insert("enquiries", enquiry);
  // Hook point: notify the team (email, WhatsApp Business API, Slack) here.
  return NextResponse.json({ id: enquiry.id });
}
