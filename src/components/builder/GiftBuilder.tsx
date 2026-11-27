"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BoxOption, CardOption, Product, RibbonOption } from "@/lib/types";
import { ProductArt } from "@/components/art/ProductArt";
import { useShop } from "@/store/shop";
import { cx, inr } from "@/lib/format";

interface Options { boxes: BoxOption[]; ribbons: RibbonOption[]; cards: CardOption[]; occasions: string[] }

const STEPS = ["Occasion", "Box", "Fill it", "Finishing touches", "Review"] as const;

export function GiftBuilder({ items, options, prefill }: { items: Product[]; options: Options; prefill: string[] }) {
  const [step, setStep] = useState(prefill.length ? 2 : 0);
  const [occasion, setOccasion] = useState(options.occasions[0]);
  const [boxId, setBoxId] = useState(options.boxes[1].id);
  const [picked, setPicked] = useState<string[]>(prefill);
  const [ribbonId, setRibbonId] = useState(options.ribbons[0].id);
  const [cardId, setCardId] = useState(options.cards[1].id);
  const [message, setMessage] = useState("");
  const [qty, setQty] = useState(1);
  const [closed, setClosed] = useState(false);
  const [enquiry, setEnquiry] = useState<"idle" | "form" | "busy" | "done" | "error">("idle");
  const add = useShop((s) => s.add);

  const box = options.boxes.find((b) => b.id === boxId)!;
  const ribbon = options.ribbons.find((r) => r.id === ribbonId)!;
  const card = options.cards.find((c) => c.id === cardId)!;
  const chosen = picked.map((id) => items.find((i) => i.id === id)!).filter(Boolean);
  const unit = box.price + ribbon.price + card.price + chosen.reduce((s, i) => s + i.price, 0);
  const full = chosen.length >= box.capacity;

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= box.capacity ? p : [...p, id]));
  const replace = (oldId: string) => { setPicked((p) => p.filter((x) => x !== oldId)); setStep(2); };
  const chooseBox = (b: BoxOption) => { setBoxId(b.id); setPicked((p) => p.slice(0, b.capacity)); };

  const config = { occasion, boxId, itemIds: picked, ribbonId, cardId: cardId, message: cardId === "none" ? "" : message.trim() };
  const canFinish = chosen.length > 0;

  const addToBag = () => {
    add({ kind: "giftbox", name: `${box.name}, ${occasion.toLowerCase()}`, unitPrice: unit, art: { kind: "box", stone: box.color === "#0E1F2E" ? "#1E3A4F" : box.color }, vertical: "gifting", config, qty });
  };

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);
  const [filter, setFilter] = useState<string>("all");
  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <section className="wrap grid gap-10 pb-28 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {/* Live preview */}
      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="relative mx-auto aspect-square w-full max-w-[560px] rounded-[32px] bg-sand/70 p-[7%]">
          <AnimatePresence mode="wait">
            {!closed ? (
              <motion.div key="open" initial={{ opacity: 0, rotateX: 30 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, rotateX: -30 }} transition={{ duration: 0.45 }} className="relative h-full w-full rounded-[24px] p-[5%]" style={{ background: box.color, boxShadow: `inset 0 0 0 12px ${box.lid}, 0 40px 70px -40px rgba(9,21,33,.55)` }}>
                <div className={cx("grid h-full gap-2.5 p-2", box.capacity === 3 ? "grid-cols-3 grid-rows-1 items-center" : box.capacity === 5 ? "grid-cols-3 grid-rows-2" : "grid-cols-4 grid-rows-2")}>
                  {Array.from({ length: box.capacity }, (_, i) => {
                    const it = chosen[i];
                    return (
                      <div key={i} className={cx("relative overflow-hidden rounded-2xl", box.capacity === 3 && "aspect-[4/5]", !it && "border-2 border-dashed", box.color === "#0E1F2E" ? "border-pearl/25" : "border-midnight/20")}>
                        <AnimatePresence>
                          {it && (
                            <motion.button key={it.id} layout initial={{ scale: 0.5, y: -40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}
                              className="absolute inset-0 bg-pearl" onClick={() => toggle(it.id)} aria-label={`Remove ${it.name} from box`} title="Remove">
                              <ProductArt art={it.art} className="h-full w-full" title={it.name} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
                {cardId !== "none" && (
                  <motion.div initial={{ rotate: -14, x: 20, opacity: 0 }} animate={{ rotate: -8, x: 0, opacity: 1 }} className="absolute -bottom-6 -right-4 w-[42%] rounded-lg p-3 shadow-xl" style={{ background: card.color }}>
                    <p className="line-clamp-4 font-display text-[13px] italic leading-snug text-midnight">{message || `Happy ${occasion.toLowerCase()}!`}</p>
                  </motion.div>
                )}
                <div className="absolute -left-3 top-[12%] h-[76%] w-3 rounded-full" style={{ background: ribbon.color }} aria-hidden />
              </motion.div>
            ) : (
              <motion.div key="closed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.45 }} className="relative h-full w-full rounded-[24px]" style={{ background: box.lid, boxShadow: "0 40px 70px -40px rgba(9,21,33,.55)" }}>
                <div className="absolute inset-y-0 left-1/2 w-[10%] -translate-x-1/2" style={{ background: ribbon.color }} />
                <div className="absolute inset-x-0 top-1/2 h-[10%] -translate-y-1/2" style={{ background: ribbon.color }} />
                <svg viewBox="0 0 100 60" className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-[62%]" aria-hidden>
                  <path d="M50 30 C35 0 5 8 18 26 C24 34 40 33 50 30 Z" fill={ribbon.color} stroke="rgba(0,0,0,.15)" />
                  <path d="M50 30 C65 0 95 8 82 26 C76 34 60 33 50 30 Z" fill={ribbon.color} stroke="rgba(0,0,0,.15)" />
                  <path d="M46 32 L36 58 L44 54 L50 34 Z M54 32 L64 58 L56 54 L50 34 Z" fill={ribbon.color} />
                  <circle cx="50" cy="30" r="6" fill={ribbon.color} stroke="rgba(0,0,0,.2)" />
                </svg>
                <p className="absolute bottom-6 left-0 right-0 text-center font-display text-2xl italic" style={{ color: box.color === "#0E1F2E" ? "#E9DDC4" : "#0E1F2E" }}>ditsy</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mx-auto mt-6 flex max-w-[560px] items-center justify-between">
          <div>
            <p className="font-display text-3xl text-midnight" aria-live="polite">{inr(unit)}</p>
            <p className="text-[13px] text-ink/55">{chosen.length} of {box.capacity} items, {box.name.toLowerCase()}, {ribbon.name.toLowerCase()} ribbon</p>
          </div>
          <button onClick={() => setClosed(!closed)} className="btn-line text-midnight" disabled={!canFinish}>{closed ? "Open the box" : "Close the lid"}</button>
        </div>
      </div>

      {/* Steps */}
      <div>
        <ol className="mb-8 flex flex-wrap gap-x-5 gap-y-2" aria-label="Steps">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button onClick={() => (i < 3 || canFinish) && setStep(i)} aria-current={step === i ? "step" : undefined}
                className={cx("flex items-center gap-2 text-[14px]", step === i ? "text-midnight" : "text-ink/45 hover:text-ink/70")}>
                <span className={cx("grid h-6 w-6 place-items-center rounded-full text-[12px]", step === i ? "bg-midnight text-pearl" : i < step ? "bg-champagne text-midnight" : "border border-ink/20")}>{i + 1}</span>
                {s}
              </button>
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
            {step === 0 && (
              <div>
                <h2 className="display-m text-midnight">What&rsquo;s the occasion?</h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {options.occasions.map((o) => (
                    <button key={o} onClick={() => setOccasion(o)} aria-pressed={occasion === o} className={cx("rounded-full border px-5 py-2.5 text-[15px] transition", occasion === o ? "border-midnight bg-midnight text-pearl" : "border-midnight/20 hover:border-midnight/50")}>{o}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="display-m text-midnight">Choose a box</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {options.boxes.map((b) => (
                    <button key={b.id} onClick={() => chooseBox(b)} aria-pressed={boxId === b.id} className={cx("rounded-2xl border p-4 text-left transition", boxId === b.id ? "border-midnight ring-1 ring-midnight" : "border-midnight/15 hover:border-midnight/40")}>
                      <span className="mb-3 block aspect-[4/3] rounded-xl" style={{ background: b.color, boxShadow: `inset 0 0 0 6px ${b.lid}` }} />
                      <span className="block font-display text-xl text-midnight">{b.name}</span>
                      <span className="block text-[13.5px] text-ink/60">{b.note}</span>
                      <span className="mt-1 block text-[14px]">{inr(b.price)}</span>
                    </button>
                  ))}
                </div>
                {picked.length > box.capacity && <p className="mt-3 text-sm text-rose">Some items were removed to fit this box.</p>}
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex items-end justify-between gap-4">
                  <h2 className="display-m text-midnight">Fill it</h2>
                  <p className={cx("text-[14px]", full ? "text-rose" : "text-ink/60")}>{full ? "Box is full. Remove something to swap." : `${box.capacity - chosen.length} spaces left`}</p>
                </div>
                <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
                  {["all", ...categories].map((c) => (
                    <button key={c} onClick={() => setFilter(c)} className={cx("shrink-0 rounded-full px-3.5 py-1.5 text-[13.5px]", filter === c ? "bg-blush text-midnight" : "text-ink/60 hover:text-ink")}>{c === "all" ? "Everything" : c.replace(/-/g, " ").replace("and", "&")}</button>
                  ))}
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {shown.map((i) => {
                    const on = picked.includes(i.id);
                    return (
                      <li key={i.id}>
                        <button onClick={() => toggle(i.id)} disabled={!on && full} aria-pressed={on} className={cx("group w-full rounded-2xl p-2 text-left transition disabled:opacity-40", on ? "bg-midnight text-pearl" : "bg-white/60 hover:bg-blush/50")}>
                          <span className="block overflow-hidden rounded-xl"><ProductArt art={i.art} className="aspect-square w-full" title={i.name} /></span>
                          <span className="mt-2 block text-[14px] leading-snug">{i.name}</span>
                          <span className={cx("text-[13px]", on ? "text-champagne" : "text-ink/55")}>{inr(i.price)} {on ? "(added)" : ""}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <fieldset>
                  <legend className="display-m text-midnight">Ribbon</legend>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {options.ribbons.map((r) => (
                      <button key={r.id} onClick={() => setRibbonId(r.id)} aria-pressed={ribbonId === r.id} className={cx("flex items-center gap-3 rounded-full border py-2 pl-2 pr-4 text-[14px]", ribbonId === r.id ? "border-midnight ring-1 ring-midnight" : "border-midnight/15")}>
                        <span className="h-7 w-7 rounded-full border border-black/10" style={{ background: r.color }} />
                        {r.name} {r.price > 0 && <span className="text-ink/50">+{inr(r.price)}</span>}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="font-display text-2xl text-midnight">Card</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {options.cards.map((c) => (
                      <button key={c.id} onClick={() => setCardId(c.id)} aria-pressed={cardId === c.id} className={cx("rounded-full border px-4 py-2 text-[14px]", cardId === c.id ? "border-midnight bg-midnight text-pearl" : "border-midnight/20")}>
                        {c.name}{c.price > 0 && ` +${inr(c.price)}`}
                      </button>
                    ))}
                  </div>
                  {cardId !== "none" && (
                    <div className="mt-4">
                      <label htmlFor="gb-msg" className="label">Your message {cardId === "handwritten" && "(we'll write it by hand)"}</label>
                      <textarea id="gb-msg" value={message} onChange={(e) => setMessage(e.target.value.slice(0, 220))} rows={4} className="field" placeholder={`Happy ${occasion.toLowerCase()}! Thought of you the moment I saw this.`} />
                      <p className="mt-1 text-right text-[12.5px] text-ink/45">{message.length}/220</p>
                    </div>
                  )}
                </fieldset>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="display-m text-midnight">Your box</h2>
                <ul className="mt-6 divide-y divide-midnight/10 border-y border-midnight/10 text-[15px]">
                  <li className="flex justify-between py-3"><span>{box.name}</span><span>{inr(box.price)}</span></li>
                  {chosen.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-3 py-3">
                      <span>{i.name}</span>
                      <span className="flex items-center gap-3">{inr(i.price)}<button className="text-[13px] text-ink/50 underline" onClick={() => replace(i.id)}>Replace</button></span>
                    </li>
                  ))}
                  <li className="flex justify-between py-3"><span>{ribbon.name} ribbon</span><span>{ribbon.price ? inr(ribbon.price) : "Included"}</span></li>
                  <li className="flex justify-between py-3"><span>{card.name}</span><span>{card.price ? inr(card.price) : "Included"}</span></li>
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center rounded-full border border-midnight/20">
                    <button className="px-4 py-3" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Fewer boxes">−</button>
                    <label className="sr-only" htmlFor="gb-qty">Number of boxes</label>
                    <input id="gb-qty" type="number" min={1} max={500} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} className="w-14 bg-transparent text-center" />
                    <button className="px-4 py-3" onClick={() => setQty(Math.min(500, qty + 1))} aria-label="More boxes">+</button>
                  </div>
                  <p className="font-display text-3xl text-midnight">{inr(unit * qty)}</p>
                </div>
                {qty >= 10 && <p className="mt-3 rounded-xl bg-blush/50 px-4 py-3 text-[14px] text-midnight">Ordering 10 or more? Send it as an enquiry and we&rsquo;ll come back with bulk pricing, logo or name personalisation and a delivery plan.</p>}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="btn-wine" disabled={!canFinish} onClick={addToBag}>Add to bag</button>
                  <button className="btn-line text-midnight" disabled={!canFinish} onClick={() => setEnquiry("form")}>Send as an enquiry</button>
                </div>
                {enquiry !== "idle" && (
                  <EnquiryForm state={enquiry} setState={setEnquiry} payload={{ type: "giftbox", quantity: qty, occasion, details: { config, unitPrice: unit, items: chosen.map((c) => c.name) } }} />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-between border-t border-midnight/10 pt-6">
          <button className="text-[15px] text-ink/60 disabled:opacity-0" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
          {step < 4 && <button className="btn-wine" disabled={step >= 2 && !canFinish} onClick={() => setStep(step + 1)}>{step === 2 && !canFinish ? "Add at least one item" : `Next: ${STEPS[step + 1].toLowerCase()}`}</button>}
          {step === 4 && <Link href="/bulk-gifting" className="link text-[15px] text-midnight">Planning for a big event?</Link>}
        </div>
      </div>
    </section>
  );
}

function EnquiryForm({ state, setState, payload }: { state: string; setState: (s: "idle" | "form" | "busy" | "done" | "error") => void; payload: Record<string, unknown> }) {
  if (state === "done") return <p className="mt-6 rounded-2xl bg-blush/60 p-5 text-midnight" role="status">Got it. We&rsquo;ll call or WhatsApp you within one working day with pricing and timelines.</p>;
  return (
    <form className="mt-6 grid gap-4 rounded-2xl border border-midnight/10 p-5 sm:grid-cols-2" onSubmit={async (e) => {
      e.preventDefault();
      setState("busy");
      const f = Object.fromEntries(new FormData(e.currentTarget));
      const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, ...f }) });
      setState(res.ok ? "done" : "error");
    }}>
      <div><label className="label" htmlFor="eq-name">Name</label><input id="eq-name" name="name" required className="field" /></div>
      <div><label className="label" htmlFor="eq-phone">Phone or WhatsApp</label><input id="eq-phone" name="phone" required pattern="[0-9+ ]{10,15}" className="field" /></div>
      <div><label className="label" htmlFor="eq-city">Delivery city</label><input id="eq-city" name="city" className="field" /></div>
      <div><label className="label" htmlFor="eq-date">Needed by</label><input id="eq-date" name="deliveryDate" type="date" className="field" /></div>
      {state === "error" && <p className="text-sm text-rose sm:col-span-2" role="alert">That didn&rsquo;t go through. Check your phone number and try again.</p>}
      <button className="btn-wine sm:col-span-2 sm:justify-self-start" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}
