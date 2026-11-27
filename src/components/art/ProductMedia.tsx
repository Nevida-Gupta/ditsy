import Image from "next/image";
import type { Product } from "@/lib/types";
import { ProductArt } from "./ProductArt";

/** Shows real photography when the product has it, the illustration otherwise. */
export function ProductMedia({ product, index = 0, className, sizes = "(max-width: 768px) 50vw, 25vw", priority }: { product: Pick<Product, "name" | "art" | "images">; index?: number; className?: string; sizes?: string; priority?: boolean }) {
  const img = product.images?.[index];
  if (img) {
    return (
      <div className={`relative ${className ?? ""}`}>
        <Image src={img} alt={product.name} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return <ProductArt art={product.art} title={product.name} className={className} />;
}
