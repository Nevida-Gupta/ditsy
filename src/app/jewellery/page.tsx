import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategories, getCollections, getOccasions, getProducts, getBundles, getProductsBySlugs } from "@/lib/catalog";
import { FilterBar } from "@/components/shop/FilterBar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CollectionBanner } from "@/components/shop/CollectionBanner";
import { BundleCard } from "@/components/shop/BundleCard";
import { VerticalHero } from "@/components/shop/VerticalHero";
import { imagery } from "@/data/imagery";
import { one, priceRange, type SP } from "@/lib/params";

export const metadata: Metadata = {
  title: "Jewellery: jhumkas, bridal sets and statement earrings",
  description: "Distinctive artificial jewellery from Ditsy: statement jhumkas, chandbalis, kundan-inspired and temple sets, maang tikkas, bangles and haldi-mehendi jewellery. Free shipping above ₹999.",
  alternates: { canonical: "/jewellery" },
};

export default async function JewelleryPage({ searchParams }: { searchParams: SP }) {
  const [cats, cols, occasions, bundles] = await Promise.all([getCategories("jewellery"), getCollections("jewellery"), getOccasions(), getBundles("jewellery")]);
  const products = await getProducts({
    vertical: "jewellery", group: one(searchParams.group), category: one(searchParams.category), finish: one(searchParams.finish),
    occasion: one(searchParams.occasion), sort: one(searchParams.sort), ...priceRange(one(searchParams.price)),
  });
  const filtered = Object.keys(searchParams).length > 0;
  const bundleItems = await Promise.all(bundles.slice(0, 3).map((b) => getProductsBySlugs(b.productSlugs)));
  const groups = Array.from(new Set(cats.map((c) => c.group)));

  return (
    <>
      <VerticalHero
        name="Jewellery"
        world="peacock"
        img={imagery.earringAdjust}
        title="Artificial jewellery, chosen like it isn’t"
        body="Every piece passed one test: would we wear it to a wedding we cared about? Brass-based, nickel-free, finished by hand, and light enough to last the whole night."
        ctas={[{ label: "Shop earrings", href: "/jewellery?group=Earrings" }, { label: "Bridal & sets", href: "/jewellery?group=Jewellery%20sets" }]}
      />

      {!filtered && (
        <section className="wrap py-14">
          <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            {cols.map((c) => <div key={c.slug} className="w-[78%] shrink-0 sm:w-[44%] lg:w-[31%]"><CollectionBanner c={c} /></div>)}
          </div>
        </section>
      )}

      <section className="wrap pb-24">
        <Suspense>
          <FilterBar
            groups={groups}
            categories={cats.map((c) => ({ value: c.slug, label: c.name, group: c.group }))}
            finishes={[{ value: "gold", label: "Gold" }, { value: "antique", label: "Antique gold" }, { value: "rosegold", label: "Rose gold" }, { value: "silver", label: "Silver" }, { value: "oxidised", label: "Oxidised" }]}
            occasions={occasions.map((o) => ({ value: o.slug, label: o.name }))}
            count={products.length}
          />
        </Suspense>
        <div className="pt-10">
          {products.length ? <ProductGrid products={products} /> : (
            <div className="py-20 text-center">
              <p className="font-display text-3xl text-midnight">Nothing matches all of those</p>
              <p className="mt-2 text-ink/60">Try removing a filter or two. Our edits are small on purpose, so narrow searches can come up empty.</p>
            </div>
          )}
        </div>
      </section>

      {!filtered && (
        <section className="wrap pb-28">
          <h2 className="display-m text-midnight">Complete the look</h2>
          <p className="mt-2 text-ink/65">Matched combinations at a combined price.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {bundles.slice(0, 3).map((b, i) => <BundleCard key={b.slug} bundle={b} items={bundleItems[i]} />)}
          </div>
        </section>
      )}
    </>
  );
}
