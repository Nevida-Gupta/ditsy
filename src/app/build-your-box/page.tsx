import type { Metadata } from "next";
import { getBoxableProducts, builderOptions } from "@/lib/catalog";
import { GiftBuilder } from "@/components/builder/GiftBuilder";
import { one, type SP } from "@/lib/params";

export const metadata: Metadata = {
  title: "Build your own gift box",
  description: "Choose a box, fill it with candles, keepsakes, treats and jewellery, pick a ribbon and card, and add your own message. Ditsy packs it by hand and ships across India.",
  alternates: { canonical: "/build-your-box" },
};

export default async function BuildYourBox({ searchParams }: { searchParams: SP }) {
  const items = await getBoxableProducts();
  const prefill = (one(searchParams.items) ?? "").split(",").filter((id) => items.some((i) => i.id === id));
  return (
    <>
      <section className="wrap pb-6 pt-12 md:pt-16">
        <h1 className="display-l text-midnight">Build your own gift box</h1>
        <p className="lede mt-3">Pick a box, fill it with things they&rsquo;ll love, and we&rsquo;ll pack it by hand with your note inside. You&rsquo;ll see it come together as you go.</p>
      </section>
      <GiftBuilder items={items} options={builderOptions} prefill={prefill} />
    </>
  );
}
