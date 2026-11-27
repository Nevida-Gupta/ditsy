import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";

const pages: Record<string, { title: string; body: [string, string][] }> = {
  shipping: { title: "Shipping", body: [
    ["Where we ship", "Everywhere in India that our courier partners reach, which is nearly every PIN code."],
    ["How long it takes", "Orders leave us within 1–2 working days. Metro cities usually receive them in 2–4 days, everywhere else in 4–7. Personalised and engraved pieces take 3–4 extra days."],
    ["What it costs", `Free on orders above ₹${site.freeShippingAbove}. Below that, a flat ₹${site.shippingFee}. Cash on delivery has a ₹${site.codFee} handling fee.`],
    ["Tracking", "You'll get a tracking link by SMS and email as soon as your parcel is picked up."],
    ["Bulk orders", "Delivery plans for bulk and corporate orders are agreed with you, including split shipments to many addresses."],
  ] },
  returns: { title: "Returns & refunds", body: [
    ["Exchanges", "Unworn jewellery in its original packaging can be exchanged within 7 days of delivery. Message us on WhatsApp with your order number and we'll arrange a pickup."],
    ["Returns", "If a piece arrives damaged or isn't what you ordered, send us a photo within 48 hours and we'll replace it or refund you in full, including shipping."],
    ["What we can't take back", "For hygiene reasons, earrings with opened seals, nose pins and nath can only be exchanged if faulty. Personalised gifts, food items, plants and custom gift boxes can't be returned unless they arrive damaged."],
    ["Refunds", "Approved refunds go back to your original payment method within 5–7 working days. Cash on delivery orders are refunded by bank transfer or UPI."],
  ] },
  care: { title: "Jewellery care", body: [
    ["Keep it dry", "Put your jewellery on last and take it off first. Perfume, lotion and water are what dull plating fastest."],
    ["Store it separately", "Use the Ditsy pouch it came in, or a soft box, so stones don't scratch each other. Lay heavy sets flat."],
    ["Clean it gently", "Wipe with a soft dry cloth after wearing. Never use silver dip or polish on plated or oxidised pieces."],
    ["Pearls and florals", "Faux pearls and fabric florals are delicate. Avoid sprays and keep them away from direct sunlight."],
  ] },
};

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const p = pages[params.slug]; return p ? { title: p.title, alternates: { canonical: `/policies/${params.slug}` } } : {}; }

export default function Policy({ params }: { params: { slug: string } }) {
  const p = pages[params.slug];
  if (!p) notFound();
  return (
    <section className="wrap max-w-3xl py-16 md:py-24">
      <h1 className="display-l text-midnight">{p.title}</h1>
      <div className="mt-10 space-y-8">
        {p.body.map(([h, t]) => (<div key={h}><h2 className="font-display text-2xl text-midnight">{h}</h2><p className="mt-2 text-[16.5px] leading-[1.75] text-ink/75">{t}</p></div>))}
      </div>
      <p className="mt-12 text-[14px] text-ink/50">Questions? Write to {site.email}.</p>
    </section>
  );
}
