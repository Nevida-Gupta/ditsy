import { NextResponse } from "next/server";
import { find, update } from "@/lib/server/store";
import { verifyRazorpaySignature } from "@/lib/server/razorpay";
import type { Order } from "@/lib/server/types";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const order = await find<Order>("orders", String(b.orderId || ""));
  if (!order || order.razorpayOrderId !== b.razorpay_order_id) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (!verifyRazorpaySignature(b.razorpay_order_id, b.razorpay_payment_id, b.razorpay_signature)) {
    return NextResponse.json({ error: "Payment could not be verified" }, { status: 400 });
  }
  await update<Order>("orders", order.id, { status: "paid", razorpayPaymentId: b.razorpay_payment_id });
  return NextResponse.json({ ok: true });
}
