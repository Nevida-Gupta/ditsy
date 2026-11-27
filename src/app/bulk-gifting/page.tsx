import type { ProductArt as Art } from "@/lib/types";
import type { Metadata } from "next";
import { BulkForm } from "./BulkForm";
import { getReturnGifts, returnGiftMeta } from "@/lib/catalog";
import { ProductArt } from "@/components/art/ProductArt";
import { one, type SP } from "@/lib/params";

export const metadata: Metadata = {
  title: "Bulk and corporate gifting",
  description: "Bulk gifting for weddings, birthdays, baby showers, festivals and corporate events. Custom curation, personalised packaging and pan-India delivery from 20 to 2,500 gifts. Request a quote or WhatsApp us.",
  alternates: { canonical: "/bulk-gifting" },
};

const steps = [
  ["Tell us about it", "Occasion, numbers, budget and date. Two minutes, no commitment."],
  ["We put options together", "Two or three curated combos within one working day, with photos and pricing."],
  ["Approve a sample", "For orders over 50 we send one finished piece so you know exactly what's coming."],
  ["Packed and delivered", "Name tags, logos and cards done by hand. Delivered to one address or many."],
];

export default async function Bulk({ searchParams }: { searchParams: SP }) {
  const combos = await getReturnGifts();
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-pearl grain">
        <div className="wrap grid gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:items-center md:py-24">
          <div>
            <h1 className="display-l">Gifting for a crowd, chosen like it&rsquo;s for one</h1>
            <p className="mt-5 max-w-[54ch] text-[17px] text-pearl/75">Weddings, first birthdays, Diwali for the whole office. Tell us what you&rsquo;re planning and we&rsquo;ll curate, personalise, pack and deliver, whether it&rsquo;s 20 gifts or 2,500.</p>
          </div>
          <div className="grid grid-cols-3 gap-2" aria-hidden>
            {[{ kind: "hamper", stone: "#9B1B30" }, { kind: "pouch", stone: "#E39AA3" }, { kind: "diary", stone: "#1F5B45" }].map((a, i) => (
              <div key={i} className={`overflow-hidden rounded-t-full ${i === 1 ? "-translate-y-6" : ""}`}><ProductArt art={{ ...(a as Art), ground: "#1E3A4F" }} className="aspect-[3/5] w-full" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <ol className="grid gap-6 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="border-t border-midnight/15 pt-5">
              <span className="font-display text-4xl text-gold">{i + 1}</span>
              <p className="mt-2 font-display text-2xl text-midnight">{t}</p>
              <p className="mt-1 text-[15px] text-ink/65">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="quote" className="bg-blush/50 py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="display-m text-midnight">Request a quote</h2>
            <p className="lede mt-3">You don&rsquo;t need to check out online for bulk orders. Share the details and a gifting specialist will get back to you within one working day.</p>
            <ul className="mt-8 space-y-3 text-[15px] text-ink/75">
              <li>Minimums from 10 pieces, pricing improves from 50 and again from 200.</li>
              <li>Personalised name tags, logo sleeves and cards included on most combos.</li>
              <li>GST invoices for companies.</li>
              <li>Pan-India delivery, including split shipments to multiple addresses.</li>
            </ul>
          </div>
          <BulkForm
            occasions={returnGiftMeta.occasions.map((o) => ({ value: o.slug, label: o.name.replace(" return gifts", "") }))}
            combos={combos.map((c) => ({ value: c.slug, label: `${c.name} (₹${c.pricePerPerson}/guest)` }))}
            initialCombo={one(searchParams.combo)}
            initialOccasion={one(searchParams.occasion)}
          />
        </div>
      </section>
    </>
  );
}
