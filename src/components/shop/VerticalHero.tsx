import Image from "next/image";
import Link from "next/link";
import type { LifestyleImage } from "@/data/imagery";
import { SubBrand } from "@/components/ui/SubBrand";
import { cx } from "@/lib/format";

/** Full-bleed photographic hero for each vertical, in that vertical's colour world. */
export function VerticalHero({
  name, img, title, body, ctas, world,
}: {
  name: "Jewellery" | "Gifting";
  img: LifestyleImage;
  title: string;
  body: string;
  ctas: { label: string; href: string }[];
  world: "peacock" | "blush";
}) {
  const dark = world === "peacock";
  return (
    <section className={cx("relative isolate overflow-hidden", dark ? "bg-peacock-deep text-pearl" : "bg-blush text-midnight")}>
      <div className="grid md:min-h-[78vh] md:grid-cols-2">
        <div className="wrap order-2 flex flex-col justify-center py-14 md:order-1 md:py-20 md:pr-16">
          <SubBrand name={name} tone={dark ? "light" : "dark"} />
          <h1 className="display-l mt-8 max-w-[14ch]">{title}</h1>
          <p className={cx("mt-5 max-w-[48ch] text-[17px] leading-relaxed", dark ? "text-pearl/80" : "text-midnight/75")}>{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {ctas.map((c, i) => (
              <Link key={c.href} href={c.href} className={i === 0 ? (dark ? "btn-pearl" : "btn-wine") : cx("btn border", dark ? "border-pearl/40 text-pearl hover:bg-pearl/10" : "border-midnight/30 text-midnight hover:bg-midnight hover:text-pearl")}>{c.label}</Link>
            ))}
          </div>
        </div>
        <div className="relative order-1 min-h-[52vh] md:order-2 md:min-h-0">
          <Image src={img.src} alt={img.alt} fill priority quality={90} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: img.focus }} />
        </div>
      </div>
    </section>
  );
}
