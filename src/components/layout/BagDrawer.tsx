"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "@/store/shop";
import { computeTotals } from "@/lib/pricing";
import { inr } from "@/lib/format";
import { site } from "@/lib/site";
import { ProductArt } from "@/components/art/ProductArt";
import { CloseIcon } from "@/components/ui/Icons";
import { useHydrated } from "@/lib/hooks/useHydrated";

export function BagDrawer() {
  const { lines, bagOpen, openBag, setQty, remove, coupon } = useShop();
  const hydrated = useHydrated();
  const t = computeTotals(lines, coupon);
  const toFree = site.freeShippingAbove - t.subtotal;
  return (
    <AnimatePresence>
      {hydrated && bagOpen && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/40" onClick={() => openBag(false)} />
          <motion.aside role="dialog" aria-label="Shopping bag" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.4, ease: [0.22, 0.8, 0.2, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-pearl">
            <div className="flex items-center justify-between border-b border-midnight/10 px-6 py-5">
              <h2 className="font-display text-2xl text-midnight">Your bag</h2>
              <button onClick={() => openBag(false)} aria-label="Close bag"><CloseIcon /></button>
            </div>
            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="font-display text-3xl text-midnight">Nothing here yet</p>
                <p className="text-ink/60">Start with a pair of jhumkas, or build a gift box for someone.</p>
                <div className="mt-2 flex gap-3">
                  <Link href="/jewellery" className="btn-wine" onClick={() => openBag(false)}>Shop jewellery</Link>
                  <Link href="/build-your-box" className="btn-line text-midnight" onClick={() => openBag(false)}>Build a box</Link>
                </div>
              </div>
            ) : (
              <>
                <div className="px-6 pt-4 text-[13.5px] text-ink/70">
                  {toFree > 0 ? <>Add {inr(toFree)} more for free shipping.</> : <>Shipping is on us.</>}
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-sand"><div className="h-full bg-gold transition-all" style={{ width: `${Math.min(100, (t.subtotal / site.freeShippingAbove) * 100)}%` }} /></div>
                </div>
                <ul className="flex-1 divide-y divide-midnight/10 overflow-y-auto px-6">
                  {lines.map((l) => (
                    <li key={l.key} className="flex gap-4 py-5">
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl"><ProductArt art={l.art} title={l.name} sizes="120px" className="h-full w-full" /></div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <p className="font-display text-lg leading-snug text-midnight">{l.name}</p>
                          <p className="text-[15px]">{inr(l.unitPrice * l.qty)}</p>
                        </div>
                        <p className="text-[13px] text-ink/55">
                          {l.kind === "product" && l.variantLabel}
                          {l.kind === "bundle" && `Bundle of ${l.items.length}`}
                          {l.kind === "giftbox" && `${l.config.itemIds.length} items, ${l.config.occasion}`}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-midnight/20">
                            <button className="px-3 py-1" onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease quantity">−</button>
                            <span className="w-6 text-center text-sm" aria-live="polite">{l.qty}</span>
                            <button className="px-3 py-1" onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase quantity">+</button>
                          </div>
                          <button className="text-[13px] text-ink/55 underline" onClick={() => remove(l.key)}>Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-midnight/10 p-6">
                  {t.hasJewellery && <p className="mb-3 rounded-xl bg-blush/60 px-4 py-2.5 text-[13.5px] text-midnight">A little surprise gift will be tucked into your order.</p>}
                  <div className="flex justify-between text-[15px]"><span>Subtotal</span><span>{inr(t.subtotal)}</span></div>
                  <p className="mt-1 text-[13px] text-ink/50">Shipping and codes are applied at checkout.</p>
                  <Link href="/checkout" onClick={() => openBag(false)} className="btn-wine mt-4 w-full">Go to checkout</Link>
                  <Link href="/cart" onClick={() => openBag(false)} className="mt-3 block text-center text-sm text-ink/60 underline">View full bag</Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
