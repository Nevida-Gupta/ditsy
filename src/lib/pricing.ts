import type { GiftBoxConfig, ProductArt, Vertical } from "./types";
import { site } from "./site";
import * as seed from "@/data/catalog";

export type CartLine =
  | { key: string; kind: "product"; slug: string; variantId?: string; variantLabel?: string; name: string; unitPrice: number; art: ProductArt; vertical: Vertical; qty: number }
  | { key: string; kind: "bundle"; slug: string; name: string; unitPrice: number; art: ProductArt; vertical: Vertical; qty: number; items: string[] }
  | { key: string; kind: "giftbox"; name: string; unitPrice: number; art: ProductArt; vertical: "gifting"; qty: number; config: GiftBoxConfig };

export interface Coupon {
  code: string;
  label: string;
  type: "percent" | "flat" | "shipping";
  value: number;
  min?: number;
  vertical?: Vertical;
}

// Move to the database when the admin coupon editor is connected.
export const coupons: Coupon[] = [
  { code: "DITSY10", label: "10% off your first order", type: "percent", value: 10 },
  { code: "WELCOME200", label: "₹200 off orders above ₹1,499", type: "flat", value: 200, min: 1499 },
  { code: "BRIDE15", label: "15% off jewellery above ₹4,999", type: "percent", value: 15, min: 4999, vertical: "jewellery" },
  { code: "FREESHIP", label: "Free shipping", type: "shipping", value: 0 },
];

export function giftBoxPrice(c: GiftBoxConfig) {
  const box = seed.boxOptions.find((b) => b.id === c.boxId);
  const ribbon = seed.ribbonOptions.find((r) => r.id === c.ribbonId);
  const card = seed.cardOptions.find((r) => r.id === c.cardId);
  const items = c.itemIds.map((id) => seed.products.find((p) => p.id === id && p.boxable));
  if (!box || !ribbon || !card || items.some((i) => !i)) return null;
  if (items.length === 0 || items.length > box.capacity) return null;
  return box.price + ribbon.price + card.price + items.reduce((s, i) => s + (i?.price ?? 0), 0);
}

export function computeTotals(lines: CartLine[], couponCode?: string | null, payment: "online" | "cod" = "online") {
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const jewellerySubtotal = lines.filter((l) => l.vertical === "jewellery").reduce((s, l) => s + l.unitPrice * l.qty, 0);
  let discount = 0;
  let freeShip = subtotal >= site.freeShippingAbove;
  let coupon: Coupon | null = null;
  let couponError: string | null = null;

  if (couponCode) {
    const c = coupons.find((x) => x.code === couponCode.trim().toUpperCase());
    if (!c) couponError = "That code isn't valid. Check the spelling and try again.";
    else {
      const base = c.vertical === "jewellery" ? jewellerySubtotal : subtotal;
      if (c.min && base < c.min) couponError = `Add ${"₹" + (c.min - base).toLocaleString("en-IN")} more${c.vertical ? " of jewellery" : ""} to use ${c.code}.`;
      else {
        coupon = c;
        if (c.type === "percent") discount = Math.round((base * c.value) / 100);
        if (c.type === "flat") discount = c.value;
        if (c.type === "shipping") freeShip = true;
      }
    }
  }
  discount = Math.min(discount, subtotal);
  const shipping = lines.length === 0 || freeShip ? 0 : site.shippingFee;
  const codFee = payment === "cod" && lines.length ? site.codFee : 0;
  const total = subtotal - discount + shipping + codFee;
  const hasJewellery = jewellerySubtotal > 0;
  return { subtotal, discount, shipping, codFee, total, coupon, couponError, hasJewellery };
}

/** Server-side: rebuild every line's price from the catalogue so the client can't set prices. */
export function repriceLines(lines: CartLine[]): CartLine[] {
  return lines.map((l) => {
    if (!Number.isInteger(l.qty) || l.qty < 1 || l.qty > 500) throw new Error("Invalid quantity");
    if (l.kind === "product") {
      const p = seed.products.find((x) => x.slug === l.slug);
      if (!p) throw new Error(`Product not found: ${l.slug}`);
      const v = l.variantId ? p.variants?.find((x) => x.id === l.variantId) : undefined;
      if (l.variantId && !v) throw new Error(`Variant not found for ${p.name}`);
      const stock = v ? v.stock : p.stock;
      if (stock < l.qty) throw new Error(`Only ${stock} left of ${p.name}`);
      return { ...l, name: p.name, unitPrice: p.price + (v?.priceDelta ?? 0), vertical: p.vertical };
    }
    if (l.kind === "bundle") {
      const b = seed.bundles.find((x) => x.slug === l.slug);
      if (!b) throw new Error(`Bundle not found: ${l.slug}`);
      return { ...l, name: b.name, unitPrice: b.price, vertical: b.vertical };
    }
    const price = giftBoxPrice(l.config);
    if (price == null) throw new Error("That gift box configuration is no longer available");
    return { ...l, unitPrice: price };
  });
}
