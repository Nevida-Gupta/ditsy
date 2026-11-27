import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
export function ProductGrid({ products, cols = 4 }: { products: Product[]; cols?: 3 | 4 }) {
  return (
    <div className={cols === 4 ? "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6" : "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6"}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} />)}
    </div>
  );
}
