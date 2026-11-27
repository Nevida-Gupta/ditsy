import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollection, getCollections, getProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductArt } from "@/components/art/ProductArt";
import { CollectionBanner } from "@/components/shop/CollectionBanner";

export async function generateStaticParams() {
  return (await getCollections()).map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = await getCollection(params.slug);
  return c ? { title: c.name, description: `${c.line} ${c.story}`, alternates: { canonical: `/collections/${c.slug}` } } : {};
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const c = await getCollection(params.slug);
  if (!c) notFound();
  const [products, siblings] = await Promise.all([getProducts({ collection: c.slug }), getCollections(c.vertical)]);
  return (
    <>
      <section className={c.vertical === "jewellery" ? "bg-peacock-deep text-pearl" : "bg-blush text-midnight"}>
        <div className="grid md:min-h-[60vh] md:grid-cols-2">
          <div className="wrap flex flex-col justify-center py-14 md:py-20 md:pr-16">
            <Link href={`/${c.vertical}`} className="text-[14px] opacity-70 hover:opacity-100">Ditsy {c.vertical === "jewellery" ? "Jewellery" : "Gifting"}</Link>
            <h1 className="display-l mt-3">{c.name}</h1>
            <p className="mt-3 font-display text-2xl italic opacity-90">{c.line}</p>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed opacity-80">{c.story}</p>
          </div>
          <div className="relative min-h-[44vh] md:min-h-0">
            {c.art[0] && <ProductArt art={c.art[0]} title={c.name} seed={c.slug} priority sizes="(max-width: 768px) 100vw, 50vw" className="absolute inset-0 h-full w-full" />}
          </div>
        </div>
      </section>
      <section className="wrap py-16">
        {products.length ? <ProductGrid products={products} /> : (
          <p className="py-16 text-center text-ink/60">This edit is being restocked. <Link href={`/${c.vertical}`} className="link text-midnight">Browse everything else</Link>.</p>
        )}
      </section>
      <section className="wrap pb-24">
        <h2 className="display-m mb-8 text-midnight">More edits</h2>
        <div className="grid gap-4 md:grid-cols-3">{siblings.filter((s) => s.slug !== c.slug).slice(0, 3).map((s) => <CollectionBanner key={s.slug} c={s} />)}</div>
      </section>
    </>
  );
}
