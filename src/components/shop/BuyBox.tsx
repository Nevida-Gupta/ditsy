"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useShop } from "@/store/shop";
import { HeartIcon, StarIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { cx, discountPct, inr } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

export function BuyBox({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants?.find((v) => v.stock > 0)?.id);
  const [qty, setQty] = useState(1);
  const add = useShop((s) => s.add);
  const wish = useShop((s) => s.wishlist.includes(product.slug));
  const toggle = useShop((s) => s.toggleWish);
  const hydrated = useHydrated();
  const v = product.variants?.find((x) => x.id === variant);
  const price = product.price + (v?.priceDelta ?? 0);
  const stock = v ? v.stock : product.stock;
  const off = discountPct(product.price, product.compareAt);
  const isSize = product.category === "bangles";

  const addToBag = () => add({ kind: "product", slug: product.slug, variantId: v?.id, variantLabel: v ? `${isSize ? "Size " : ""}${v.label}` : undefined, name: product.name, unitPrice: price, art: product.art, vertical: product.vertical, qty });

  return (
    <div>
      <h1 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05] text-midnight">{product.name}</h1>
      <a href="#reviews" className="mt-3 inline-flex items-center gap-1.5 text-[14px] text-ink/60">
        <span className="flex text-gold">{Array.from({ length: 5 }, (_, i) => <StarIcon key={i} className={cx("h-4 w-4", i >= Math.round(product.rating) && "opacity-30")} />)}</span>
        {product.rating.toFixed(1)} from {product.reviewCount} reviews
      </a>
      <p className="mt-5 flex items-baseline gap-3">
        <span className="text-2xl">{inr(price)}</span>
        {product.compareAt && <span className="text-ink/40 line-through">{inr(product.compareAt)}</span>}
        {off > 0 && <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-sm text-[#7A5A22]">{off}% off</span>}
      </p>
      <p className="mt-1 text-[13px] text-ink/50">Inclusive of all taxes</p>
      <p className="mt-6 text-[17px] leading-relaxed text-ink/80">{product.short}</p>

      {product.variants && product.variants.length > 0 && (
        <fieldset className="mt-7">
          <legend className="mb-3 text-[14px] text-ink/70">{isSize ? "Bangle size" : "Colour"}: <span className="text-ink">{v?.label}</span></legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((x) => (
              <button key={x.id} disabled={x.stock <= 0} onClick={() => setVariant(x.id)} aria-pressed={variant === x.id}
                className={cx("rounded-full border px-4 py-2 text-[14px] transition disabled:line-through disabled:opacity-40", variant === x.id ? "border-midnight bg-midnight text-pearl" : "border-midnight/20 hover:border-midnight/50")}>
                {x.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-7 flex gap-3">
        <div className="flex items-center rounded-full border border-midnight/20">
          <button className="px-4 py-3" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
          <span className="w-6 text-center" aria-live="polite">{qty}</span>
          <button className="px-4 py-3" onClick={() => setQty(Math.min(stock, qty + 1))} aria-label="Increase quantity">+</button>
        </div>
        <button className="btn-wine flex-1" disabled={stock <= 0} onClick={addToBag}>{stock <= 0 ? "Sold out" : "Add to bag"}</button>
        <button onClick={() => toggle(product.slug)} aria-pressed={hydrated && wish} aria-label={wish ? "Remove from wishlist" : "Save to wishlist"} className="grid h-[50px] w-[50px] place-items-center rounded-full border border-midnight/20 text-midnight">
          <HeartIcon filled={hydrated && wish} />
        </button>
      </div>
      {stock > 0 && stock <= 5 && <p className="mt-3 text-[13.5px] text-rose">Only {stock} left in this {isSize ? "size" : "colour"}.</p>}

      <ul className="mt-7 space-y-2 rounded-2xl bg-sand/60 p-5 text-[14px] text-ink/75">
        <li>Free shipping above ₹999. Dispatched in 1–2 days.</li>
        <li>7-day easy exchange on unworn pieces.</li>
        {product.vertical === "jewellery" && <li>A little surprise gift comes with every jewellery order.</li>}
        <li>Cash on delivery available.</li>
      </ul>
      <a href={whatsappLink(`Hi Ditsy, I have a question about ${product.name}.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[14px] text-midnight underline underline-offset-4">
        <WhatsAppIcon className="h-4 w-4" /> Ask us about this piece
      </a>

      {/* sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-midnight/10 bg-pearl/95 p-3 backdrop-blur md:hidden">
        <p className="flex-1 pl-2"><span className="block text-[13px] text-ink/55">{product.name}</span>{inr(price)}</p>
        <button className="btn-wine" disabled={stock <= 0} onClick={addToBag}>Add to bag</button>
      </div>
    </div>
  );
}
