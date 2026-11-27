"use client";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductMedia } from "@/components/art/ProductMedia";
import { HeartIcon, StarIcon } from "@/components/ui/Icons";
import { useShop } from "@/store/shop";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { cx, discountPct, inr } from "@/lib/format";

export function ProductCard({ product, priority, tone = "light" }: { product: Product; priority?: boolean; tone?: "light" | "dark" }) {
  const wish = useShop((s) => s.wishlist.includes(product.slug));
  const toggle = useShop((s) => s.toggleWish);
  const add = useShop((s) => s.add);
  const hydrated = useHydrated();
  const off = discountPct(product.price, product.compareAt);
  const needsVariant = (product.variants?.length ?? 0) > 1;
  const soldOut = product.stock <= 0;

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-sand">
        <Link href={`/product/${product.slug}`} className="absolute inset-0" data-cursor="View" aria-label={product.name}>
          <ProductMedia product={product} priority={priority} className="h-full w-full transition-transform duration-[900ms] ease-silk group-hover:scale-[1.045]" />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex gap-1.5">
          {product.isNew && <span className="rounded-full bg-pearl/90 px-2.5 py-1 text-[11.5px] text-midnight">New</span>}
          {product.bestseller && <span className="rounded-full bg-midnight/90 px-2.5 py-1 text-[11.5px] text-pearl">Bestseller</span>}
          {off > 0 && <span className="rounded-full bg-gold px-2.5 py-1 text-[11.5px] text-white">{off}% off</span>}
        </div>
        <button
          onClick={() => toggle(product.slug)}
          aria-label={wish ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={hydrated && wish}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-pearl/85 text-midnight backdrop-blur transition hover:bg-pearl"
        >
          <HeartIcon filled={hydrated && wish} className="h-[18px] w-[18px]" />
        </button>
        {!soldOut && (
          needsVariant ? (
            <Link href={`/product/${product.slug}`} className="absolute inset-x-3 bottom-3 hidden translate-y-2 rounded-full bg-pearl/95 py-2.5 text-center text-[14px] text-midnight opacity-0 backdrop-blur transition duration-300 focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:block">Choose options</Link>
          ) : (
            <button
              onClick={() => add({ kind: "product", slug: product.slug, variantId: product.variants?.[0]?.id, variantLabel: product.variants?.[0]?.label, name: product.name, unitPrice: product.price, art: product.art, vertical: product.vertical })}
              className="absolute inset-x-3 bottom-3 hidden translate-y-2 rounded-full bg-pearl/95 py-2.5 text-[14px] text-midnight opacity-0 backdrop-blur transition duration-300 focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:block"
            >
              Add to bag
            </button>
          )
        )}
        {soldOut && <span className="absolute inset-x-3 bottom-3 rounded-full bg-pearl/90 py-2 text-center text-sm text-ink/60">Sold out</span>}
      </div>
      <div className={cx("mt-3.5 flex items-start justify-between gap-3", tone === "dark" ? "text-pearl" : "text-ink")}>
        <div>
          <Link href={`/product/${product.slug}`} className="font-display text-[19px] leading-snug hover:underline">{product.name}</Link>
          <p className={cx("mt-1 flex items-center gap-1 text-[12.5px]", tone === "dark" ? "text-pearl/60" : "text-ink/50")}>
            <StarIcon className="h-3 w-3 text-gold" /> {product.rating.toFixed(1)} <span>({product.reviewCount})</span>
          </p>
        </div>
        <p className="shrink-0 text-right text-[15px]">
          {inr(product.price)}
          {product.compareAt && <span className={cx("block text-[12.5px] line-through", tone === "dark" ? "text-pearl/45" : "text-ink/40")}>{inr(product.compareAt)}</span>}
        </p>
      </div>
    </article>
  );
}
