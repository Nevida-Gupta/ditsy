import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { find } from "@/lib/server/store";
import type { Order } from "@/lib/server/types";
import { inr } from "@/lib/format";
import { ProductArt } from "@/components/art/ProductArt";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };
export const dynamic = "force-dynamic";

const statusText: Record<Order["status"], string> = {
  pending_payment: "Waiting for payment", paid: "Paid, being packed", confirmed_cod: "Confirmed, pay on delivery",
  packed: "Packed", shipped: "On its way", delivered: "Delivered", cancelled: "Cancelled",
};

export default async function OrderPage({ params }: { params: { id: string } }) {
  const o = await find<Order>("orders", params.id);
  if (!o) notFound();
  const hasJewellery = o.lines.some((l) => l.vertical === "jewellery");
  return (
    <section className="wrap max-w-3xl py-16">
      <p className="font-display text-xl italic text-rose">Thank you, {o.address.name.split(" ")[0]}</p>
      <h1 className="display-l mt-2 text-midnight">Your order is in</h1>
      <p className="lede mt-4">Order <strong className="text-midnight">{o.id}</strong>. {statusText[o.status]}. We&rsquo;ll send tracking to {o.address.phone} and {o.address.email} as soon as it ships, usually within two working days.</p>
      {hasJewellery && <p className="mt-4 rounded-2xl bg-blush/60 px-5 py-3 text-midnight">There&rsquo;s a little surprise tucked in with your jewellery. No peeking at the invoice.</p>}
      <ul className="mt-10 divide-y divide-midnight/10 border-y border-midnight/10">
        {o.lines.map((l) => (
          <li key={l.key} className="flex items-center gap-4 py-4">
            <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl"><ProductArt art={l.art} title={l.name} sizes="120px" className="h-full w-full" /></div>
            <p className="flex-1">{l.name} <span className="text-ink/50">× {l.qty}</span></p>
            <p>{inr(l.unitPrice * l.qty)}</p>
          </li>
        ))}
      </ul>
      <dl className="mt-6 ml-auto max-w-xs space-y-1.5 text-[15px]">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(o.totals.subtotal)}</dd></div>
        {o.totals.discount > 0 && <div className="flex justify-between"><dt>Discount</dt><dd>−{inr(o.totals.discount)}</dd></div>}
        <div className="flex justify-between"><dt>Shipping</dt><dd>{o.totals.shipping ? inr(o.totals.shipping) : "Free"}</dd></div>
        {o.totals.codFee > 0 && <div className="flex justify-between"><dt>Cash on delivery</dt><dd>{inr(o.totals.codFee)}</dd></div>}
        <div className="flex justify-between border-t border-midnight/10 pt-2 text-lg"><dt>Total</dt><dd>{inr(o.totals.total)}</dd></div>
      </dl>
      <div className="mt-8 rounded-2xl bg-sand/60 p-5 text-[15px]">
        <p className="font-display text-xl text-midnight">Delivering to</p>
        <p className="mt-1 text-ink/75">{o.address.name}, {o.address.line1}{o.address.line2 ? `, ${o.address.line2}` : ""}, {o.address.city}, {o.address.state} {o.address.pincode}</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/jewellery" className="btn-wine">Keep browsing</Link>
        <a href={whatsappLink(`Hi Ditsy, a question about my order ${o.id}.`)} target="_blank" rel="noreferrer" className="btn-line text-midnight">Questions? WhatsApp us</a>
      </div>
    </section>
  );
}
