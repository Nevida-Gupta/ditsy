/**
 * Catalogue repository. All pages read products through these functions.
 * Today they read the seed in src/data/catalog.ts; to move to a database or CMS,
 * re-implement these functions (they are already async) and nothing else changes.
 */
import * as seed from "@/data/catalog";
import type { Product, Vertical } from "./types";

const visible = (p: Product) => !p.tags.includes("box-only");

export async function getProducts(opts: {
  vertical?: Vertical;
  category?: string;
  group?: string;
  collection?: string;
  occasion?: string;
  q?: string;
  min?: number;
  max?: number;
  finish?: string;
  sort?: string;
} = {}): Promise<Product[]> {
  let list = seed.products.filter(visible);
  if (opts.vertical) list = list.filter((p) => p.vertical === opts.vertical);
  if (opts.group) {
    const inGroup = new Set(seed.categories.filter((c) => c.group === opts.group).map((c) => c.slug));
    list = list.filter((p) => inGroup.has(p.category));
  }
  if (opts.category) list = list.filter((p) => p.category === opts.category);
  if (opts.collection) list = list.filter((p) => p.collections.includes(opts.collection!));
  if (opts.occasion) list = list.filter((p) => p.occasions.includes(opts.occasion!));
  if (opts.finish) list = list.filter((p) => p.art.finish === opts.finish);
  if (opts.min != null) list = list.filter((p) => p.price >= opts.min!);
  if (opts.max != null) list = list.filter((p) => p.price <= opts.max!);
  if (opts.q) {
    const terms = opts.q.toLowerCase().split(/\s+/).filter(Boolean);
    list = list.filter((p) => {
      const hay = [p.name, p.short, p.category, ...p.tags, ...p.occasions].join(" ").toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }
  switch (opts.sort) {
    case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
    case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
    case "new": list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
    case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
    default: list = [...list].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
  }
  return list;
}

export async function getProduct(slug: string) {
  return seed.products.find((p) => p.slug === slug) ?? null;
}
export async function getProductsBySlugs(slugs: string[]) {
  return slugs.map((s) => seed.products.find((p) => p.slug === s)).filter(Boolean) as Product[];
}
export async function getBoxableProducts() {
  return seed.products.filter((p) => p.boxable);
}
export function getAllProductsSync() {
  return seed.products;
}

export async function getCategories(vertical?: Vertical) {
  return seed.categories.filter((c) => !vertical || c.vertical === vertical);
}
export async function getCategory(slug: string) {
  return seed.categories.find((c) => c.slug === slug) ?? null;
}
export async function getCollections(vertical?: Vertical) {
  return seed.collections.filter((c) => !vertical || c.vertical === vertical);
}
export async function getCollection(slug: string) {
  return seed.collections.find((c) => c.slug === slug) ?? null;
}
export async function getBundles(vertical?: Vertical) {
  return seed.bundles.filter((b) => !vertical || b.vertical === vertical);
}
export async function getBundle(slug: string) {
  return seed.bundles.find((b) => b.slug === slug) ?? null;
}
export async function getBundlesForProduct(slug: string) {
  return seed.bundles.filter((b) => b.productSlugs.includes(slug));
}
export async function getOccasions() {
  return seed.occasions;
}
export async function getOccasion(slug: string) {
  return seed.occasions.find((o) => o.slug === slug) ?? null;
}
export async function getReturnGifts(occasion?: string, tier?: string) {
  return seed.returnGifts.filter(
    (r) => (!occasion || r.occasions.includes(occasion)) && (!tier || r.tier === tier),
  );
}
export async function getReviews(productSlug?: string) {
  return seed.reviews.filter((r) => !productSlug || r.productSlug === productSlug);
}
export const builderOptions = {
  boxes: seed.boxOptions,
  ribbons: seed.ribbonOptions,
  cards: seed.cardOptions,
  occasions: seed.giftBoxOccasions,
};
export const returnGiftMeta = { occasions: seed.returnGiftOccasions, tiers: seed.returnGiftTiers };
export const testimonials = seed.testimonials;
