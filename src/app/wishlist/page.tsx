import type { Metadata } from "next";
import { getAllProductsSync } from "@/lib/catalog";
import { WishlistView } from "./WishlistView";
export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };
export default function Wishlist() {
  return <WishlistView products={getAllProductsSync()} />;
}
