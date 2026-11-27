import Image from "next/image";
import Link from "next/link";
import { imagery, type LifestyleImage } from "@/data/imagery";
import { SubBrand } from "@/components/ui/SubBrand";
import { cx } from "@/lib/format";

type Entry = { label: string; href: string; img: LifestyleImage };

function House({
  name, promise, line, img, entries, cta, world,
}: { name: "Jewellery" | "Gifting"; promise: string; line: string; img: LifestyleImage; entries: Entry[]; cta: { label: string; href: string }; world: "peacock" | "blush" }) {
  const dark = world === "peacock";
  return (
    <div className={cx("flex flex-col", dark ? "bg-peacock-deep text-pearl" : "bg-blush text-midnight")}>
      <Link href={cta.href} className="group relative block aspect-[4/3] overflow-hidden md:aspect-[5/4]">
        <Image src={img.src} alt={img.alt} fill quality={90} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.03]" style={{ objectPosition: img.focus }} />
      </Link>
      <div className="flex flex-1 flex-col px-6 py-10 sm:px-10 md:px-12 lg:px-16 lg:py-14">
        <SubBrand name={name} tone={dark ? "light" : "dark"} />
        <p className="mt-7 font-display text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.1]">{promise}</p>
        <p className={cx("mt-3 max-w-[46ch] text-[16px] leading-relaxed", dark ? "text-pearl/75" : "text-midnight/75")}>{line}</p>
        <ul className="mt-8 grid grid-cols-3 gap-3">
          {entries.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="group block">
                <span className="relative block aspect-square overflow-hidden rounded-2xl">
                  <Image src={e.img.src} alt="" fill sizes="(max-width: 768px) 30vw, 14vw" quality={85} className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: e.img.focus }} />
                </span>
                <span className="mt-2 block text-[14px] group-hover:underline">{e.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={cta.href} className={cx("mt-9 self-start", dark ? "btn-pearl" : "btn-wine")}>{cta.label}</Link>
      </div>
    </div>
  );
}

/** The two houses of Ditsy, side by side: each with its own colour world, promise and ways in. */
export function VerticalPanels() {
  return (
    <section aria-label="Shop Ditsy Jewellery or Ditsy Gifting">
      <div className="grid md:grid-cols-2">
        <House
          name="Jewellery"
          world="peacock"
          promise="For you, for every function."
          line="Jhumkas that sway, sets that photograph like heirlooms, and everyday pieces you forget to take off."
          img={imagery.noseRing}
          entries={[
            { label: "Earrings", href: "/jewellery?group=Earrings", img: imagery.jhumkaRows },
            { label: "Bridal & sets", href: "/jewellery?group=Jewellery%20sets", img: imagery.necklaceOnRed },
            { label: "Bangles & more", href: "/jewellery?group=Ornaments", img: imagery.mehendiHands },
          ]}
          cta={{ label: "Enter Ditsy Jewellery", href: "/jewellery" }}
        />
        <House
          name="Gifting"
          world="blush"
          promise="For them, from you."
          line="Hampers, keepsakes and return gifts, chosen and wrapped so it feels like you took the whole afternoon."
          img={imagery.exchangingGifts}
          entries={[
            { label: "Build a box", href: "/build-your-box", img: imagery.tyingRibbon },
            { label: "Return gifts", href: "/gifting/return-gifts", img: imagery.giftBoxes },
            { label: "Bulk & corporate", href: "/bulk-gifting", img: imagery.candle },
          ]}
          cta={{ label: "Enter Ditsy Gifting", href: "/gifting" }}
        />
      </div>
      <p className="bg-midnight px-6 py-4 text-center text-[15px] text-champagne">
        The two go together: every jewellery order arrives with a small gift from Ditsy Gifting.
      </p>
    </section>
  );
}
