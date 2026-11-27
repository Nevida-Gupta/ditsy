import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { site, whatsappLink } from "@/lib/site";
import { Newsletter } from "./Newsletter";

const cols = [
  { title: "Jewellery", links: [["Earrings", "/jewellery?group=Earrings"], ["Jewellery sets", "/jewellery?group=Jewellery%20sets"], ["Ornaments", "/jewellery?group=Ornaments"], ["The jhumka edit", "/collections/jhumka-edit"], ["Wedding guest edit", "/collections/wedding-guest"], ["Under ₹999", "/collections/under-999"]] },
  { title: "Gifting", links: [["Return gifts", "/gifting/return-gifts"], ["Build your gift box", "/build-your-box"], ["Luxury hampers", "/collections/luxury-hampers"], ["Bridesmaid gifts", "/collections/bridesmaid-gifts"], ["Corporate gifting", "/collections/corporate-gifting"], ["Bulk orders", "/bulk-gifting"]] },
  { title: "Help", links: [["Track an order", "/account"], ["Shipping", "/policies/shipping"], ["Returns & refunds", "/policies/returns"], ["Jewellery care", "/policies/care"], ["Contact us", "/about#contact"]] },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-midnight-deep text-pearl/80">
      <div className="wrap grid gap-12 pb-10 pt-20 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <p className="max-w-sm font-display text-3xl leading-tight text-pearl">Letters from Ditsy</p>
          <p className="mt-3 max-w-sm text-[15px]">New edits, restocks and the occasional styling note. About twice a month, never more.</p>
          <Newsletter dark />
          <div className="mt-8 flex gap-5 text-sm">
            <a href={site.instagram} className="link" target="_blank" rel="noreferrer">Instagram</a>
            <a href={whatsappLink("Hi Ditsy!")} className="link" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`mailto:${site.email}`} className="link">{site.email}</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="mb-4 font-display text-xl text-champagne">{c.title}</p>
              <ul className="space-y-2 text-[14.5px]">
                {c.links.map(([n, h]) => (<li key={h}><Link href={h} className="hover:text-pearl">{n}</Link></li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="wrap flex flex-col gap-3 border-t border-pearl/10 py-6 text-[13px] text-pearl/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ditsy. Curated in India.</p>
        <p>Prices include GST. Secure payments by Razorpay.</p>
      </div>
      <div aria-hidden className="pointer-events-none select-none px-4 pb-2 text-center text-[28vw] leading-[0.8] text-pearl/[0.04]">
        <Wordmark jewel="rgba(232,213,181,0.12)" />
      </div>
    </footer>
  );
}
