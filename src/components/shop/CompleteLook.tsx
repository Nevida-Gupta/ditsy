"use client";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductArt } from "@/components/art/ProductArt";
import { useShop } from "@/store/shop";
import { inr, cx } from "@/lib/format";

/** "Style it with": tick the matching pieces and add them together. */
export function CompleteLook({ product, pairs }: { product: Product; pairs: Product[] }) {
  const items = [product, ...pairs];
  const [on, setOn] = useState<string[]>(items.filter((p) => !(p.variants && p.variants.length > 1) || p === product).map((p) => p.slug));
  const add = useShop((s) => s.add);
  const chosen = items.filter((p) => on.includes(p.slug));
  const total = chosen.reduce((s, p) => s + p.price, 0);
  const addAll = () => chosen.forEach((p) => add({ kind: "product", slug: p.slug, variantId: p.variants?.[0]?.id, variantLabel: p.variants?.[0]?.label, name: p.name, unitPrice: p.price, art: p.art, vertical: p.vertical }));
  return (
    <div className="rounded-[28px] border border-midnight/10 bg-white/50 p-6 md:p-8">
      <h2 className="font-display text-3xl text-midnight">Style it with</h2>
      <p className="mt-1 text-ink/60">Pieces we&rsquo;d wear with this. Pick what you like.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((p) => (
          <li key={p.slug}>
            <label className={cx("block cursor-pointer rounded-[20px] p-2 transition", on.includes(p.slug) ? "bg-blush/50" : "opacity-60 hover:opacity-100")}>
              <div className="relative overflow-hidden rounded-2xl">
                <ProductArt art={p.art} className="aspect-[4/5] w-full" title={p.name} />
                <input type="checkbox" className="absolute left-3 top-3 h-5 w-5 accent-[#0E1F2E]" checked={on.includes(p.slug)} onChange={() => setOn((o) => (o.includes(p.slug) ? o.filter((x) => x !== p.slug) : [...o, p.slug]))} aria-label={`Include ${p.name}`} />
              </div>
              <span className="mt-2 block font-display text-lg leading-snug">{p === product ? `This piece: ${p.name}` : p.name}</span>
              <span className="text-[14px] text-ink/60">{inr(p.price)}{p.variants && p.variants.length > 1 ? `, ${p.variants[0].label}` : ""}</span>
            </label>
            {p !== product && <Link href={`/product/${p.slug}`} className="ml-2 text-[13px] text-ink/50 underline">View</Link>}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-lg">{chosen.length} {chosen.length === 1 ? "piece" : "pieces"}, {inr(total)}</p>
        <button className="btn-wine" disabled={!chosen.length} onClick={addAll}>Add selected to bag</button>
      </div>
    </div>
  );
}
