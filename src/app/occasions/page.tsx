import type { Metadata } from "next";
import Link from "next/link";
import { getOccasions } from "@/lib/catalog";
import { ProductArt } from "@/components/art/ProductArt";

export const metadata: Metadata = { title: "Shop by occasion", description: "Jewellery and gifts for weddings, mehendi, Diwali, birthdays, anniversaries, Karwa Chauth, baby showers, Rakhi and corporate events.", alternates: { canonical: "/occasions" } };

export default async function Occasions() {
  const list = await getOccasions();
  return (
    <section className="wrap py-16 md:py-24">
      <h1 className="display-l text-midnight">What are we celebrating?</h1>
      <p className="lede mt-4">Each occasion brings together the jewellery to wear and the gifts to give, so you can sort both in one place.</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((o) => (
          <Link key={o.slug} href={`/occasions/${o.slug}`} data-cursor="Open" className="group flex overflow-hidden rounded-[26px] text-pearl" style={{ background: o.tone }}>
            <div className="flex flex-1 flex-col justify-end p-6">
              <h2 className="font-display text-3xl">{o.name}</h2>
              <p className="mt-1 text-[14.5px] opacity-80">{o.story}</p>
            </div>
            <div className="w-[42%] shrink-0"><ProductArt art={{ ...o.art, ground: o.tone }} className="h-full w-full transition-transform duration-700 group-hover:scale-105" /></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
