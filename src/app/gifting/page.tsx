import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories, getCollections, getOccasions, getProducts, returnGiftMeta } from "@/lib/catalog";
import { FilterBar } from "@/components/shop/FilterBar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CollectionBanner } from "@/components/shop/CollectionBanner";
import { VerticalHero } from "@/components/shop/VerticalHero";
import { imagery } from "@/data/imagery";
import { one, priceRange, type SP } from "@/lib/params";

export const metadata: Metadata = {
  title: "Gifting: hampers, return gifts and custom gift boxes",
  description: "Premium curated gifts from Ditsy. Luxury hampers, bridesmaid boxes, return gifts by budget, build-your-own gift boxes and bulk corporate gifting delivered across India.",
  alternates: { canonical: "/gifting" },
};

export default async function GiftingPage({ searchParams }: { searchParams: SP }) {
  const [cats, cols, occasions] = await Promise.all([getCategories("gifting"), getCollections("gifting"), getOccasions()]);
  const products = await getProducts({ vertical: "gifting", category: one(searchParams.category), occasion: one(searchParams.occasion), sort: one(searchParams.sort), ...priceRange(one(searchParams.price)) });
  const filtered = Object.keys(searchParams).length > 0;

  return (
    <>
      <VerticalHero
        name="Gifting"
        world="blush"
        img={imagery.tyingRibbon}
        title="Every gift should feel thoughtfully chosen"
        body="Put together by hand, wrapped so opening it is part of the gift, and sent anywhere in India, one at a time or a thousand at once."
        ctas={[{ label: "Build your own box", href: "/build-your-box" }, { label: "Return gifts", href: "/gifting/return-gifts" }, { label: "Bulk & corporate", href: "/bulk-gifting" }]}
      />

      {!filtered && (
        <>
          <section className="wrap py-16">
            <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
              <div className="flex flex-col justify-between rounded-[28px] bg-midnight p-8 text-pearl">
                <div>
                  <h2 className="display-m">Return gifts</h2>
                  <p className="mt-3 text-pearl/75">For birthdays, weddings, baby showers and every party where guests deserve more than a box of sweets. Combos from ₹159 a guest, with name tags tied by hand.</p>
                </div>
                <ul className="mt-6 space-y-2">
                  {returnGiftMeta.tiers.map((t) => (<li key={t.id}><Link className="link text-champagne" href={`/gifting/return-gifts?tier=${t.id}`}>{t.label}</Link></li>))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {returnGiftMeta.occasions.map((o) => (
                  <Link key={o.slug} href={`/gifting/return-gifts?occasion=${o.slug}`} className="rounded-2xl border border-midnight/10 bg-white/50 p-4 text-[15px] text-midnight transition hover:bg-blush/60">{o.name}</Link>
                ))}
              </div>
            </div>
          </section>
          <section className="wrap pb-16">
            <h2 className="display-m mb-8 text-midnight">Gifts for every reason</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cols.map((c) => <CollectionBanner key={c.slug} c={c} />)}
            </div>
          </section>
        </>
      )}

      <section className="wrap pb-24">
        <Suspense>
          <FilterBar categories={cats.map((c) => ({ value: c.slug, label: c.name, group: c.group }))} occasions={occasions.map((o) => ({ value: o.slug, label: o.name }))} count={products.length} />
        </Suspense>
        <div className="pt-10">
          {products.length ? <ProductGrid products={products} /> : <p className="py-20 text-center text-ink/60">Nothing matches those filters. Try clearing one.</p>}
        </div>
      </section>
    </>
  );
}
