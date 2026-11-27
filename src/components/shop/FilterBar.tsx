"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cx } from "@/lib/format";

interface Opt { value: string; label: string }

export function FilterBar({ groups, categories, finishes, occasions, count }: { groups?: string[]; categories: (Opt & { group: string })[]; finishes?: Opt[]; occasions: Opt[]; count: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [pending, start] = useTransition();
  const set = (k: string, v?: string) => {
    const n = new URLSearchParams(sp.toString());
    if (v) n.set(k, v); else n.delete(k);
    if (k === "group") n.delete("category");
    start(() => router.replace(`${pathname}?${n.toString()}`, { scroll: false }));
  };
  const group = sp.get("group") ?? "";
  const cat = sp.get("category") ?? "";
  const visibleCats = categories.filter((c) => !group || c.group === group);
  const active = ["category", "finish", "occasion", "price", "group"].filter((k) => sp.get(k));

  return (
    <div className={cx("sticky top-[72px] z-20 -mx-5 border-b border-midnight/10 bg-pearl/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12", pending && "opacity-70")}>
      {groups && groups.length > 1 && (
        <div className="no-scrollbar mb-3 flex gap-5 overflow-x-auto font-display text-xl">
          <button onClick={() => set("group")} className={cx("shrink-0 pb-1", !group ? "border-b border-midnight text-midnight" : "text-ink/45 hover:text-ink")}>Everything</button>
          {groups.map((g) => (
            <button key={g} onClick={() => set("group", g)} className={cx("shrink-0 pb-1", group === g ? "border-b border-midnight text-midnight" : "text-ink/45 hover:text-ink")}>{g}</button>
          ))}
        </div>
      )}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {visibleCats.map((c) => (
          <button key={c.value} onClick={() => set("category", cat === c.value ? undefined : c.value)} aria-pressed={cat === c.value}
            className={cx("shrink-0 rounded-full border px-3.5 py-1.5 text-[13.5px] transition", cat === c.value ? "border-midnight bg-midnight text-pearl" : "border-midnight/15 hover:border-midnight/40")}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-[14px]">
        {finishes && (
          <select aria-label="Finish" value={sp.get("finish") ?? ""} onChange={(e) => set("finish", e.target.value || undefined)} className="rounded-full border border-midnight/15 bg-transparent px-3 py-1.5">
            <option value="">Any finish</option>
            {finishes.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        )}
        <select aria-label="Occasion" value={sp.get("occasion") ?? ""} onChange={(e) => set("occasion", e.target.value || undefined)} className="rounded-full border border-midnight/15 bg-transparent px-3 py-1.5">
          <option value="">Any occasion</option>
          {occasions.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
        <select aria-label="Price" value={sp.get("price") ?? ""} onChange={(e) => set("price", e.target.value || undefined)} className="rounded-full border border-midnight/15 bg-transparent px-3 py-1.5">
          <option value="">Any price</option>
          <option value="0-499">Under ₹499</option>
          <option value="0-999">Under ₹999</option>
          <option value="1000-2499">₹1,000–₹2,499</option>
          <option value="2500-100000">₹2,500 and above</option>
        </select>
        <select aria-label="Sort" value={sp.get("sort") ?? ""} onChange={(e) => set("sort", e.target.value || undefined)} className="rounded-full border border-midnight/15 bg-transparent px-3 py-1.5">
          <option value="">Most loved</option>
          <option value="new">Newest</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
          <option value="rating">Highest rated</option>
        </select>
        <span className="ml-auto text-ink/50" aria-live="polite">{count} {count === 1 ? "piece" : "pieces"}</span>
        {active.length > 0 && <button onClick={() => start(() => router.replace(pathname, { scroll: false }))} className="link text-midnight">Clear filters</button>}
      </div>
    </div>
  );
}
