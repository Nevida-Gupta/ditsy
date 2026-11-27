"use client";
import Link from "next/link";
import type { Bundle, Product } from "@/lib/types";
import { ProductArt } from "@/components/art/ProductArt";
import { useShop } from "@/store/shop";
import { inr } from "@/lib/format";

export function BundleCard({ bundle, items }: { bundle: Bundle; items: Product[] }) {
  const add = useShop((s) => s.add);
  const separate = items.reduce((s, p) => s + p.price, 0);
  const save = separate - bundle.price;
  return (
    <article className="flex flex-col rounded-[26px] border border-midnight/10 bg-white/50 p-5">
      <div className="flex -space-x-8">
        {items.map((p, i) => (
          <Link key={`${p.slug}${i}`} href={`/product/${p.slug}`} className="relative w-1/3 max-w-[120px] overflow-hidden rounded-[18px] ring-4 ring-pearl" style={{ zIndex: items.length - i }}>
            <ProductArt art={p.art} className="aspect-[4/5] w-full" title={p.name} />
          </Link>
        ))}
      </div>
      <h3 className="mt-5 font-display text-2xl text-midnight">{bundle.name}</h3>
      <p className="mt-1 text-[14.5px] text-ink/65">{bundle.line}</p>
      <div className="mt-auto flex items-end justify-between pt-5">
        <p>
          <span className="text-lg">{inr(bundle.price)}</span>{" "}
          <span className="text-sm text-ink/40 line-through">{inr(separate)}</span>
          {save > 0 && <span className="block text-[13px] text-rose">You save {inr(save)}</span>}
        </p>
        <button className="btn-wine px-5 py-2.5 text-sm" onClick={() => add({ kind: "bundle", slug: bundle.slug, name: bundle.name, unitPrice: bundle.price, art: items[0].art, vertical: bundle.vertical, items: bundle.productSlugs })}>
          Add bundle
        </button>
      </div>
    </article>
  );
}
