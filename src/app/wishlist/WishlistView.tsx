"use client";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useShop } from "@/store/shop";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { ProductGrid } from "@/components/shop/ProductGrid";

export function WishlistView({ products }: { products: Product[] }) {
  const slugs = useShop((s) => s.wishlist);
  const h = useHydrated();
  const list = products.filter((p) => slugs.includes(p.slug));
  return (
    <section className="wrap py-16">
      <h1 className="display-l text-midnight">Wishlist</h1>
      <p className="mt-2 text-ink/60">Saved on this device. Accounts that sync your wishlist arrive with sign-in.</p>
      <div className="mt-10">
        {!h ? null : list.length ? <ProductGrid products={list} /> : (
          <div className="py-16">
            <p className="font-display text-3xl text-midnight">Nothing saved yet</p>
            <p className="mt-2 text-ink/60">Tap the heart on anything you love and it will wait for you here.</p>
            <Link href="/jewellery" className="btn-wine mt-6">Start browsing</Link>
          </div>
        )}
      </div>
    </section>
  );
}
