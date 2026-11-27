export type Vertical = "jewellery" | "gifting";

export type Finish = "gold" | "antique" | "silver" | "oxidised" | "rosegold";

export type ArtKind =
  | "jhumka" | "chandbali" | "stud" | "hoop" | "drop" | "necklace" | "choker"
  | "tikka" | "mathapatti" | "passa" | "nath" | "bangles" | "kada" | "haathphool"
  | "anklet" | "bracelet" | "hairpin"
  | "box" | "hamper" | "candle" | "pouch" | "mug" | "diary" | "plant" | "frame"
  | "chocolate" | "trinket" | "card";

/** How a product is drawn when no photography exists yet. Replace by adding `images`. */
export interface ProductArt {
  kind: ArtKind;
  finish?: Finish;
  /** stone / accent colour, hex */
  stone?: string;
  /** background ground colour, hex */
  ground?: string;
}

export interface Variant {
  id: string;
  label: string;
  priceDelta?: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  vertical: Vertical;
  category: string; // category slug
  price: number; // INR, inclusive of GST
  compareAt?: number;
  short: string;
  description: string;
  details: string[];
  variants?: Variant[];
  stock: number;
  tags: string[];
  occasions: string[]; // occasion slugs
  collections: string[]; // collection slugs
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  bestseller?: boolean;
  art: ProductArt;
  /** Real photography. When present it replaces the illustration. */
  images?: string[];
  /** "procedural:jhumka" | "procedural:chandbali" | "procedural:bangle" | "/models/file.glb" */
  model3d?: string;
  /** Gifting items that can go inside Build Your Own Gift Box */
  boxable?: boolean;
  /** slugs of pieces that style together */
  pairsWith?: string[];
}

export interface Category {
  slug: string;
  name: string;
  vertical: Vertical;
  group: string;
  blurb: string;
  art: ProductArt;
}

export interface Collection {
  slug: string;
  name: string;
  vertical: Vertical;
  line: string;
  story: string;
  /** visual theme for merchandising banners */
  tone: { bg: string; fg: string; accent: string };
  art: ProductArt[];
}

export interface Bundle {
  slug: string;
  name: string;
  vertical: Vertical;
  line: string;
  productSlugs: string[];
  price: number;
}

export interface Occasion {
  slug: string;
  name: string;
  line: string;
  story: string;
  tone: string;
  art: ProductArt;
}

export interface ReturnGiftCombo {
  slug: string;
  name: string;
  tier: "under-199" | "199-399" | "399-699" | "premium";
  pricePerPerson: number;
  minQty: number;
  includes: string[];
  occasions: string[];
  art: ProductArt;
}

export interface Review {
  productSlug: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
}

export interface BoxOption {
  id: string;
  name: string;
  price: number;
  capacity: number;
  color: string;
  lid: string;
  note: string;
}

export interface RibbonOption {
  id: string;
  name: string;
  color: string;
  price: number;
}

export interface CardOption {
  id: string;
  name: string;
  price: number;
  color: string;
}

export interface GiftBoxConfig {
  occasion: string;
  boxId: string;
  itemIds: string[];
  ribbonId: string;
  cardId: string;
  message: string;
}
