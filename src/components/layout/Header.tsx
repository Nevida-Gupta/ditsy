"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Category, Collection, Occasion } from "@/lib/types";
import { Wordmark } from "@/components/ui/Wordmark";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";
import { ProductArt } from "@/components/art/ProductArt";
import { useShop } from "@/store/shop";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { cx } from "@/lib/format";

const announcements = [
  "Free shipping across India on orders above ₹999",
  "Every jewellery order comes with a little surprise gift",
  "Return gifts for 25 to 2,500 guests. Ask us on WhatsApp",
];

interface MenuData {
  jewelleryCats: Category[];
  giftingCats: Category[];
  jewelleryCols: Collection[];
  giftingCols: Collection[];
  occasions: Occasion[];
}

type MenuKey = "jewellery" | "gifting" | "occasion" | null;

export function Header({ menu }: { menu: MenuData }) {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [ann, setAnn] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const hydrated = useHydrated();
  const count = useShop((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const wishCount = useShop((s) => s.wishlist.length);
  const openBag = useShop((s) => s.openBag);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const onDark = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const t = setInterval(() => setAnn((a) => (a + 1) % announcements.length), 5000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    setOpen(null);
    setMobile(false);
    setSearch(false);
  }, [pathname]);
  useEffect(() => {
    const f = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(null), setSearch(false), setMobile(false));
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, []);

  const enter = (k: MenuKey) => {
    clearTimeout(closeTimer.current);
    setOpen(k);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const navItem = (label: string, href: string, key?: MenuKey) => (
    <li onMouseEnter={() => (key ? enter(key) : setOpen(null))} onMouseLeave={key ? leave : undefined} className="relative">
      <Link
        href={href}
        className={cx("relative py-2 text-[14.5px] tracking-wide transition-opacity hover:opacity-100", pathname.startsWith(href) && href !== "/" ? "opacity-100" : "opacity-80")}
        aria-expanded={key ? open === key : undefined}
        onFocus={() => key && enter(key)}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <>
      <div className="relative z-50 bg-midnight-deep text-champagne">
        <div className="wrap flex h-9 items-center justify-center overflow-hidden text-[13px] tracking-wide">
          <AnimatePresence mode="wait">
            <motion.p key={ann} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.4 }}>
              {announcements[ann]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <header
        className={cx(
          "sticky top-0 z-40 transition-colors duration-500",
          onDark ? "bg-transparent text-pearl" : "bg-pearl/90 text-midnight backdrop-blur-md",
          scrolled && !onDark && "shadow-[0_1px_0_rgba(14,31,46,0.08)]",
        )}
        onMouseLeave={leave}
      >
        <div className="wrap grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setMobile(true)} aria-label="Open menu">
              <MenuIcon />
            </button>
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {navItem("Jewellery", "/jewellery", "jewellery")}
                {navItem("Gifting", "/gifting", "gifting")}
                {navItem("Shop by occasion", "/occasions", "occasion")}
              </ul>
            </nav>
          </div>

          <Link href="/" className="text-[38px] sm:text-[42px]" aria-label="Ditsy home">
            <Wordmark jewel={onDark ? "#E9DDC4" : "#C29B57"} />
          </Link>

          <div className="flex items-center justify-end gap-5">
            <nav aria-label="Secondary" className="hidden xl:block">
              <ul className="flex items-center gap-7">
                {navItem("Build your gift box", "/build-your-box")}
                {navItem("Bulk gifting", "/bulk-gifting")}
                {navItem("About", "/about")}
              </ul>
            </nav>
            <button onClick={() => setSearch(true)} aria-label="Search">
              <SearchIcon />
            </button>
            <Link href="/account" aria-label="Account" className="hidden sm:block">
              <UserIcon />
            </Link>
            <Link href="/wishlist" aria-label={`Wishlist, ${wishCount} items`} className="relative hidden sm:block">
              <HeartIcon />
              {hydrated && wishCount > 0 && <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[10px] text-white">{wishCount}</span>}
            </Link>
            <button onClick={() => openBag(true)} aria-label={`Shopping bag, ${count} items`} className="relative">
              <BagIcon />
              {hydrated && count > 0 && <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] text-white">{count}</span>}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 top-full hidden border-t border-midnight/10 bg-pearl text-ink shadow-[0_30px_60px_-30px_rgba(9,21,33,0.35)] lg:block"
              onMouseEnter={() => enter(open)}
              onMouseLeave={leave}
            >
              {open === "jewellery" && <Mega cats={menu.jewelleryCats} cols={menu.jewelleryCols} base="/jewellery" feature={{ title: "The jhumka edit", href: "/collections/jhumka-edit", art: { kind: "jhumka", finish: "antique", stone: "#9B1B30", ground: "#0E1F2E" } }} />}
              {open === "gifting" && <Mega cats={menu.giftingCats} cols={menu.giftingCols} base="/gifting" extra={[{ name: "Return gifts", href: "/gifting/return-gifts" }, { name: "Build your gift box", href: "/build-your-box" }, { name: "Bulk & corporate", href: "/bulk-gifting" }]} feature={{ title: "Build your own box", href: "/build-your-box", art: { kind: "box", stone: "#C7787E", ground: "#F5DFD9" } }} />}
              {open === "occasion" && (
                <div className="wrap grid grid-cols-5 gap-4 py-8">
                  {menu.occasions.map((o) => (
                    <Link key={o.slug} href={`/occasions/${o.slug}`} className="group flex items-center gap-3 rounded-2xl p-2 hover:bg-sand/60">
                      <span className="h-14 w-12 overflow-hidden rounded-lg">
                        <ProductArt art={{ ...o.art, ground: o.tone }} className="h-full w-full" />
                      </span>
                      <span>
                        <span className="block font-display text-lg">{o.name}</span>
                        <span className="block text-[13px] text-ink/55">{o.line}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search overlay */}
      <AnimatePresence>{search && <SearchOverlay onClose={() => setSearch(false)} />}</AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/40" onClick={() => setMobile(false)} />
            <motion.nav
              aria-label="Mobile"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 0.8, 0.2, 1] }}
              className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-pearl p-6 text-midnight"
            >
              <div className="mb-6 flex items-center justify-between">
                <Wordmark className="text-4xl" />
                <button onClick={() => setMobile(false)} aria-label="Close menu"><CloseIcon /></button>
              </div>
              <MobileGroup title="Jewellery" href="/jewellery" items={menu.jewelleryCats.map((c) => ({ name: c.name, href: `/jewellery?category=${c.slug}` }))} />
              <MobileGroup title="Gifting" href="/gifting" items={[{ name: "Return gifts", href: "/gifting/return-gifts" }, ...menu.giftingCols.map((c) => ({ name: c.name, href: `/collections/${c.slug}` }))]} />
              <MobileGroup title="Shop by occasion" href="/occasions" items={menu.occasions.map((o) => ({ name: o.name, href: `/occasions/${o.slug}` }))} />
              {[
                ["Build your gift box", "/build-your-box"],
                ["Bulk gifting", "/bulk-gifting"],
                ["About Ditsy", "/about"],
                ["Wishlist", "/wishlist"],
                ["Track an order", "/account"],
              ].map(([n, h]) => (
                <Link key={h} href={h} className="border-b border-midnight/10 py-4 font-display text-2xl">{n}</Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Mega({ cats, cols, base, feature, extra }: { cats: Category[]; cols: Collection[]; base: string; feature: { title: string; href: string; art: Parameters<typeof ProductArt>[0]["art"] }; extra?: { name: string; href: string }[] }) {
  const groups = Array.from(new Set(cats.map((c) => c.group)));
  return (
    <div className="wrap grid grid-cols-[1fr_1fr_1fr_1.1fr] gap-10 py-9">
      {groups.map((g) => (
        <div key={g}>
          <p className="mb-3 font-display text-xl text-midnight">{g}</p>
          <ul className="space-y-1.5">
            {cats.filter((c) => c.group === g).map((c) => (
              <li key={c.slug}><Link href={`${base}?category=${c.slug}`} className="text-[14.5px] text-ink/75 hover:text-midnight">{c.name}</Link></li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <p className="mb-3 font-display text-xl text-midnight">Edits</p>
        <ul className="space-y-1.5">
          {extra?.map((e) => (<li key={e.href}><Link href={e.href} className="text-[14.5px] font-medium text-midnight hover:underline">{e.name}</Link></li>))}
          {cols.slice(0, extra ? 8 : 10).map((c) => (<li key={c.slug}><Link href={`/collections/${c.slug}`} className="text-[14.5px] text-ink/75 hover:text-midnight">{c.name}</Link></li>))}
        </ul>
      </div>
      <Link href={feature.href} className="group relative overflow-hidden rounded-[28px]">
        <ProductArt art={feature.art} className="h-full max-h-[300px] w-full transition-transform duration-700 ease-silk group-hover:scale-105" />
        <span className="absolute bottom-4 left-5 rounded-full bg-pearl/90 px-4 py-2 font-display text-lg text-midnight">{feature.title}</span>
      </Link>
    </div>
  );
}

function MobileGroup({ title, href, items }: { title: string; href: string; items: { name: string; href: string }[] }) {
  const [o, setO] = useState(false);
  return (
    <div className="border-b border-midnight/10">
      <button className="flex w-full items-center justify-between py-4 font-display text-2xl" onClick={() => setO(!o)} aria-expanded={o}>
        {title}
        <span className={cx("text-xl transition-transform", o && "rotate-45")}>+</span>
      </button>
      {o && (
        <ul className="pb-4">
          <li><Link href={href} className="block py-1.5 font-medium">View all</Link></li>
          {items.map((i) => (<li key={i.href}><Link href={i.href} className="block py-1.5 text-ink/75">{i.name}</Link></li>))}
        </ul>
      )}
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const suggestions = ["jhumka", "bridal set", "return gifts", "pearl", "haldi", "hamper", "under 999"];
  const go = (term: string) => {
    if (!term.trim()) return;
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    onClose();
  };
  return (
    <motion.div className="fixed inset-0 z-[70] bg-midnight/95 text-pearl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-label="Search">
      <div className="wrap pt-10">
        <div className="flex justify-end"><button onClick={onClose} aria-label="Close search"><CloseIcon className="h-8 w-8" /></button></div>
        <form onSubmit={(e) => { e.preventDefault(); go(q); }} className="mx-auto mt-12 max-w-3xl">
          <label htmlFor="site-search" className="mb-4 block text-champagne/80">What are you looking for?</label>
          <input id="site-search" ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Jhumkas, hampers, wedding…" className="w-full border-b border-champagne/40 bg-transparent pb-3 font-display text-4xl placeholder:text-pearl/30 focus:border-champagne focus:outline-none sm:text-6xl" />
          <div className="mt-8 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button type="button" key={s} onClick={() => go(s)} className="rounded-full border border-champagne/30 px-4 py-2 text-sm hover:bg-champagne hover:text-midnight">{s}</button>
            ))}
          </div>
        </form>
      </div>
    </motion.div>
  );
}
