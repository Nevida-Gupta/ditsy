"use client";
import { useEffect, useRef, useState } from "react";

/** A soft ring that follows fine pointers and grows over elements marked data-cursor. Off for touch and reduced motion. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setOn(true);
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (ref.current) {
        ref.current.dataset.big = t ? "1" : "";
        ref.current.dataset.label = t?.dataset.cursor || "";
      }
    };
    const tick = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  if (!on) return null;
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference [&[data-big='1']>span]:h-20 [&[data-big='1']>span]:w-20 [&[data-big='1']>span]:bg-pearl [&[data-big='1']>span]:after:opacity-100">
      <span className="absolute -translate-x-1/2 -translate-y-1/2 block h-7 w-7 rounded-full border border-pearl transition-[width,height,background-color] duration-300 ease-silk" />
    </div>
  );
}
