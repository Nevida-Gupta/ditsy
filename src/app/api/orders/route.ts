import { NextResponse } from "next/server";
import { z } from "zod";
import { computeTotals, repriceLines, type CartLine } from "@/lib/pricing";
import { insert, newId, update } from "@/lib/server/store";
import { createRazorpayOrder, razorpayEnabled } from "@/lib/server/razorpay";
import type { Order } from "@/lib/server/types";

const address = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().transform((s) => s.replace(/\D/g, "").slice(-10)).refine((s) => /^[6-9]\d{9}$/.test(s), "Enter a 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email"),
  line1: z.string().trim().min(4, "Enter your house and street"),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, "Enter your city"),
  state: z.string().trim().min(2, "Choose your state"),
  pincode: z.string().regex(/^[1-9]\d{5}$/, "Enter a 6-digit PIN code"),
});

const schema = z.object({
  lines: z.array(z.any()).min(1, "Your bag is empty"),
  coupon: z.string().nullable().optional(),
  payment: z.enum(["online", "cod"]),
  address,
  giftNote: z.string().max(300).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    parsed.error.issues.forEach((i) => { fields[String(i.path[i.path.length - 1])] ??= i.message; });
    return NextResponse.json({ error: "Please check the highlighted fields.", fields }, { status: 400 });
  }
  const { payment, address: addr, coupon, giftNote } = parsed.data;
  if (payment === "online" && !razorpayEnabled()) {
    return NextResponse.json({ error: "Online payment isn't switched on yet. Choose cash on delivery." }, { status: 400 });
  }

  let lines: CartLine[];
  try {
    lines = repriceLines(parsed.data.lines as CartLine[]);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 409 });
  }
  const t = computeTotals(lines, coupon, payment);
  if (coupon && t.couponError) return NextResponse.json({ error: t.couponError }, { status: 400 });

  const order: Order = {
    id: newId("DTY"),
    createdAt: new Date().toISOString(),
    status: payment === "cod" ? "confirmed_cod" : "pending_payment",
    payment,
    lines,
    totals: { subtotal: t.subtotal, discount: t.discount, shipping: t.shipping, codFee: t.codFee, total: t.total },
    coupon: t.coupon?.code ?? null,
    address: addr,
    giftNote,
  };
  await insert("orders", order);
  // Hook point: decrement inventory and send confirmation email/SMS once the database is connected.

  if (payment === "online") {
    try {
      const rp = await createRazorpayOrder(order.totals.total, order.id);
      await update<Order>("orders", order.id, { razorpayOrderId: rp.id });
      return NextResponse.json({ id: order.id, razorpay: { orderId: rp.id, amount: rp.amount, currency: rp.currency, key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID } });
    } catch {
      return NextResponse.json({ error: "We couldn't reach the payment gateway. Try again, or choose cash on delivery." }, { status: 502 });
    }
  }
  return NextResponse.json({ id: order.id });
}

export async function GET() {
  return NextResponse.json({ online: razorpayEnabled() });
}
