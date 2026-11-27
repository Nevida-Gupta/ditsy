import type { Metadata } from "next";
import Link from "next/link";
import { getReturnGifts, returnGiftMeta } from "@/lib/catalog";
import { ProductArt } from "@/components/art/ProductArt";
import { one, type SP } from "@/lib/params";
import { inr, cx } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Return gifts by budget for birthdays, weddings and baby showers",
  description: "Curated return gift combos from ₹159 per guest. Birthday, wedding, baby shower, first birthday, housewarming and corporate return gifts with personalised tags, delivered across India.",
  alternates: { canonical: "/gifting/return-gifts" },
};

export default async function ReturnGifts({ searchParams }: { searchParams: SP }) {
  const occasion = one(searchParams.occasion);
  const tier = one(searchParams.tier);
  const list = await getReturnGifts(occasion, tier);
  const occName = returnGiftMeta.occasions.find((o) => o.slug === occasion)?.name;
  const q = (k: string, v?: string) => {
    const p = new URLSearchParams();
    if (occasion) p.set("occasion", occasion);
    if (tier) p.set("tier", tier);
    if (v) p.set(k, v); else p.delete(k);
    const s = p.toString();
    return `/gifting/return-gifts${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <section className="bg-midnight text-pearl">
        <div className="wrap py-16 md:py-24">
          <h1 className="display-l max-w-[16ch]">{occName ?? "Return gifts your guests will keep"}</h1>
          <p className="mt-5 max-w-[56ch] text-[17px] text-pearl/75">Choose a combo, tell us how many guests, and we&rsquo;ll pack every one with a name tag tied by hand. Minimums start at 10. Prices include packaging.</p>
        </div>
      </section>
      <section className="wrap py-12">
        <div className="flex flex-wrap gap-2">
          <Link href={q("tier")} className={cx("rounded-full border px-4 py-2 text-sm", !tier ? "border-midnight bg-midnight text-pearl" : "border-midnight/20")}>All budgets</Link>
          {returnGiftMeta.tiers.map((t) => (<Link key={t.id} href={q("tier", t.id)} className={cx("rounded-full border px-4 py-2 text-sm", tier === t.id ? "border-midnight bg-midnight text-pearl" : "border-midnight/20")}>{t.label}</Link>))}
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          <Link href={q("occasion")} className={cx("shrink-0 rounded-full px-3 py-1.5 text-[13.5px]", !occasion ? "bg-blush text-midnight" : "text-ink/60")}>Every occasion</Link>
          {returnGiftMeta.occasions.map((o) => (<Link key={o.slug} href={q("occasion", o.slug)} className={cx("shrink-0 rounded-full px-3 py-1.5 text-[13.5px]", occasion === o.slug ? "bg-blush text-midnight" : "text-ink/60 hover:text-ink")}>{o.name.replace(" return gifts", "")}</Link>))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <article key={r.slug} className="flex flex-col overflow-hidden rounded-[26px] border border-midnight/10 bg-white/50">
              <ProductArt art={r.art} className="aspect-[5/4] w-full" title={r.name} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-2xl text-midnight">{r.name}</h2>
                  <p className="text-lg">{inr(r.pricePerPerson)}<span className="text-sm text-ink/50"> / guest</span></p>
                </div>
                <ul className="mt-3 space-y-1 text-[14.5px] text-ink/70">{r.includes.map((i) => <li key={i}>{i}</li>)}</ul>
                <p className="mt-3 text-[13px] text-ink/50">Minimum {r.minQty} pieces</p>
                <div className="mt-auto flex gap-2 pt-5">
                  <Link href={`/bulk-gifting?combo=${r.slug}&occasion=${occasion ?? r.occasions[0]}`} className="btn-wine flex-1 px-4 py-2.5 text-sm">Get a quote</Link>
                  <a href={whatsappLink(`Hi Ditsy, I'd like the ${r.name} return gift (${inr(r.pricePerPerson)}/guest). Guests: __, Date: __, City: __`)} target="_blank" rel="noreferrer" className="btn-line flex-1 px-4 py-2.5 text-sm text-midnight">WhatsApp</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        {list.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-display text-3xl text-midnight">We&rsquo;ll make one for this</p>
            <p className="mt-2 text-ink/60">No ready combo matches yet. Tell us the occasion and budget and we&rsquo;ll put options together within a day.</p>
            <Link href="/bulk-gifting" className="btn-wine mt-6">Request custom options</Link>
          </div>
        )}
      </section>
    </>
  );
}
