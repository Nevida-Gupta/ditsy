import type { Metadata } from "next";
import { getBundles, getProductsBySlugs } from "@/lib/catalog";
import { BundleCard } from "@/components/shop/BundleCard";

export const metadata: Metadata = { title: "Bundles and matched sets", description: "Coordinated jewellery combinations and gift sets at a special combined price.", alternates: { canonical: "/bundles" } };

export default async function Bundles() {
  const list = await getBundles();
  const items = await Promise.all(list.map((b) => getProductsBySlugs(b.productSlugs)));
  return (
    <section className="wrap py-16 md:py-24">
      <h1 className="display-l text-midnight">Better together</h1>
      <p className="lede mt-4">Looks we&rsquo;ve already matched, from a jhumka and tikka pair to a complete wedding set, priced lower than buying each piece alone.</p>
      <h2 className="display-m mt-14 text-midnight">Jewellery</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{list.map((b, i) => b.vertical === "jewellery" && <BundleCard key={b.slug} bundle={b} items={items[i]} />)}</div>
      <h2 className="display-m mt-14 text-midnight">Gift sets</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{list.map((b, i) => b.vertical === "gifting" && <BundleCard key={b.slug} bundle={b} items={items[i]} />)}</div>
    </section>
  );
}
