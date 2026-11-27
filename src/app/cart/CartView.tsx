"use client";
import Link from "next/link";
import { useState } from "react";
import { useShop } from "@/store/shop";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { computeTotals } from "@/lib/pricing";
import { inr } from "@/lib/format";
import { ProductArt } from "@/components/art/ProductArt";

export function CartView() {
  const { lines, setQty, remove, coupon, setCoupon } = useShop();
  const h = useHydrated();
  const [code, setCode] = useState(coupon ?? "");
  const t = computeTotals(lines, coupon);
  if (!h) return <section className="wrap min-h-[50vh] py-16" />;
  return (
    <section className="wrap py-14">
      <h1 className="display-l text-midnight">Your bag</h1>
      {lines.length === 0 ? (
        <div className="py-16">
          <p className="text-ink/60">Your bag is empty.</p>
          <div className="mt-6 flex gap-3"><Link href="/jewellery" className="btn-wine">Shop jewellery</Link><Link href="/gifting" className="btn-line text-midnight">Explore gifting</Link></div>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-midnight/10 border-y border-midnight/10">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-5 py-6">
                <div className="h-32 w-26 w-[104px] shrink-0 overflow-hidden rounded-2xl"><ProductArt art={l.art} title={l.name} sizes="120px" className="h-full w-full" /></div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      {l.kind === "product" ? <Link href={`/product/${l.slug}`} className="font-display text-xl text-midnight hover:underline">{l.name}</Link> : <p className="font-display text-xl text-midnight">{l.name}</p>}
                      <p className="text-[14px] text-ink/55">
                        {l.kind === "product" && (l.variantLabel ?? "")}
                        {l.kind === "bundle" && `Bundle of ${l.items.length} pieces`}
                        {l.kind === "giftbox" && `Custom box with ${l.config.itemIds.length} items${l.config.message ? `, message: “${l.config.message.slice(0, 40)}${l.config.message.length > 40 ? "…" : ""}”` : ""}`}
                      </p>
                    </div>
                    <p>{inr(l.unitPrice * l.qty)}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-4 pt-3">
                    <div className="flex items-center rounded-full border border-midnight/20">
                      <button className="px-3 py-1.5" onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span className="w-7 text-center">{l.qty}</span>
                      <button className="px-3 py-1.5" onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                    <button onClick={() => remove(l.key)} className="text-sm text-ink/55 underline">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-[28px] bg-sand/60 p-7">
            <h2 className="font-display text-2xl text-midnight">Summary</h2>
            <form className="mt-5 flex gap-2" onSubmit={(e) => { e.preventDefault(); setCoupon(code.trim() || null); }}>
              <label htmlFor="coupon" className="sr-only">Discount code</label>
              <input id="coupon" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Discount code" className="field" />
              <button className="btn-line shrink-0 text-midnight">Apply</button>
            </form>
            {coupon && t.couponError && <p className="mt-2 text-[13.5px] text-rose" role="alert">{t.couponError}</p>}
            {t.coupon && <p className="mt-2 text-[13.5px] text-[#2F6B4F]">{t.coupon.code} applied: {t.coupon.label}. <button className="underline" onClick={() => { setCoupon(null); setCode(""); }}>Remove</button></p>}
            <dl className="mt-6 space-y-2 text-[15px]">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(t.subtotal)}</dd></div>
              {t.discount > 0 && <div className="flex justify-between text-[#2F6B4F]"><dt>Discount</dt><dd>−{inr(t.discount)}</dd></div>}
              <div className="flex justify-between"><dt>Shipping</dt><dd>{t.shipping ? inr(t.shipping) : "Free"}</dd></div>
              <div className="flex justify-between border-t border-midnight/10 pt-3 text-lg"><dt>Total</dt><dd>{inr(t.total)}</dd></div>
            </dl>
            {t.hasJewellery && <p className="mt-4 text-[13.5px] text-midnight">A little surprise gift will be tucked in with your jewellery.</p>}
            <Link href="/checkout" className="btn-wine mt-6 w-full">Go to checkout</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
