import type { MetadataRoute } from "next";
import { getAllProductsSync, getCollections, getOccasions } from "@/lib/catalog";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const statics = ["", "/jewellery", "/gifting", "/gifting/return-gifts", "/build-your-box", "/bulk-gifting", "/occasions", "/bundles", "/about", "/policies/shipping", "/policies/returns", "/policies/care"];
  const [cols, occ] = await Promise.all([getCollections(), getOccasions()]);
  return [
    ...statics.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...cols.map((c) => ({ url: `${site.url}/collections/${c.slug}`, lastModified: now, priority: 0.7 })),
    ...occ.map((o) => ({ url: `${site.url}/occasions/${o.slug}`, lastModified: now, priority: 0.6 })),
    ...getAllProductsSync().filter((p) => !p.tags.includes("box-only")).map((p) => ({ url: `${site.url}/product/${p.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
