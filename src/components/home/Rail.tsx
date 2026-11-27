import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/ProductCard";

/** Horizontal, swipeable product row with scroll snapping. */
export function Rail({ products, dark }: { products: Product[]; dark?: boolean }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:gap-6 lg:px-12">
      {products.map((p) => (
        <div key={p.id} className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[23%]">
          <ProductCard product={p} tone={dark ? "dark" : "light"} />
        </div>
      ))}
    </div>
  );
}
