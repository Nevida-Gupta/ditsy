import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProductsSync, getBundlesForProduct, getCategory, getProduct, getProducts, getProductsBySlugs, getReviews } from "@/lib/catalog";
import { Gallery } from "@/components/shop/Gallery";
import { BuyBox } from "@/components/shop/BuyBox";
import { CompleteLook } from "@/components/shop/CompleteLook";
import { BundleCard } from "@/components/shop/BundleCard";
import { ReviewForm } from "@/components/shop/ReviewForm";
import { Rail } from "@/components/home/Rail";
import { StarIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllProductsSync().filter((p) => !p.tags.includes("box-only")).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.short} ₹${p.price.toLocaleString("en-IN")} at Ditsy.`,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: `${p.name} | Ditsy`, description: p.short, images: p.images?.length ? [p.images[0]] : undefined },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product || product.tags.includes("box-only")) notFound();
  const [category, reviews, pairs, bundles, related] = await Promise.all([
    getCategory(product.category),
    getReviews(product.slug),
    getProductsBySlugs(product.pairsWith ?? []),
    getBundlesForProduct(product.slug),
    getProducts({ vertical: product.vertical }),
  ]);
  const bundleItems = await Promise.all(bundles.map((b) => getProductsBySlugs(b.productSlugs)));
  const more = related.filter((p) => p.slug !== product.slug && (p.category === product.category || p.collections.some((c) => product.collections.includes(c)))).slice(0, 8);
  const isEarring = category?.group === "Earrings" || category?.slug === "maang-tikka" || category?.slug === "nath";

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: "Ditsy" },
    category: category?.name,
    image: product.images?.map((i) => `${site.url}${i}`),
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: {
      "@type": "Offer", priceCurrency: "INR", price: product.price, url: `${site.url}/product/${product.slug}`,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav aria-label="Breadcrumb" className="wrap pt-6 text-[13px] text-ink/55">
        <Link href="/" className="hover:text-ink">Home</Link> <span aria-hidden>/</span>{" "}
        <Link href={`/${product.vertical}`} className="hover:text-ink">{product.vertical === "jewellery" ? "Jewellery" : "Gifting"}</Link> <span aria-hidden>/</span>{" "}
        {category && <Link href={`/${product.vertical}?category=${category.slug}`} className="hover:text-ink">{category.name}</Link>}
      </nav>

      <section className="wrap grid gap-10 pb-16 pt-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Gallery product={product} />
        <div>
          <BuyBox product={product} />

          <div className="mt-10 divide-y divide-midnight/10 border-y border-midnight/10">
            <details open className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl text-midnight">The story<span className="transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink/75">{product.description}</p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl text-midnight">Details & care<span className="transition group-open:rotate-45">+</span></summary>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] text-ink/75">{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl text-midnight">Shipping & exchanges<span className="transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-[15px] text-ink/75">Dispatched within 1–2 working days, delivered in 3–6 days across India. Unworn pieces can be exchanged within 7 days. <Link className="link" href="/policies/returns">Read the full policy</Link>.</p>
            </details>
          </div>

          {isEarring && product.vertical === "jewellery" && (
            <div className="mt-8 rounded-2xl border border-dashed border-midnight/25 p-5">
              <p className="font-display text-xl text-midnight">Virtual try-on</p>
              <p className="mt-1 text-[14.5px] text-ink/65">Coming soon. See these on your own face through your phone camera. It needs our studio photography of every piece, so it arrives with the full catalogue shoot.</p>
            </div>
          )}
        </div>
      </section>

      {pairs.length > 0 && <section className="wrap pb-16"><CompleteLook product={product} pairs={pairs} /></section>}

      {bundles.length > 0 && (
        <section className="wrap pb-16">
          <h2 className="display-m text-midnight">Save with a bundle</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{bundles.map((b, i) => <BundleCard key={b.slug} bundle={b} items={bundleItems[i]} />)}</div>
        </section>
      )}

      <section id="reviews" className="wrap scroll-mt-28 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="display-m text-midnight">Reviews</h2>
            <p className="mt-4 flex items-center gap-2 text-lg"><StarIcon className="h-5 w-5 text-gold" /> {product.rating.toFixed(1)} out of 5</p>
            <p className="text-ink/55">{product.reviewCount} verified buyers</p>
            <div className="mt-6"><ReviewForm slug={product.slug} /></div>
          </div>
          <div className="divide-y divide-midnight/10">
            {reviews.length ? reviews.map((r) => (
              <figure key={r.name + r.date} className="py-6 first:pt-0">
                <div className="flex text-gold">{Array.from({ length: r.rating }, (_, i) => <StarIcon key={i} className="h-4 w-4" />)}</div>
                <blockquote className="mt-2 text-[16px] leading-relaxed text-ink/80">{r.text}</blockquote>
                <figcaption className="mt-2 text-[13.5px] text-ink/50">{r.name}, {r.city}</figcaption>
              </figure>
            )) : <p className="text-ink/60">Written reviews for this piece will show here. Be the first to share how you wore it.</p>}
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="wrap pb-28">
          <h2 className="display-m mb-8 text-midnight">You might also love</h2>
          <Rail products={more} />
        </section>
      )}
    </>
  );
}
