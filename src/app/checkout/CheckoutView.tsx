"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShop } from "@/store/shop";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { computeTotals } from "@/lib/pricing";
import { inr, cx } from "@/lib/format";
import { ProductArt } from "@/components/art/ProductArt";

const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Ladakh","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];

declare global { interface Window { Razorpay?: new (o: Record<string, unknown>) => { open: () => void; on: (e: string, f: (r: unknown) => void) => void } } }

export function CheckoutView({ onlineEnabled }: { onlineEnabled: boolean }) {
  const { lines, coupon, clear } = useShop();
  const h = useHydrated();
  const router = useRouter();
  const [payment, setPayment] = useState<"online" | "cod">(onlineEnabled ? "online" : "cod");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const t = computeTotals(lines, coupon, payment);

  useEffect(() => {
    if (!onlineEnabled || window.Razorpay) return;
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
  }, [onlineEnabled]);

  if (!h) return <section className="wrap min-h-[60vh]" />;
  if (!lines.length) return (
    <section className="wrap py-20">
      <h1 className="display-l text-midnight">Checkout</h1>
      <p className="mt-4 text-ink/60">Your bag is empty. <Link href="/jewellery" className="link text-midnight">Find something lovely</Link>.</p>
    </section>
  );

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true); setError(""); setFields({});
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const { giftNote, ...address } = f;
    const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lines, coupon, payment, address, giftNote }) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) { setError(j.error || "Something didn't work. Try again."); setFields(j.fields || {}); setBusy(false); return; }

    if (payment === "cod") { clear(); router.push(`/order/${j.id}`); return; }

    if (!window.Razorpay) { setError("The payment window didn't load. Check your connection and try again."); setBusy(false); return; }
    const rz = new window.Razorpay({
      key: j.razorpay.key, amount: j.razorpay.amount, currency: "INR", order_id: j.razorpay.orderId,
      name: "Ditsy", description: `Order ${j.id}`, theme: { color: "#0E1F2E" },
      prefill: { name: address.name, email: address.email, contact: address.phone },
      handler: async (r: Record<string, string>) => {
        const v = await fetch("/api/payments/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: j.id, ...r }) });
        if (v.ok) { clear(); router.push(`/order/${j.id}`); } else { setError("We couldn't confirm the payment. If money left your account, WhatsApp us your order number " + j.id + "."); setBusy(false); }
      },
      modal: { ondismiss: () => setBusy(false) },
    });
    rz.open();
  };

  return (
    <section className="wrap grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={submit} noValidate>
        <h1 className="display-l text-midnight">Checkout</h1>
        <fieldset className="mt-10 grid gap-4 sm:grid-cols-2">
          <legend className="mb-4 font-display text-2xl text-midnight">Delivery details</legend>
          <Field fields={fields} name="name" label="Full name" auto="name" />
          <Field fields={fields} name="phone" label="Mobile number" auto="tel" inputMode="tel" half />
          <Field fields={fields} name="email" label="Email" type="email" auto="email" half />
          <Field fields={fields} name="line1" label="House, building, street" auto="address-line1" />
          <Field fields={fields} name="line2" label="Area, landmark (optional)" auto="address-line2" />
          <Field fields={fields} name="pincode" label="PIN code" auto="postal-code" inputMode="numeric" maxLength={6} half />
          <Field fields={fields} name="city" label="City" auto="address-level2" half />
          <div className="sm:col-span-2">
            <label className="label" htmlFor="co-state">State</label>
            <select id="co-state" name="state" defaultValue="" className={cx("field", fields.state && "border-rose")}>
              <option value="" disabled>Choose your state</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
            {fields.state && <p className="mt-1 text-[13px] text-rose">{fields.state}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="co-gift">Sending it as a gift? Add a note (optional)</label>
            <textarea id="co-gift" name="giftNote" rows={2} maxLength={300} className="field" placeholder="We'll print it on a card and leave the invoice out." />
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="mb-4 font-display text-2xl text-midnight">Payment</legend>
          <div className="grid gap-3">
            <label className={cx("flex cursor-pointer items-start gap-3 rounded-2xl border p-4", payment === "online" ? "border-midnight" : "border-midnight/15", !onlineEnabled && "cursor-not-allowed opacity-50")}>
              <input type="radio" name="pay" className="mt-1 accent-[#0E1F2E]" checked={payment === "online"} disabled={!onlineEnabled} onChange={() => setPayment("online")} />
              <span><span className="block">UPI, cards, netbanking and wallets</span><span className="text-[13.5px] text-ink/55">{onlineEnabled ? "Secure payment by Razorpay." : "Online payment switches on once the Razorpay account is connected."}</span></span>
            </label>
            <label className={cx("flex cursor-pointer items-start gap-3 rounded-2xl border p-4", payment === "cod" ? "border-midnight" : "border-midnight/15")}>
              <input type="radio" name="pay" className="mt-1 accent-[#0E1F2E]" checked={payment === "cod"} onChange={() => setPayment("cod")} />
              <span><span className="block">Cash on delivery</span><span className="text-[13.5px] text-ink/55">{inr(49)} handling fee.</span></span>
            </label>
          </div>
        </fieldset>

        {error && <p className="mt-6 rounded-xl bg-rose/10 px-4 py-3 text-[14.5px] text-rose" role="alert">{error}</p>}
        <button className="btn-wine mt-8 w-full sm:w-auto" disabled={busy}>{busy ? "Placing order…" : payment === "online" ? `Pay ${inr(t.total)}` : `Place order, ${inr(t.total)}`}</button>
        <p className="mt-3 text-[13px] text-ink/50">By placing your order you agree to our <Link href="/policies/returns" className="underline">returns policy</Link>.</p>
      </form>

      <aside className="h-fit rounded-[28px] bg-sand/60 p-7 lg:sticky lg:top-[96px]">
        <h2 className="font-display text-2xl text-midnight">Order summary</h2>
        <ul className="mt-5 space-y-4">
          {lines.map((l) => (
            <li key={l.key} className="flex gap-3">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl"><ProductArt art={l.art} title={l.name} sizes="120px" className="h-full w-full" /><span className="absolute -right-0 -top-0 grid h-5 min-w-5 place-items-center rounded-bl-lg bg-midnight px-1 text-[11px] text-pearl">{l.qty}</span></div>
              <p className="flex-1 text-[14.5px] leading-snug">{l.name}</p>
              <p className="text-[14.5px]">{inr(l.unitPrice * l.qty)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-midnight/10 pt-4 text-[15px]">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(t.subtotal)}</dd></div>
          {t.discount > 0 && <div className="flex justify-between text-[#2F6B4F]"><dt>Discount ({t.coupon?.code})</dt><dd>−{inr(t.discount)}</dd></div>}
          <div className="flex justify-between"><dt>Shipping</dt><dd>{t.shipping ? inr(t.shipping) : "Free"}</dd></div>
          {t.codFee > 0 && <div className="flex justify-between"><dt>Cash on delivery</dt><dd>{inr(t.codFee)}</dd></div>}
          <div className="flex justify-between pt-2 text-lg"><dt>Total</dt><dd>{inr(t.total)}</dd></div>
        </dl>
        <Link href="/cart" className="mt-4 inline-block text-sm text-ink/55 underline">Edit bag or add a code</Link>
      </aside>
    </section>
  );
}

function Field({ name, label, type = "text", auto, half, fields, ...rest }: { name: string; label: string; type?: string; auto?: string; half?: boolean; fields: Record<string, string> } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={half ? "" : "sm:col-span-2"}>
      <label className="label" htmlFor={`co-${name}`}>{label}</label>
      <input id={`co-${name}`} name={name} type={type} autoComplete={auto} className={cx("field", fields[name] && "border-rose")} aria-invalid={!!fields[name]} {...rest} />
      {fields[name] && <p className="mt-1 text-[13px] text-rose">{fields[name]}</p>}
    </div>
  );
}
