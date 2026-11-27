"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductArt } from "@/components/art/ProductArt";
import { inr, cx } from "@/lib/format";

const RIBBONS = [{ n: "Wine", c: "#1E3A4F" }, { n: "Blush", c: "#E7B9B0" }, { n: "Gold", c: "#C9A55E" }];

/** A small, working taste of the builder on the homepage. */
export function GiftBoxTeaser({ items, boxPrice }: { items: Product[]; boxPrice: number }) {
  const [picked, setPicked] = useState<string[]>(items.slice(0, 2).map((i) => i.id));
  const [ribbon, setRibbon] = useState(RIBBONS[0]);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= 3 ? p : [...p, id]));
  const chosen = items.filter((i) => picked.includes(i.id));
  const total = boxPrice + chosen.reduce((s, i) => s + i.price, 0);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        {/* open box, top-down */}
        <div className="absolute inset-[8%] rounded-[28px] bg-midnight shadow-[inset_0_0_0_14px_#1E3A4F,0_40px_80px_-40px_rgba(9,21,33,0.6)]" />
        <div className="absolute inset-[13%] grid grid-cols-2 grid-rows-2 gap-3 p-3">
          <AnimatePresence>
            {chosen.map((i) => (
              <motion.div key={i.id} layout initial={{ scale: 0.6, opacity: 0, y: -30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="overflow-hidden rounded-2xl bg-pearl">
                <ProductArt art={i.art} className="h-full w-full" title={i.name} />
              </motion.div>
            ))}
          </AnimatePresence>
          {chosen.length === 0 && <p className="col-span-2 row-span-2 grid place-items-center text-center text-pearl/70">Pick a few things to fill your box</p>}
        </div>
        {/* ribbon */}
        <motion.div animate={{ backgroundColor: ribbon.c }} className="absolute inset-y-[8%] left-1/2 w-5 -translate-x-1/2 opacity-90" />
        <motion.div animate={{ backgroundColor: ribbon.c }} className="absolute inset-x-[8%] top-1/2 h-5 -translate-y-1/2 opacity-90" />
        <motion.div animate={{ backgroundColor: ribbon.c }} className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-lg shadow-lg" />
      </div>

      <div>
        <h2 className="display-l text-midnight">Build a box that feels like them</h2>
        <p className="lede mt-4">Choose up to three things here to see how it comes together. The full builder has more boxes, more pieces, cards and a handwritten note.</p>
        <fieldset className="mt-8">
          <legend className="mb-3 text-sm text-ink/60">Fill the box</legend>
          <div className="flex flex-wrap gap-2">
            {items.map((i) => (
              <button key={i.id} onClick={() => toggle(i.id)} aria-pressed={picked.includes(i.id)}
                className={cx("flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-[14px] transition", picked.includes(i.id) ? "border-midnight bg-midnight text-pearl" : "border-midnight/20 hover:border-midnight/50")}>
                <span className="h-8 w-8 overflow-hidden rounded-full"><ProductArt art={i.art} title={i.name} sizes="64px" className="h-full w-full" /></span>
                {i.name.replace(/ \(.+\)/, "")}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <legend className="mb-3 text-sm text-ink/60">Ribbon</legend>
          <div className="flex gap-3">
            {RIBBONS.map((r) => (
              <button key={r.n} onClick={() => setRibbon(r)} aria-pressed={ribbon.n === r.n} aria-label={`${r.n} ribbon`}
                className={cx("h-9 w-9 rounded-full ring-offset-2 ring-offset-pearl transition", ribbon.n === r.n ? "ring-2 ring-midnight" : "ring-1 ring-midnight/15")} style={{ background: r.c }} />
            ))}
          </div>
        </fieldset>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <p className="font-display text-3xl text-midnight" aria-live="polite">{inr(total)}</p>
          <Link href={`/build-your-box?items=${picked.join(",")}`} className="btn-wine">Continue in the builder</Link>
        </div>
      </div>
    </div>
  );
}
