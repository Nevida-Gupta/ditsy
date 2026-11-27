import type { Metadata } from "next";
import Link from "next/link";
import { ProductArt } from "@/components/art/ProductArt";
import { Wordmark } from "@/components/ui/Wordmark";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "About Ditsy", description: "Ditsy is an Indian lifestyle brand for distinctive jewellery and thoughtful gifting. Curated in Delhi's markets, packed by hand, shipped across India.", alternates: { canonical: "/about" } };

const beliefs = [
  ["Fewer, better pieces", "We'd rather sell 40 jhumkas we love than 4,000 we don't. Every design is chosen by hand, and we turn down far more than we take."],
  ["Artificial, not ordinary", "Brass bases, nickel-free plating, hand-set stones. Built to look like an heirloom and be worn without worrying about it."],
  ["Gifts that sound like you", "A good gift says something about both of you. We help you put it together, then pack it so the unboxing is part of the gift."],
  ["Small surprises", "Every jewellery order leaves with a little extra in the box. We like the idea of you smiling twice."],
];

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-pearl grain">
        <div className="wrap py-20 md:py-28">
          <Wordmark className="text-[clamp(4rem,14vw,11rem)] text-champagne" jewel="#F5DFD9" />
          <p className="mt-6 max-w-[30ch] font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.15]">A little bit dreamy, a little bit extra, and very particular about what we let in.</p>
        </div>
      </section>
      <section className="wrap grid gap-14 py-20 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-t-full"><ProductArt art={{ kind: "jhumka", finish: "antique", stone: "#9B1B30" }} className="aspect-[4/5] w-full" /></div>
        <div>
          <h1 className="display-m text-midnight">How Ditsy began</h1>
          <div className="mt-6 space-y-5 text-[17px] leading-[1.75] text-ink/80">
            <p>Ditsy started with a suitcase and a very long day in Delhi&rsquo;s markets. Stall after stall of jewellery that all looked the same, and then, every so often, a piece that made us stop. A jhumka with a pearl fringe that moved just right. A choker that looked older than it was.</p>
            <p>Those are the only pieces we sell. We choose them one at a time, check every clasp and stone, and price them so dressing up for every function doesn&rsquo;t mean saving up for it.</p>
            <p>Gifting came next, because the people who love jewellery are usually the ones who love giving. Ditsy Gifting is for hampers that feel personal, return gifts guests actually keep, and boxes you put together yourself.</p>
          </div>
        </div>
      </section>
      <section className="bg-sand/60 py-20">
        <div className="wrap">
          <h2 className="display-m text-midnight">What we care about</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {beliefs.map(([t, d]) => (
              <div key={t} className="border-t border-midnight/15 pt-5"><p className="font-display text-2xl text-midnight">{t}</p><p className="mt-2 text-ink/70">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="wrap scroll-mt-28 py-20">
        <h2 className="display-m text-midnight">Say hello</h2>
        <p className="lede mt-3">Styling questions, order help or a gifting idea you want to talk through. We reply within a working day, usually much sooner.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={whatsappLink("Hi Ditsy!")} target="_blank" rel="noreferrer" className="btn-wine">WhatsApp us</a>
          <a href={`mailto:${site.email}`} className="btn-line text-midnight">{site.email}</a>
          <Link href="/bulk-gifting" className="btn-line text-midnight">Bulk enquiries</Link>
        </div>
      </section>
    </>
  );
}
