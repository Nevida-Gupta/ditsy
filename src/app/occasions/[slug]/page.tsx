import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOccasion, getOccasions, getProducts, getReturnGifts } from "@/lib/catalog";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductArt } from "@/components/art/ProductArt";
import { inr } from "@/lib/format";

export async function generateStaticParams() {
  return (await getOccasions()).map((o) => ({ slug: o.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const o = await getOccasion(params.slug);
  return o ? { title: `${o.name}: jewellery and gifts`, description: o.story, alternates: { canonical: `/occasions/${o.slug}` } } : {};
}

export default async function OccasionPage({ params }: { params: { slug: string } }) {
  const o = await getOccasion(params.slug);
  if (!o) notFound();
  const rgKey = o.slug === "diwali" || o.slug === "rakhi" || o.slug === "karwa-chauth" ? "festive" : o.slug;
  const [jewellery, gifts, rg] = await Promise.all([
    getProducts({ vertical: "jewellery", occasion: o.slug }),
    getProducts({ vertical: "gifting", occasion: o.slug }),
    getReturnGifts(rgKey),
  ]);
  return (
    <>
      <section className="text-pearl" style={{ background: o.tone }}>
        <div className="wrap grid gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-20">
          <div>
            <h1 className="display-l">{o.name}</h1>
            <p className="mt-2 font-display text-2xl italic opacity-90">{o.line}</p>
            <p className="mt-4 max-w-[52ch] text-[17px] opacity-80">{o.story}</p>
            <nav className="mt-6 flex flex-wrap gap-2 text-sm">
              {jewellery.length > 0 && <a href="#wear" className="rounded-full border border-pearl/40 px-4 py-2">What to wear</a>}
              {gifts.length > 0 && <a href="#give" className="rounded-full border border-pearl/40 px-4 py-2">What to give</a>}
              {rg.length > 0 && <a href="#guests" className="rounded-full border border-pearl/40 px-4 py-2">For your guests</a>}
            </nav>
          </div>
          <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-t-full"><ProductArt art={{ ...o.art, ground: o.tone }} className="aspect-[4/5] w-full" /></div>
        </div>
      </section>
      {jewellery.length > 0 && (
        <section id="wear" className="wrap scroll-mt-28 py-16">
          <h2 className="display-m mb-8 text-midnight">What to wear</h2>
          <ProductGrid products={jewellery} />
        </section>
      )}
      {gifts.length > 0 && (
        <section id="give" className="wrap scroll-mt-28 pb-16">
          <h2 className="display-m mb-8 text-midnight">What to give</h2>
          <ProductGrid products={gifts} />
        </section>
      )}
      {rg.length > 0 && (
        <section id="guests" className="scroll-mt-28 bg-blush/60 py-16">
          <div className="wrap">
            <h2 className="display-m text-midnight">For your guests</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {rg.slice(0, 4).map((r) => (
                <Link key={r.slug} href={`/bulk-gifting?combo=${r.slug}&occasion=${rgKey}`} className="overflow-hidden rounded-2xl bg-pearl">
                  <ProductArt art={r.art} title={r.name} className="aspect-[5/4] w-full" />
                  <div className="p-4"><p className="font-display text-xl text-midnight">{r.name}</p><p className="text-sm text-ink/60">{inr(r.pricePerPerson)} per guest, min {r.minQty}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
