import { cx } from "@/lib/format";

/** "ditsy" with a small jewel for the dot of the i. */
export function Wordmark({ className, jewel = "#C29B57" }: { className?: string; jewel?: string }) {
  return (
    <span className={cx("relative inline-block font-display italic leading-none tracking-[-0.02em]", className)} aria-label="Ditsy">
      <span aria-hidden>d</span>
      <span aria-hidden className="relative inline-block">
        ı
        <svg viewBox="0 0 10 10" className="absolute left-1/2 top-[0.02em] h-[0.2em] w-[0.2em] -translate-x-[35%]" aria-hidden>
          <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={jewel} />
        </svg>
      </span>
      <span aria-hidden>tsy</span>
    </span>
  );
}
