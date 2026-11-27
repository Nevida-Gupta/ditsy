"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "@/data/imagery";
import { cx } from "@/lib/format";

const DURATION = 7; // seconds per slide

/**
 * Editorial photo hero. The tagline is told as three photographs: Wear it. Give it. Keep it.
 * Slow cross-fade with the photo settling into place, a progress line per slide, pause on hover/focus,
 * swipe on touch, arrow keys, and no autoplay or zoom for people who prefer reduced motion.
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = heroSlides.length;

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const f = () => setReduced(m.matches);
    m.addEventListener("change", f);
    const vis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => { m.removeEventListener("change", f); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);
  const slide = heroSlides[active];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Ditsy: wear it, give it, keep it"
      className="relative isolate -mt-[72px] flex min-h-[100svh] flex-col overflow-hidden bg-midnight-deep text-pearl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(active + 1); if (e.key === "ArrowLeft") go(active - 1); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Photographs: all mounted so the next one is already loaded when it fades in */}
      <div className="absolute inset-0 -z-10">
        {heroSlides.map((s, i) => (
          <div
            key={s.word}
            aria-hidden={i !== active}
            className={cx("absolute inset-0 transition-opacity duration-[1400ms] ease-silk", i === active ? "opacity-100" : "opacity-0")}
          >
            <Image
              src={s.image.src}
              alt={s.image.alt}
              fill
              priority={i === 0}
              quality={90}
              sizes="100vw"
              className={cx(
                "object-cover",
                !reduced && "transition-transform ease-out",
                !reduced && (i === active ? "scale-100 duration-[8000ms]" : "scale-[1.07] duration-[1400ms]"),
              )}
              style={{ objectPosition: s.image.focus }}
            />
          </div>
        ))}
        {/* Midnight wash, heavier where the words sit, so the photo stays the hero */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,21,33,0.88)_0%,rgba(9,21,33,0.45)_38%,rgba(9,21,33,0.05)_70%),linear-gradient(to_right,rgba(9,21,33,0.55),transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgba(9,21,33,0.55)] to-transparent" />
      </div>

      <div className="wrap relative mt-auto pb-8 pt-[45vh] md:pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
            aria-live="polite"
          >
            {active === 0 ? (
              <h1 className="display-xl font-display">{slide.word}</h1>
            ) : (
              <p className="display-xl font-display">{slide.word}</p>
            )}
            <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div>
                <p className="font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug">{slide.title}</p>
                <p className="mt-3 max-w-[46ch] text-[16.5px] leading-relaxed text-pearl/80">{slide.body}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={slide.cta.href} className="btn-pearl">{slide.cta.label}</Link>
                <Link href={slide.alt.href} className="btn border border-pearl/45 text-pearl backdrop-blur-[2px] hover:bg-pearl/10">{slide.alt.label}</Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide tabs double as the tagline */}
        <div role="tablist" aria-label="Choose a slide" className="mt-10 grid grid-cols-3 gap-4 border-t border-pearl/15 pt-4 md:mt-14">
          {heroSlides.map((s, i) => (
            <button
              key={s.word}
              role="tab"
              aria-selected={i === active}
              aria-label={`${s.word} ${s.title}`}
              onClick={() => go(i)}
              className={cx("group text-left focus-visible:outline-none", i === active ? "text-pearl" : "text-pearl/55 hover:text-pearl/85")}
            >
              <span className="relative mb-3 block h-px w-full bg-pearl/20">
                {i === active && (
                  <span
                    key={`${active}-${reduced}`}
                    className="absolute inset-y-0 left-0 bg-champagne"
                    style={reduced ? { width: "100%" } : { animation: `heroProgress ${DURATION}s linear forwards`, animationPlayState: paused ? "paused" : "running" }}
                    onAnimationEnd={() => go(active + 1)}
                  />
                )}
              </span>
              <span className="font-display text-lg md:text-xl group-focus-visible:underline">{s.word}</span>
              <span className="mt-0.5 hidden text-[13.5px] opacity-75 md:block">{s.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
