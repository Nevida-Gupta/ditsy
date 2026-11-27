import Image from "next/image";
import Link from "next/link";
import { imagery } from "@/data/imagery";
import { Hero } from "@/components/home/Hero";
import { VerticalPanels } from "@/components/home/VerticalPanels";
import { SectionHead } from "@/components/home/SectionHead";
import { Rail } from "@/components/home/Rail";
import { GiftBoxTeaser } from "@/components/home/GiftBoxTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { CollectionBanner } from "@/components/shop/CollectionBanner";
import { BundleCard } from "@/components/shop/BundleCard";
import { ProductArt } from "@/components/art/ProductArt";
import { Newsletter } from "@/components/layout/Newsletter";
import { Wordmark } from "@/components/ui/Wordmark";
import { getBoxableProducts, getBundles, getCollection, getOccasions, getProducts, getProductsBySlugs, builderOptions, testimonials, returnGiftMeta } from "@/lib/catalog";
import { site } from "@/lib/site";

export default async function Home() {
  const all = await getProducts();
  const newArrivals = all.filter((p) => p.isNew);
  const bestsellers = all.filter((p) => p.bestseller).slice(0, 8);
  const featured = await Promise.all(["signature", "jhumka-edit", "wedding-guest", "mehendi-haldi"].map(getCollection));
  const giftCols = await Promise.all(["bridesmaid-gifts", "luxury-hampers", "corporate-gifting"].map(getCollection));
  const occasions = await getOccasions();
  const bundles = (await getBundles()).filter((b) => ["jhumka-tikka-pair", "complete-bridal", "festive-look", "self-care-trio"].includes(b.slug));
  const bundleItems = await Promise.all(bundles.map((b) => getProductsBySlugs(b.productSlugs)));
  const boxable = (await getBoxableProducts()).filter((p) => ["rose-oud-candle", "kamal-trinket-dish", "sea-salt-chocolates", "brocade-potli", "mini-tara-studs", "dried-rose-jar"].includes(p.slug));

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ditsy",
    url: site.url,
    slogan: site.tagline,
    description: site.positioning,
    sameAs: [site.instagram],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <Hero />
      <VerticalPanels />

      {/* New arrivals */}
      <section className="wrap pb-24">
        <SectionHead title="Just in" line="Fresh from our last trip to the markets. Small batches, so the good ones go quickly." href="/jewellery?sort=new" cta="See everything new" />
        <Rail products={newArrivals} />
      </section>

      {/* Featured jewellery collections */}
      <section className="wrap pb-24">
        <SectionHead title="The edits" line="Collections built around how you'll actually wear them." href="/jewellery" cta="All jewellery" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr]">
          {featured[0] && <div className="md:row-span-2"><CollectionBanner c={featured[0]} size="lg" /></div>}
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-1 md:grid-cols-1 lg:grid-cols-1">
            {featured.slice(1, 3).map((c) => c && <CollectionBanner key={c.slug} c={c} />)}
          </div>
        </div>
        {featured[3] && <div className="mt-4"><CollectionBanner c={featured[3]} /></div>}
      </section>

      {/* Gifting experience */}
      <section className="bg-blush/70 py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <h2 className="display-l text-midnight">Every gift should feel thoughtfully chosen</h2>
              <p className="lede mt-5">That's the whole philosophy. We put gifts together the way you would if you had the time: one good thing, then another that goes with it, wrapped so the unboxing is part of the gift.</p>
              <div className="mt-8 rounded-[24px] bg-pearl/70 p-6">
                <p className="font-display text-2xl text-midnight">Return gifts, by budget</p>
                <ul className="mt-4 divide-y divide-midnight/10">
                  {returnGiftMeta.tiers.map((t) => (
                    <li key={t.id}><Link href={`/gifting/return-gifts?tier=${t.id}`} className="flex justify-between py-3 text-[15px] hover:text-midnight"><span>{t.label}</span><span aria-hidden className="text-gold">◆</span></Link></li>
                  ))}
                </ul>
                <Link href="/bulk-gifting" className="btn-wine mt-5 w-full">Plan a bulk order</Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {giftCols[0] && <div className="sm:col-span-2"><CollectionBanner c={giftCols[0]} /></div>}
              {giftCols.slice(1).map((c) => c && <CollectionBanner key={c.slug} c={c} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Build your box preview */}
      <section className="wrap py-24 md:py-32">
        <GiftBoxTeaser items={boxable} boxPrice={builderOptions.boxes[1].price} />
      </section>

      {/* Bestsellers */}
      <section className="bg-midnight py-24 text-pearl md:py-32">
        <div className="wrap">
          <SectionHead dark title="Most loved" line="The pieces people come back for, and send to their sisters." href="/jewellery?sort=popular" cta="Shop bestsellers" />
          <Rail products={bestsellers} dark />
        </div>
      </section>

      {/* Occasions */}
      <section className="wrap py-24 md:py-32">
        <SectionHead title="Shop by occasion" line="Tell us what you're celebrating. We'll bring the jewellery and the gifts." href="/occasions" cta="All occasions" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {occasions.map((o) => (
            <Link key={o.slug} href={`/occasions/${o.slug}`} data-cursor="Open" className="group relative overflow-hidden rounded-[22px]" style={{ background: o.tone }}>
              <ProductArt art={{ ...o.art, ground: o.tone }} className="aspect-[4/5] w-full opacity-90 transition-transform duration-700 ease-silk group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4 text-pearl">
                <p className="font-display text-xl">{o.name}</p>
                <p className="text-[13px] opacity-80">{o.line}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bundles */}
      <section className="wrap pb-24 md:pb-32">
        <SectionHead title="Better together" line="Pieces we've already matched, at a price that's kinder than buying them one by one." href="/bundles" cta="All bundles" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {bundles.map((b, i) => <BundleCard key={b.slug} bundle={b} items={bundleItems[i]} />)}
        </div>
      </section>

      {/* Brand story */}
      <section className="relative overflow-hidden bg-midnight-deep py-28 text-pearl md:py-40 grain">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="font-display text-[clamp(2rem,4.4vw,3.9rem)] leading-[1.12]">
              We went through thousands of pairs in Delhi&rsquo;s oldest markets. A few hundred made us stop. Those are the ones we sell.
            </p>
            <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-pearl/70">
              Ditsy is for people who love dressing up and love giving even more. We don&rsquo;t stock a thousand versions of the same jhumka. We choose pieces with a point of view, pair them with gifts that feel personal, and pack everything as if it were going to someone we know.
            </p>
            <Link href="/about" className="link mt-8 inline-block text-champagne">Read our story</Link>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute inset-0 rounded-t-full border border-champagne/30" />
            <div className="absolute inset-6 overflow-hidden rounded-t-full">
              <Image src={imagery.floralPortrait.src} alt={imagery.floralPortrait.alt} fill sizes="(min-width: 1024px) 420px, 90vw" quality={90} className="object-cover" style={{ objectPosition: imagery.floralPortrait.focus }} />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="wrap py-24 md:py-32">
        <SectionHead title="Follow along" line={`New pieces as they land, styling for the season, and notes from the markets. Tag ${site.instagramHandle} when you wear Ditsy.`} href={site.instagram} cta="Follow on Instagram" />
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {[imagery.friends, imagery.henna, imagery.exchangingGifts, imagery.smilingBride, imagery.mehendiHands, imagery.eveningPortrait].map((img) => (
            <a key={img.src} href={site.instagram} target="_blank" rel="noreferrer" className="group relative aspect-[4/5] overflow-hidden rounded-xl" aria-label={`${img.alt}, on Instagram`}>
              <Image src={img.src} alt="" fill sizes="(min-width: 768px) 16vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: img.focus }} />
            </a>
          ))}
        </div>
      </section>

      <Testimonials items={testimonials} />

      {/* Newsletter */}
      <section className="wrap grid gap-10 py-24 md:grid-cols-2 md:items-center md:py-32">
        <div>
          <Wordmark className="text-6xl text-midnight" />
          <h2 className="display-m mt-4 text-midnight">Ten per cent off your first order</h2>
          <p className="lede mt-3">Join our letters for new edits, restocks before they're public, and styling notes for the season. Unsubscribe whenever you like.</p>
        </div>
        <div className="md:justify-self-end"><Newsletter /></div>
      </section>

    </>
  );
}
