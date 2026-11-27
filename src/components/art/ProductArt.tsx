import Image from "next/image";
import type { ProductArt as Art } from "@/lib/types";
import { photoFor } from "@/data/photos";
import { cx } from "@/lib/format";

/**
 * Product imagery fallback. Shows a real photograph for the product's type until the product's
 * own photos are added (see src/data/photos.ts). `seed` picks a stable photo; `offset` gives a
 * different photo from the same pool (gallery thumbnails).
 */
export function ProductArt({
  art, className, title, seed, offset = 0, sizes = "(max-width: 768px) 100vw, 50vw", priority,
}: { art: Art; className?: string; title?: string; plain?: boolean; seed?: string; offset?: number; sizes?: string; priority?: boolean }) {
  const src = photoFor(art.kind, seed ?? title ?? `${art.kind}-${art.stone ?? ""}-${art.finish ?? ""}`, offset);
  const sized = /(^|\s)(aspect-|h-|absolute|inset-)/.test(className ?? "");
  return (
    <div className={cx("relative overflow-hidden bg-sand", !sized && "aspect-[4/5]", className)}>
      <Image src={src} alt={title ?? ""} fill sizes={sizes} quality={85} priority={priority} className="object-cover" />
    </div>
  );
}
