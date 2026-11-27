import { NextResponse } from "next/server";
import { find } from "@/lib/server/store";
import type { Order } from "@/lib/server/types";

export async function POST(req: Request) {
  const { id, phone } = await req.json().catch(() => ({}));
  const o = await find<Order>("orders", String(id || "").trim().toUpperCase());
  const last10 = String(phone || "").replace(/\D/g, "").slice(-10);
  if (!o || o.address.phone !== last10) return NextResponse.json({ error: "We couldn't find an order with that number and phone. Check both and try again." }, { status: 404 });
  return NextResponse.json({ id: o.id });
}
