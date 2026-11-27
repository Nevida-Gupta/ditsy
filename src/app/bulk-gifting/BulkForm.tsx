"use client";
import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

interface Opt { value: string; label: string }

export function BulkForm({ occasions, combos, initialCombo, initialOccasion }: { occasions: Opt[]; combos: Opt[]; initialCombo?: string; initialOccasion?: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ref, setRef] = useState("");
  const [summary, setSummary] = useState("");
  const minDate = new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 10);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setState("busy");
    const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "bulk", ...f, quantity: Number(f.quantity), details: { combo: f.combo } }) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) { setRef(j.id); setState("done"); }
    else { setErrors(j.fields || {}); setState("error"); }
  };

  const waText = summary || "Hi Ditsy, I'd like to plan a bulk gifting order. Occasion: __, Quantity: __, Budget per gift: __, City: __, Date: __";

  if (state === "done") {
    return (
      <div className="rounded-[28px] bg-pearl p-8" role="status">
        <p className="font-display text-3xl text-midnight">Thank you. We&rsquo;re on it.</p>
        <p className="mt-3 text-ink/70">Your reference is <strong className="text-midnight">{ref}</strong>. Expect a call or WhatsApp within one working day with options and pricing.</p>
        <a href={whatsappLink(`Hi Ditsy, following up on my bulk enquiry ${ref}.`)} target="_blank" rel="noreferrer" className="btn-wine mt-6"><WhatsAppIcon /> Continue on WhatsApp</a>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-[13px] text-rose">{errors[k]}</p>;

  return (
    <form onSubmit={submit} onChange={(e) => {
      const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
      setSummary(`Hi Ditsy, I'd like to plan a bulk gifting order. Occasion: ${f.occasion || "__"}, Quantity: ${f.quantity || "__"}, Budget per gift: ${f.budgetPerGift || "__"}, City: ${f.city || "__"}, Date: ${f.deliveryDate || "__"}. ${f.customisation || ""}`.trim());
    }} className="grid gap-4 rounded-[28px] bg-pearl p-6 sm:grid-cols-2 md:p-8" noValidate>
      <div>
        <label className="label" htmlFor="b-occ">Occasion</label>
        <select id="b-occ" name="occasion" defaultValue={initialOccasion ?? ""} required className="field">
          <option value="" disabled>Choose one</option>
          {occasions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          <option value="other">Something else</option>
        </select>
        {err("occasion")}
      </div>
      <div>
        <label className="label" htmlFor="b-qty">Approximate quantity</label>
        <input id="b-qty" name="quantity" type="number" min={10} max={10000} required placeholder="e.g. 150" className="field" />
        {err("quantity")}
      </div>
      <div>
        <label className="label" htmlFor="b-bud">Budget per gift</label>
        <select id="b-bud" name="budgetPerGift" required defaultValue="" className="field">
          <option value="" disabled>Choose a range</option>
          <option>Under ₹199</option><option>₹199–₹399</option><option>₹399–₹699</option><option>₹700–₹1,500</option><option>Above ₹1,500</option>
        </select>
        {err("budgetPerGift")}
      </div>
      <div>
        <label className="label" htmlFor="b-combo">A combo you liked (optional)</label>
        <select id="b-combo" name="combo" defaultValue={initialCombo ?? ""} className="field">
          <option value="">Surprise me</option>
          {combos.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="b-city">Delivery city</label>
        <input id="b-city" name="city" required className="field" placeholder="e.g. Chandigarh" />
        {err("city")}
      </div>
      <div>
        <label className="label" htmlFor="b-date">Needed by</label>
        <input id="b-date" name="deliveryDate" type="date" min={minDate} required className="field" />
        {err("deliveryDate")}
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="b-cust">Customisation</label>
        <textarea id="b-cust" name="customisation" rows={3} className="field" placeholder="Names on tags, company logo, colour theme, a specific item you have in mind…" />
      </div>
      <div><label className="label" htmlFor="b-name">Your name</label><input id="b-name" name="name" required className="field" />{err("name")}</div>
      <div><label className="label" htmlFor="b-phone">Phone or WhatsApp</label><input id="b-phone" name="phone" required inputMode="tel" className="field" placeholder="10-digit mobile" />{err("phone")}</div>
      <div><label className="label" htmlFor="b-email">Email</label><input id="b-email" name="email" type="email" className="field" />{err("email")}</div>
      <div><label className="label" htmlFor="b-co">Company (optional)</label><input id="b-co" name="company" className="field" /></div>
      {state === "error" && <p className="text-[14px] text-rose sm:col-span-2" role="alert">Some details need another look. They&rsquo;re marked above.</p>}
      <div className="flex flex-wrap gap-3 pt-2 sm:col-span-2">
        <button className="btn-wine" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Request a quote"}</button>
        <a href={whatsappLink(waText)} target="_blank" rel="noreferrer" className="btn-line text-midnight"><WhatsAppIcon className="h-4 w-4" /> WhatsApp enquiry</a>
        {site.consultationUrl ? (
          <a href={site.consultationUrl} target="_blank" rel="noreferrer" className="btn-line text-midnight">Schedule a consultation</a>
        ) : (
          <a href={whatsappLink("Hi Ditsy, I'd like to schedule a gifting consultation call. Good times for me: __")} target="_blank" rel="noreferrer" className="btn-line text-midnight">Schedule a consultation</a>
        )}
      </div>
    </form>
  );
}
