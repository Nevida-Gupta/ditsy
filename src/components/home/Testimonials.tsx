"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Testimonials({ items }: { items: { quote: string; name: string; city: string; context: string }[] }) {
  const [i, setI] = useState(0);
  const t = items[i];
  return (
    <section className="bg-sand/60 py-24 md:py-32">
      <div className="wrap max-w-5xl text-center">
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }}>
            <blockquote className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[1.2] text-midnight">“{t.quote}”</blockquote>
            <figcaption className="mt-6 text-[15px] text-ink/60">{t.name}, {t.city}. {t.context}</figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Customer stories">
          {items.map((_, k) => (
            <button key={k} role="tab" aria-selected={k === i} aria-label={`Story ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-midnight" : "w-2 bg-midnight/25"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
