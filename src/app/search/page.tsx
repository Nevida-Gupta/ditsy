import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { one, type SP } from "@/lib/params";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function Search({ searchParams }: { searchParams: SP }) {
  const raw = one(searchParams.q) ?? "";
  const q = raw.replace(/under\s*(\d+)/i, "").trim();
  const under = raw.match(/under\s*(\d+)/i)?.[1];
  const results = raw ? await getProducts({ q: q || undefined, max: under ? Number(under) : undefined }) : [];
  return (
    <section className="wrap py-16">
      <form action="/search" className="max-w-2xl">
        <label htmlFor="q" className="label">Search Ditsy</label>
        <input id="q" name="q" defaultValue={raw} className="w-full border-b border-midnight/30 bg-transparent pb-2 font-display text-4xl text-midnight focus:border-midnight focus:outline-none" />
      </form>
      {raw && <p className="mt-6 text-ink/60">{results.length} {results.length === 1 ? "result" : "results"} for “{raw}”</p>}
      <div className="mt-10">
        {results.length ? <ProductGrid products={results} /> : raw ? (
          <div className="py-10">
            <p className="font-display text-3xl text-midnight">Nothing by that name yet</p>
            <p className="mt-2 text-ink/60">Try a simpler word like “jhumka”, “pearl” or “hamper”, or <Link href="/about#contact" className="link">get in touch</Link> and we&rsquo;ll help you find it.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
