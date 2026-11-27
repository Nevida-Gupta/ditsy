import Link from "next/link";
import type { Collection } from "@/lib/types";
import { ProductArt } from "@/components/art/ProductArt";
import { cx } from "@/lib/format";

/** Editorial collection tile: one full-bleed photograph, the collection name set over a soft scrim. */
export function CollectionBanner({ c, size = "md" }: { c: Collection; size?: "md" | "lg" }) {
  const lead = c.art[0];
  return (
    <Link
      href={`/collections/${c.slug}`}
      className={cx("group relative flex flex-col justify-end overflow-hidden rounded-[24px] text-white", size === "lg" ? "min-h-[520px] p-8 md:p-10" : "min-h-[340px] p-6 md:p-7")}
    >
      {lead && (
        <ProductArt
          art={lead}
          title={c.name}
          seed={c.slug}
          sizes={size === "lg" ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
          className="absolute inset-0 h-full w-full transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,26,38,0.82)] via-[rgba(12,26,38,0.25)] to-transparent" />
      <div className="relative">
        <h3 className={cx("font-display", size === "lg" ? "text-4xl md:text-5xl" : "text-3xl")}>{c.name}</h3>
        <p className="mt-1.5 max-w-[42ch] text-[15px] text-white/85">{c.line}</p>
        <span className="mt-4 inline-block border-b border-white/50 pb-0.5 text-sm transition-colors group-hover:border-gold group-hover:text-gold">Shop the edit</span>
      </div>
    </Link>
  );
}
