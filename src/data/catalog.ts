import type { Product, Category, Collection, Bundle, Occasion, ReturnGiftCombo, Review, BoxOption, RibbonOption, CardOption, ProductArt } from "@/lib/types";

/*
 * Seed catalogue for the prototype.
 * The interface never imports this file directly: everything goes through src/lib/catalog.ts,
 * so swapping this for a database or headless CMS is a change in one place.
 * Prices are INR, GST inclusive.
 */

const S = {
  ruby: "#9B1B30",
  emerald: "#1F5B45",
  pearl: "#F4EEE6",
  kundan: "#F3E6BE",
  pink: "#E39AA3",
  sapphire: "#26386A",
  mint: "#A9D3C1",
  onyx: "#2A2226",
};

export const categories: Category[] = [
  // Earrings
  { slug: "statement-jhumkas", name: "Statement jhumkas", vertical: "jewellery", group: "Earrings", blurb: "Big bells, bigger entrances.", art: { kind: "jhumka", finish: "gold", stone: S.ruby } },
  { slug: "designer-jhumkas", name: "Designer jhumkas", vertical: "jewellery", group: "Earrings", blurb: "The classic, redrawn.", art: { kind: "jhumka", finish: "antique", stone: S.emerald } },
  { slug: "chandbalis", name: "Chandbalis", vertical: "jewellery", group: "Earrings", blurb: "Crescent moons for your ears.", art: { kind: "chandbali", finish: "gold", stone: S.kundan } },
  { slug: "traditional-earrings", name: "Traditional earrings", vertical: "jewellery", group: "Earrings", blurb: "Heirloom shapes, everyday ease.", art: { kind: "drop", finish: "antique", stone: S.ruby } },
  { slug: "contemporary-earrings", name: "Contemporary earrings", vertical: "jewellery", group: "Earrings", blurb: "Clean lines, quiet confidence.", art: { kind: "hoop", finish: "gold" } },
  { slug: "oversized-earrings", name: "Oversized earrings", vertical: "jewellery", group: "Earrings", blurb: "For when subtle isn't the brief.", art: { kind: "chandbali", finish: "antique", stone: S.pink } },
  { slug: "pearl-earrings", name: "Pearl earrings", vertical: "jewellery", group: "Earrings", blurb: "Soft glow, all day.", art: { kind: "drop", finish: "gold", stone: S.pearl } },
  { slug: "oxidised-earrings", name: "Oxidised earrings", vertical: "jewellery", group: "Earrings", blurb: "Silver with a story.", art: { kind: "jhumka", finish: "oxidised", stone: S.onyx } },
  { slug: "minimal-earrings", name: "Minimal earrings", vertical: "jewellery", group: "Earrings", blurb: "Small, and somehow everything.", art: { kind: "stud", finish: "gold", stone: S.pearl } },
  { slug: "party-earrings", name: "Party wear earrings", vertical: "jewellery", group: "Earrings", blurb: "Catch the light, and the room.", art: { kind: "drop", finish: "silver", stone: S.sapphire } },
  // Sets
  { slug: "wedding-sets", name: "Wedding sets", vertical: "jewellery", group: "Jewellery sets", blurb: "Head-to-toe, for the big day.", art: { kind: "necklace", finish: "gold", stone: S.ruby } },
  { slug: "festive-sets", name: "Festive sets", vertical: "jewellery", group: "Jewellery sets", blurb: "Dressed for the diyas.", art: { kind: "choker", finish: "antique", stone: S.emerald } },
  { slug: "statement-necklace-sets", name: "Statement necklace sets", vertical: "jewellery", group: "Jewellery sets", blurb: "One piece, all the talk.", art: { kind: "necklace", finish: "antique", stone: S.emerald } },
  { slug: "temple-sets", name: "Temple sets", vertical: "jewellery", group: "Jewellery sets", blurb: "South Indian grandeur.", art: { kind: "necklace", finish: "antique", stone: S.ruby } },
  { slug: "kundan-sets", name: "Kundan-inspired sets", vertical: "jewellery", group: "Jewellery sets", blurb: "Glass-set radiance.", art: { kind: "choker", finish: "gold", stone: S.kundan } },
  { slug: "pearl-sets", name: "Pearl sets", vertical: "jewellery", group: "Jewellery sets", blurb: "Strands of calm.", art: { kind: "necklace", finish: "gold", stone: S.pearl } },
  { slug: "contemporary-sets", name: "Contemporary sets", vertical: "jewellery", group: "Jewellery sets", blurb: "Modern pairs that match without trying.", art: { kind: "choker", finish: "rosegold" } },
  { slug: "haldi-mehendi", name: "Haldi & mehendi jewellery", vertical: "jewellery", group: "Jewellery sets", blurb: "Floral, featherlight, a little bit cheeky.", art: { kind: "haathphool", finish: "gold", stone: "#E2B33C" } },
  { slug: "party-sets", name: "Party wear sets", vertical: "jewellery", group: "Jewellery sets", blurb: "Cocktail-hour sparkle.", art: { kind: "choker", finish: "silver", stone: S.sapphire } },
  // Ornaments
  { slug: "maang-tikka", name: "Maang tikka", vertical: "jewellery", group: "Ornaments", blurb: "The finishing point.", art: { kind: "tikka", finish: "gold", stone: S.ruby } },
  { slug: "matha-patti", name: "Matha patti", vertical: "jewellery", group: "Ornaments", blurb: "A crown, the desi way.", art: { kind: "mathapatti", finish: "gold", stone: S.kundan } },
  { slug: "passa", name: "Passa", vertical: "jewellery", group: "Ornaments", blurb: "Side drama, done right.", art: { kind: "passa", finish: "antique", stone: S.pearl } },
  { slug: "nath", name: "Nath", vertical: "jewellery", group: "Ornaments", blurb: "Bridal, but make it yours.", art: { kind: "nath", finish: "gold", stone: S.pearl } },
  { slug: "bangles", name: "Bangles", vertical: "jewellery", group: "Ornaments", blurb: "Stack them, swap them.", art: { kind: "bangles", finish: "gold", stone: S.ruby } },
  { slug: "kadas", name: "Kadas", vertical: "jewellery", group: "Ornaments", blurb: "One bold cuff.", art: { kind: "kada", finish: "antique", stone: S.emerald } },
  { slug: "haath-phool", name: "Haath phool", vertical: "jewellery", group: "Ornaments", blurb: "Flowers that hold your hand.", art: { kind: "haathphool", finish: "gold", stone: S.pink } },
  { slug: "anklets", name: "Anklets", vertical: "jewellery", group: "Ornaments", blurb: "A little music with every step.", art: { kind: "anklet", finish: "silver" } },
  { slug: "necklaces", name: "Necklaces", vertical: "jewellery", group: "Ornaments", blurb: "Single pieces to layer or let shine.", art: { kind: "necklace", finish: "rosegold", stone: S.pink } },
  { slug: "bracelets", name: "Bracelets", vertical: "jewellery", group: "Ornaments", blurb: "Easy wrist candy.", art: { kind: "bracelet", finish: "gold", stone: S.pearl } },
  { slug: "hair-accessories", name: "Hair accessories", vertical: "jewellery", group: "Ornaments", blurb: "Pins, combs and a bit of sparkle.", art: { kind: "hairpin", finish: "gold", stone: S.pearl } },
  // Gifting
  { slug: "luxury-hampers", name: "Luxury hampers", vertical: "gifting", group: "Gift types", blurb: "Generous, beautifully packed.", art: { kind: "hamper", stone: S.ruby } },
  { slug: "home-and-candles", name: "Home & candles", vertical: "gifting", group: "Gift types", blurb: "Warmth for the shelf and the soul.", art: { kind: "candle", stone: S.pink } },
  { slug: "keepsakes", name: "Keepsakes", vertical: "gifting", group: "Gift types", blurb: "Small things that stay.", art: { kind: "trinket", stone: S.mint } },
  { slug: "pouches-and-accessories", name: "Pouches & accessories", vertical: "gifting", group: "Gift types", blurb: "Useful, and lovely about it.", art: { kind: "pouch", stone: S.pink } },
  { slug: "stationery", name: "Stationery", vertical: "gifting", group: "Gift types", blurb: "For lists, letters and big plans.", art: { kind: "diary", stone: S.sapphire } },
  { slug: "treats", name: "Treats", vertical: "gifting", group: "Gift types", blurb: "Sweet things, artfully boxed.", art: { kind: "chocolate", stone: "#6B3A2A" } },
  { slug: "personalised", name: "Personalised gifts", vertical: "gifting", group: "Gift types", blurb: "Their name, your thought.", art: { kind: "frame", stone: S.kundan } },
  { slug: "green-gifts", name: "Green gifts", vertical: "gifting", group: "Gift types", blurb: "Gifts that keep growing.", art: { kind: "plant", stone: S.emerald } },
];

type P = Omit<Product, "id" | "rating" | "reviewCount" | "stock" | "details" | "description"> &
  Partial<Pick<Product, "rating" | "reviewCount" | "stock" | "details" | "description">>;

const jewelleryDetails = (finish: string, extra: string[] = []) => [
  `${finish} plated brass base, nickel and lead free`,
  ...extra,
  "Packed in a Ditsy keepsake pouch",
  "Store dry, away from perfume and water",
];

let n = 0;
const make = (p: P): Product => ({
  id: `p${(++n).toString().padStart(3, "0")}`,
  rating: 4.7,
  reviewCount: 24,
  stock: 12,
  description: p.short,
  details: [],
  ...p,
});

export const products: Product[] = [
  // ---------- JEWELLERY ----------
  make({
    slug: "gulnaar-statement-jhumka", name: "Gulnaar statement jhumka", vertical: "jewellery", category: "statement-jhumkas",
    price: 1290, compareAt: 1590, short: "A domed jhumka with a ruby-red heart and a fringe of seed pearls that moves when you laugh.",
    description: "Gulnaar means pomegranate blossom, and this pair carries the same deep red. A hand-finished antique-gold dome, a cluster of ruby-toned stones and a soft fringe of seed pearls. Big enough to be noticed across a sangeet, light enough to dance in till 2am.",
    details: jewelleryDetails("Antique gold", ["Ruby-toned glass stones, faux seed pearls", "Length 6.2 cm, 18 g per earring", "Push-back closure with ear-chain loop"]),
    variants: [{ id: "ruby", label: "Ruby", stock: 8 }, { id: "emerald", label: "Emerald", stock: 5 }, { id: "pearl", label: "Pearl white", stock: 3 }],
    tags: ["jhumka", "statement", "pearl"], occasions: ["wedding", "sangeet", "diwali"], collections: ["jhumka-edit", "wedding-guest", "signature"],
    rating: 4.9, reviewCount: 86, bestseller: true, art: { kind: "jhumka", finish: "antique", stone: S.ruby }, model3d: "procedural:jhumka",
    pairsWith: ["rani-maang-tikka", "zoya-kundan-bangles"],
  }),
  make({
    slug: "saanjh-oxidised-jhumka", name: "Saanjh oxidised jhumka", vertical: "jewellery", category: "oxidised-earrings",
    price: 690, short: "Dusky silver bells with a carved peacock dome. Made for cotton sarees and long evenings.",
    details: jewelleryDetails("Oxidised silver-tone", ["Length 5 cm, 11 g per earring", "Hook closure"]),
    tags: ["jhumka", "oxidised", "everyday"], occasions: ["everyday", "navratri"], collections: ["jhumka-edit", "under-999", "everyday-elegance"],
    rating: 4.8, reviewCount: 142, bestseller: true, art: { kind: "jhumka", finish: "oxidised", stone: S.onyx }, model3d: "procedural:jhumka",
    pairsWith: ["meher-oxidised-kada"],
  }),
  make({
    slug: "kesar-designer-jhumka", name: "Kesar designer jhumka", vertical: "jewellery", category: "designer-jhumkas",
    price: 1490, short: "A two-tier jhumka with an emerald drop between the bells, like a saffron flower turned inside out.",
    details: jewelleryDetails("Antique gold", ["Emerald-toned stones", "Length 7 cm, 21 g per earring", "Supports an ear chain (included)"]),
    variants: [{ id: "emerald", label: "Emerald", stock: 6 }, { id: "ruby", label: "Ruby", stock: 6 }],
    tags: ["jhumka", "designer"], occasions: ["wedding", "diwali", "karwa-chauth"], collections: ["jhumka-edit", "festive-edit", "statement"],
    isNew: true, art: { kind: "jhumka", finish: "antique", stone: S.emerald }, model3d: "procedural:jhumka", pairsWith: ["rani-maang-tikka"],
  }),
  make({
    slug: "mehtab-chandbali", name: "Mehtab chandbali", vertical: "jewellery", category: "chandbalis",
    price: 1190, compareAt: 1390, short: "A full crescent moon set with pale kundan and finished with a row of pearl drops.",
    details: jewelleryDetails("Gold", ["Kundan-style glass, faux pearls", "Width 5.5 cm, 16 g per earring", "Push-back closure"]),
    tags: ["chandbali", "kundan", "pearl"], occasions: ["wedding", "engagement", "eid"], collections: ["wedding-guest", "festive-edit", "signature"],
    rating: 4.9, reviewCount: 64, bestseller: true, art: { kind: "chandbali", finish: "gold", stone: S.kundan }, model3d: "procedural:chandbali",
    pairsWith: ["noor-matha-patti", "zoya-kundan-bangles"],
  }),
  make({
    slug: "rooh-oversized-chandbali", name: "Rooh oversized chandbali", vertical: "jewellery", category: "oversized-earrings",
    price: 1690, short: "Our biggest moon yet. Blush stones, layered drops, a frame that sits just above the shoulder.",
    details: jewelleryDetails("Antique gold", ["Blush-toned stones", "Width 7.5 cm, 26 g per earring", "Ear chain included for support"]),
    tags: ["chandbali", "statement", "oversized"], occasions: ["sangeet", "reception"], collections: ["statement", "wedding-guest"],
    isNew: true, art: { kind: "chandbali", finish: "antique", stone: S.pink }, model3d: "procedural:chandbali",
  }),
  make({
    slug: "noor-pearl-drops", name: "Noor pearl drops", vertical: "jewellery", category: "pearl-earrings",
    price: 590, short: "A single lustrous pearl on a slim gold stem. The pair you will never take off.",
    details: jewelleryDetails("18k gold-tone", ["Shell pearl, 10 mm", "Length 3 cm, 4 g per earring", "Hypoallergenic posts"]),
    tags: ["pearl", "minimal", "office"], occasions: ["everyday", "office", "birthday"], collections: ["everyday-elegance", "under-999"],
    rating: 4.8, reviewCount: 203, bestseller: true, art: { kind: "drop", finish: "gold", stone: S.pearl }, pairsWith: ["ira-pearl-bracelet"],
  }),
  make({
    slug: "tara-studs", name: "Tara star studs", vertical: "jewellery", category: "minimal-earrings",
    price: 399, short: "Tiny eight-point stars with a pearl centre. Small, and somehow everything.",
    details: jewelleryDetails("Gold", ["Shell pearl centre", "Diameter 1 cm"]),
    variants: [{ id: "gold", label: "Gold", stock: 20 }, { id: "rose", label: "Rose gold", stock: 14 }],
    tags: ["stud", "minimal", "everyday"], occasions: ["everyday", "office", "birthday"], collections: ["everyday-elegance", "under-499"],
    art: { kind: "stud", finish: "gold", stone: S.pearl },
  }),
  make({
    slug: "ada-sculpted-hoops", name: "Ada sculpted hoops", vertical: "jewellery", category: "contemporary-earrings",
    price: 790, short: "Chunky, hollow, featherweight. A modern hoop with a soft twist at the bottom.",
    details: jewelleryDetails("Gold", ["Hollow construction, 6 g per earring", "Diameter 3.5 cm", "Hinged closure"]),
    tags: ["hoop", "contemporary", "office"], occasions: ["everyday", "office", "brunch"], collections: ["everyday-elegance", "under-999"],
    isNew: true, art: { kind: "hoop", finish: "gold" },
  }),
  make({
    slug: "sitara-party-drops", name: "Sitara party drops", vertical: "jewellery", category: "party-earrings",
    price: 990, short: "Sapphire-blue crystals in a cascade of silver. Cocktail hour, sorted.",
    details: jewelleryDetails("Rhodium silver-tone", ["Sapphire-toned crystals", "Length 6 cm, 9 g per earring"]),
    tags: ["party", "crystal", "drop"], occasions: ["reception", "new-year", "cocktail"], collections: ["statement"],
    art: { kind: "drop", finish: "silver", stone: S.sapphire },
  }),
  make({
    slug: "vintage-ruby-drops", name: "Haveli ruby drops", vertical: "jewellery", category: "traditional-earrings",
    price: 840, short: "A ruby teardrop hanging from a carved lotus. Grandmother approved.",
    details: jewelleryDetails("Antique gold", ["Ruby-toned stone", "Length 4.5 cm"]),
    tags: ["traditional", "drop"], occasions: ["diwali", "karwa-chauth", "puja"], collections: ["festive-edit", "under-999"],
    art: { kind: "drop", finish: "antique", stone: S.ruby }, pairsWith: ["rani-maang-tikka"],
  }),
  // Sets
  make({
    slug: "shehzadi-bridal-set", name: "Shehzadi bridal set", vertical: "jewellery", category: "wedding-sets",
    price: 6490, compareAt: 7990, short: "A layered rani haar, matching chandbalis and a maang tikka. For the bride who wants it all.",
    description: "Shehzadi is our most complete bridal look: a two-layer rani haar with ruby-toned stones and pearl strings, a matching pair of chandbalis and a centre tikka. It photographs like real gold and weighs a fraction of it, so you can still hug everyone at the pheras.",
    details: jewelleryDetails("Antique gold", ["Includes necklace, earrings, maang tikka", "Adjustable dori closure", "Ruby-toned stones, faux pearls", "Arrives in a Ditsy bridal trunk"]),
    tags: ["bridal", "set", "rani haar"], occasions: ["wedding"], collections: ["signature", "wedding-guest"],
    rating: 5, reviewCount: 31, bestseller: true, stock: 4, art: { kind: "necklace", finish: "antique", stone: S.ruby }, pairsWith: ["noor-matha-patti", "zoya-kundan-bangles", "gulaab-haath-phool"],
  }),
  make({
    slug: "diya-festive-set", name: "Diya festive choker set", vertical: "jewellery", category: "festive-sets",
    price: 2290, short: "An emerald choker with matching studs. Made for diya-light and family photos.",
    details: jewelleryDetails("Antique gold", ["Choker with adjustable dori", "Matching drop earrings", "Emerald-toned stones"]),
    tags: ["festive", "choker", "set"], occasions: ["diwali", "karwa-chauth", "puja"], collections: ["festive-edit"],
    isNew: true, art: { kind: "choker", finish: "antique", stone: S.emerald }, pairsWith: ["kesar-designer-jhumka"],
  }),
  make({
    slug: "meenakshi-temple-set", name: "Meenakshi temple set", vertical: "jewellery", category: "temple-sets",
    price: 3490, short: "A long temple necklace with Lakshmi coins and ruby accents, with jhumkas to match.",
    details: jewelleryDetails("Matte antique gold", ["Necklace and jhumka earrings", "Length 30 cm drop"]),
    tags: ["temple", "south indian", "set"], occasions: ["wedding", "puja", "onam"], collections: ["festive-edit", "statement"],
    art: { kind: "necklace", finish: "antique", stone: S.ruby },
  }),
  make({
    slug: "zehra-kundan-set", name: "Zehra kundan set", vertical: "jewellery", category: "kundan-sets",
    price: 2890, compareAt: 3290, short: "Pale kundan, soft pink stones and pearl hangings. Quietly regal.",
    details: jewelleryDetails("Gold", ["Choker and earrings", "Kundan-style glass, pink stones, faux pearls"]),
    tags: ["kundan", "set"], occasions: ["engagement", "wedding", "eid"], collections: ["wedding-guest", "signature"],
    rating: 4.9, reviewCount: 48, bestseller: true, art: { kind: "choker", finish: "gold", stone: S.kundan }, pairsWith: ["noor-matha-patti"],
  }),
  make({
    slug: "moti-pearl-set", name: "Moti layered pearl set", vertical: "jewellery", category: "pearl-sets",
    price: 1990, short: "Three strands of graduated pearls with a gold clasp and pearl drop earrings.",
    details: jewelleryDetails("Gold", ["Glass pearls, three strands", "Earrings included"]),
    tags: ["pearl", "set"], occasions: ["reception", "engagement", "anniversary"], collections: ["everyday-elegance", "wedding-guest"],
    art: { kind: "necklace", finish: "gold", stone: S.pearl },
  }),
  make({
    slug: "lune-contemporary-set", name: "Lune contemporary set", vertical: "jewellery", category: "contemporary-sets",
    price: 1490, short: "A sculptural rose-gold collar and matching ear cuffs. For lehengas and little black dresses alike.",
    details: jewelleryDetails("Rose gold", ["Collar necklace and earrings"]),
    tags: ["contemporary", "set"], occasions: ["cocktail", "reception", "new-year"], collections: ["statement"],
    isNew: true, art: { kind: "choker", finish: "rosegold" },
  }),
  make({
    slug: "genda-haldi-set", name: "Genda haldi set", vertical: "jewellery", category: "haldi-mehendi",
    price: 1290, short: "Marigold-yellow floral necklace, earrings, tikka and haath phool. Splash-friendly.",
    details: ["Lightweight fabric-wrapped florals with gold-tone accents", "Necklace, earrings, maang tikka and two haath phool", "Wipe clean with a damp cloth", "Packed in a Ditsy keepsake pouch"],
    tags: ["haldi", "floral", "set"], occasions: ["haldi", "mehendi"], collections: ["mehendi-haldi"],
    rating: 4.9, reviewCount: 57, bestseller: true, art: { kind: "haathphool", finish: "gold", stone: "#E2B33C" },
  }),
  make({
    slug: "hari-mehendi-set", name: "Hari mehendi set", vertical: "jewellery", category: "haldi-mehendi",
    price: 1390, short: "Mint and pearl florals for the mehendi. Matches the green of fresh henna.",
    details: ["Lightweight florals with faux pearls", "Necklace, earrings, maang tikka and haath phool", "Packed in a Ditsy keepsake pouch"],
    tags: ["mehendi", "floral", "set"], occasions: ["mehendi"], collections: ["mehendi-haldi"],
    isNew: true, art: { kind: "haathphool", finish: "gold", stone: S.mint },
  }),
  make({
    slug: "rang-party-set", name: "Raat party set", vertical: "jewellery", category: "party-sets",
    price: 1790, short: "Midnight-blue crystals in silver. A choker and drops for the after-party.",
    details: jewelleryDetails("Rhodium silver-tone", ["Choker and drop earrings", "Sapphire-toned crystals"]),
    tags: ["party", "crystal", "set"], occasions: ["reception", "cocktail", "new-year"], collections: ["statement"],
    art: { kind: "choker", finish: "silver", stone: S.sapphire },
  }),
  make({
    slug: "nazakat-necklace-set", name: "Nazakat statement necklace set", vertical: "jewellery", category: "statement-necklace-sets",
    price: 2690, short: "A broad emerald bib with cascading pearls. The kind of piece people ask about.",
    details: jewelleryDetails("Antique gold", ["Necklace and earrings", "Adjustable dori"]),
    tags: ["statement", "necklace", "set"], occasions: ["sangeet", "wedding"], collections: ["statement", "wedding-guest"],
    art: { kind: "necklace", finish: "antique", stone: S.emerald },
  }),
  // Ornaments
  make({
    slug: "rani-maang-tikka", name: "Rani maang tikka", vertical: "jewellery", category: "maang-tikka",
    price: 690, short: "A round ruby tikka with a pearl fringe and a fine adjustable chain.",
    details: jewelleryDetails("Antique gold", ["Adjustable chain with hook", "Length 11 cm"]),
    variants: [{ id: "ruby", label: "Ruby", stock: 9 }, { id: "emerald", label: "Emerald", stock: 6 }],
    tags: ["tikka"], occasions: ["wedding", "sangeet", "karwa-chauth"], collections: ["wedding-guest", "under-999"],
    rating: 4.8, reviewCount: 77, bestseller: true, art: { kind: "tikka", finish: "antique", stone: S.ruby }, pairsWith: ["gulnaar-statement-jhumka"],
  }),
  make({
    slug: "noor-matha-patti", name: "Noor matha patti", vertical: "jewellery", category: "matha-patti",
    price: 1590, short: "Three strands of kundan and pearls that frame the hairline. Bridal, without the weight.",
    details: jewelleryDetails("Gold", ["Adjustable side chains", "Kundan-style glass, faux pearls"]),
    tags: ["matha patti", "bridal"], occasions: ["wedding", "engagement"], collections: ["wedding-guest", "signature"],
    art: { kind: "mathapatti", finish: "gold", stone: S.kundan },
  }),
  make({
    slug: "jhoomar-passa", name: "Jhoomar passa", vertical: "jewellery", category: "passa",
    price: 990, short: "A fan-shaped side ornament with tiers of pearl. Pin it, swing it, own it.",
    details: jewelleryDetails("Antique gold", ["Hair pin attachment", "Length 9 cm"]),
    tags: ["passa", "bridal"], occasions: ["wedding", "sangeet"], collections: ["statement"],
    art: { kind: "passa", finish: "antique", stone: S.pearl },
  }),
  make({
    slug: "sohni-nath", name: "Sohni nath", vertical: "jewellery", category: "nath",
    price: 590, short: "A clip-on nath with a pearl-studded hoop and chain. No piercing needed.",
    details: jewelleryDetails("Gold", ["Clip-on, no piercing needed", "Chain attaches behind the ear"]),
    tags: ["nath", "bridal"], occasions: ["wedding"], collections: ["wedding-guest", "under-999"],
    art: { kind: "nath", finish: "gold", stone: S.pearl },
  }),
  make({
    slug: "zoya-kundan-bangles", name: "Zoya kundan bangles", vertical: "jewellery", category: "bangles",
    price: 1190, short: "A stack of four: two kundan, two ruby-lined. Wear them all or split with your sister.",
    details: jewelleryDetails("Gold", ["Set of 4 bangles"]),
    variants: [{ id: "2-4", label: "2.4", stock: 6 }, { id: "2-6", label: "2.6", stock: 8 }, { id: "2-8", label: "2.8", stock: 4 }],
    tags: ["bangles", "kundan"], occasions: ["wedding", "karwa-chauth", "diwali"], collections: ["festive-edit", "wedding-guest"],
    rating: 4.7, reviewCount: 52, art: { kind: "bangles", finish: "gold", stone: S.ruby },
  }),
  make({
    slug: "meher-oxidised-kada", name: "Meher oxidised kada", vertical: "jewellery", category: "kadas",
    price: 790, short: "A broad carved cuff with an emerald stone, open-backed so it slips on easily.",
    details: jewelleryDetails("Oxidised silver-tone", ["Open adjustable cuff"]),
    tags: ["kada", "oxidised"], occasions: ["everyday", "navratri"], collections: ["everyday-elegance", "under-999"],
    art: { kind: "kada", finish: "oxidised", stone: S.emerald },
  }),
  make({
    slug: "gulaab-haath-phool", name: "Gulaab haath phool", vertical: "jewellery", category: "haath-phool",
    price: 890, short: "A rose-shaped centre linked to five finger rings. Your mehendi will thank you.",
    details: jewelleryDetails("Gold", ["Adjustable rings and wrist chain"]),
    tags: ["haath phool"], occasions: ["wedding", "mehendi"], collections: ["mehendi-haldi", "under-999"],
    art: { kind: "haathphool", finish: "gold", stone: S.pink },
  }),
  make({
    slug: "ghungroo-anklets", name: "Ghungroo anklets", vertical: "jewellery", category: "anklets",
    price: 490, short: "A pair of silver anklets with tiny bells. Gentle music, every step.",
    details: jewelleryDetails("Silver-tone", ["Pair, adjustable 22–26 cm"]),
    tags: ["anklet"], occasions: ["everyday", "navratri", "mehendi"], collections: ["under-499", "everyday-elegance"],
    art: { kind: "anklet", finish: "silver" },
  }),
  make({
    slug: "ira-pearl-bracelet", name: "Ira pearl bracelet", vertical: "jewellery", category: "bracelets",
    price: 449, short: "Freshwater-look pearls on a fine gold chain. Office to dinner without a change.",
    details: jewelleryDetails("Gold", ["Adjustable 16–19 cm"]),
    tags: ["bracelet", "pearl"], occasions: ["everyday", "office", "birthday"], collections: ["under-499", "everyday-elegance"],
    art: { kind: "bracelet", finish: "gold", stone: S.pearl },
  }),
  make({
    slug: "mira-pendant", name: "Mira blush pendant", vertical: "jewellery", category: "necklaces",
    price: 690, short: "A blush stone in a rose-gold halo on a fine chain. Easy to layer, easy to love.",
    details: jewelleryDetails("Rose gold", ["Chain 45 cm with 5 cm extender"]),
    tags: ["pendant", "minimal"], occasions: ["everyday", "birthday", "valentines"], collections: ["everyday-elegance", "under-999"],
    isNew: true, art: { kind: "necklace", finish: "rosegold", stone: S.pink },
  }),
  make({
    slug: "chameli-hair-pins", name: "Chameli hair pins", vertical: "jewellery", category: "hair-accessories",
    price: 349, short: "A set of three jasmine-bud pins in pearl and gold. Bun, braid or half-up.",
    details: jewelleryDetails("Gold", ["Set of 3 pins"]),
    tags: ["hair"], occasions: ["wedding", "mehendi", "everyday"], collections: ["under-499"],
    art: { kind: "hairpin", finish: "gold", stone: S.pearl },
  }),

  // ---------- GIFTING ----------
  make({
    slug: "shagun-luxury-hamper", name: "Shagun luxury hamper", vertical: "gifting", category: "luxury-hampers",
    price: 3490, short: "A burgundy trunk with a brass diya, rose candle, artisanal sweets and a handwritten card.",
    description: "Shagun is our answer to 'what do we take?'. A reusable burgundy trunk holds a hand-beaten brass diya, a rose and oud soy candle, a box of saffron pistachio barfi, dried rose petals and a card we write by hand in the message you choose.",
    details: ["Reusable fabric-covered trunk", "Brass diya, soy candle (40 hr burn), 250 g sweets, rose petals", "Handwritten card included", "Ships in 2–3 days across India"],
    tags: ["hamper", "luxury"], occasions: ["diwali", "wedding", "housewarming"], collections: ["luxury-hampers", "diwali-gifts", "wedding-gifts"],
    rating: 4.9, reviewCount: 39, bestseller: true, art: { kind: "hamper", stone: S.ruby },
  }),
  make({
    slug: "gulabi-celebration-hamper", name: "Gulabi celebration hamper", vertical: "gifting", category: "luxury-hampers",
    price: 2490, short: "Blush box, pink salt chocolates, a rose quartz trinket dish and a scented candle.",
    details: ["Rigid keepsake box with magnetic lid", "Chocolates, candle, trinket dish, card"],
    tags: ["hamper"], occasions: ["birthday", "anniversary", "baby-shower"], collections: ["birthday-gifts", "anniversary-gifts", "luxury-hampers"],
    isNew: true, art: { kind: "hamper", stone: S.pink },
  }),
  make({
    slug: "rose-oud-candle", name: "Rose & oud soy candle", vertical: "gifting", category: "home-and-candles",
    price: 690, short: "Hand-poured soy wax in a ribbed glass tumbler. Rose up top, warm oud underneath.",
    details: ["200 g soy wax, cotton wick", "Approx. 40 hour burn"],
    tags: ["candle"], occasions: ["birthday", "housewarming", "thank-you"], collections: ["birthday-gifts", "thank-you-gifts"],
    rating: 4.8, reviewCount: 96, bestseller: true, boxable: true, art: { kind: "candle", stone: S.pink },
  }),
  make({
    slug: "mitti-mini-candle", name: "Mitti mini candle", vertical: "gifting", category: "home-and-candles",
    price: 249, short: "Petrichor-scented soy in a terracotta cup. Smells like the first rain.",
    details: ["80 g soy wax", "Approx. 15 hour burn"],
    tags: ["candle", "return gift"], occasions: ["housewarming", "diwali"], collections: ["thank-you-gifts", "diwali-gifts"],
    boxable: true, art: { kind: "candle", stone: "#C47A55" },
  }),
  make({
    slug: "kamal-trinket-dish", name: "Kamal trinket dish", vertical: "gifting", category: "keepsakes",
    price: 449, short: "A lotus-shaped ceramic dish with a gold rim. A home for rings and earrings.",
    details: ["Hand-glazed ceramic, gold lustre rim", "Diameter 10 cm"],
    tags: ["keepsake"], occasions: ["bridesmaid", "birthday", "thank-you"], collections: ["bridesmaid-gifts", "thank-you-gifts"],
    boxable: true, rating: 4.9, reviewCount: 61, art: { kind: "trinket", stone: S.mint },
  }),
  make({
    slug: "brocade-potli", name: "Brocade potli pouch", vertical: "gifting", category: "pouches-and-accessories",
    price: 390, short: "A silk-brocade drawstring potli with tassels. The gift and the gift wrap.",
    details: ["Silk brocade, satin lining", "18 x 20 cm"],
    variants: [{ id: "blush", label: "Blush", stock: 30 }, { id: "wine", label: "Wine", stock: 30 }, { id: "gold", label: "Gold", stock: 30 }],
    tags: ["pouch", "return gift"], occasions: ["wedding", "bridesmaid", "diwali"], collections: ["bridesmaid-gifts", "wedding-gifts"],
    boxable: true, art: { kind: "pouch", stone: S.pink },
  }),
  make({
    slug: "linen-journal", name: "Linen-bound journal", vertical: "gifting", category: "stationery",
    price: 549, short: "A5, 160 pages of 100 gsm paper in a linen cover. Foil-embossed initial on request.",
    details: ["A5, dotted pages", "Optional initial in gold foil"],
    tags: ["journal", "personalised"], occasions: ["birthday", "corporate", "thank-you"], collections: ["corporate-gifting", "personalised-gifts"],
    boxable: true, art: { kind: "diary", stone: S.sapphire },
  }),
  make({
    slug: "saffron-barfi-box", name: "Saffron pistachio barfi", vertical: "gifting", category: "treats",
    price: 590, short: "Twelve pieces of slow-cooked barfi with Kashmiri saffron, in a keepsake tin.",
    details: ["250 g, 12 pieces", "Best before 15 days", "Vegetarian"],
    tags: ["sweets"], occasions: ["diwali", "rakhi", "wedding"], collections: ["diwali-gifts", "rakhi-gifts"],
    boxable: true, art: { kind: "chocolate", stone: "#C9A03A" },
  }),
  make({
    slug: "sea-salt-chocolates", name: "Pink salt chocolates", vertical: "gifting", category: "treats",
    price: 490, short: "Nine dark chocolate bonbons with rose and Himalayan pink salt.",
    details: ["9 pieces", "Best before 30 days"],
    tags: ["chocolate"], occasions: ["valentines", "birthday", "anniversary"], collections: ["valentines-gifts", "birthday-gifts"],
    boxable: true, art: { kind: "chocolate", stone: "#6B3A2A" },
  }),
  make({
    slug: "brass-photo-frame", name: "Engraved brass frame", vertical: "gifting", category: "personalised",
    price: 990, short: "A slim brass frame engraved with a name and a date. 4 x 6 photo.",
    details: ["Solid brass, hand-polished", "Up to 24 characters of engraving", "Dispatch in 4 days"],
    tags: ["personalised", "frame"], occasions: ["anniversary", "wedding", "newborn"], collections: ["personalised-gifts", "anniversary-gifts", "newborn-gifts"],
    art: { kind: "frame", stone: S.kundan },
  }),
  make({
    slug: "jade-succulent", name: "Jade plant in ceramic pot", vertical: "gifting", category: "green-gifts",
    price: 590, short: "A lucky jade plant in a hand-painted ceramic pot. Thrives on neglect.",
    details: ["Live plant, 15–20 cm", "Ceramic pot with drainage"],
    tags: ["plant"], occasions: ["housewarming", "corporate", "thank-you"], collections: ["corporate-gifting", "thank-you-gifts"],
    art: { kind: "plant", stone: S.emerald },
  }),
  make({
    slug: "chai-mug-pair", name: "Chai for two mug set", vertical: "gifting", category: "home-and-candles",
    price: 790, short: "Two hand-thrown stoneware mugs in rose and ivory. Mornings, but better.",
    details: ["Set of 2, 250 ml each", "Microwave and dishwasher safe"],
    tags: ["mug"], occasions: ["anniversary", "housewarming", "valentines"], collections: ["anniversary-gifts", "valentines-gifts"],
    art: { kind: "mug", stone: S.pink },
  }),
  make({
    slug: "bridesmaid-keepsake-box", name: "Bridesmaid keepsake box", vertical: "gifting", category: "keepsakes",
    price: 1490, short: "A personalised box with pearl studs, a brocade potli, a trinket dish and a 'will you?' card.",
    details: ["Name on the lid in gold foil", "Tara studs, potli, trinket dish, card", "Minimum 4 boxes"],
    tags: ["bridesmaid", "personalised"], occasions: ["bridesmaid", "wedding"], collections: ["bridesmaid-gifts", "personalised-gifts"],
    rating: 5, reviewCount: 22, bestseller: true, art: { kind: "box", stone: S.pink },
  }),
  make({
    slug: "baby-welcome-box", name: "Little one welcome box", vertical: "gifting", category: "keepsakes",
    price: 1890, short: "Muslin swaddle, a silver-tone rattle, a memory book and a card for the new parents.",
    details: ["Organic muslin swaddle", "Memory book with 40 prompts"],
    tags: ["baby"], occasions: ["newborn", "baby-shower"], collections: ["newborn-gifts", "baby-shower-gifts"],
    isNew: true, art: { kind: "box", stone: S.mint },
  }),
  make({
    slug: "rakhi-thali-set", name: "Rakhi thali set", vertical: "gifting", category: "keepsakes",
    price: 890, short: "A brass thali with two handmade rakhis, roli-chawal and a mini diya.",
    details: ["Brass-finish thali, 20 cm", "Two handmade rakhis"],
    tags: ["rakhi"], occasions: ["rakhi"], collections: ["rakhi-gifts"],
    art: { kind: "trinket", stone: S.ruby },
  }),
  make({
    slug: "karwa-chauth-box", name: "Karwa chauth sargi box", vertical: "gifting", category: "luxury-hampers",
    price: 1690, short: "Dry fruits, a pair of glass bangles, sindoor box and a decorated sieve, beautifully packed.",
    details: ["Decorated channi and karwa", "Dry fruits 200 g", "Glass bangles and sindoor box"],
    tags: ["karwa chauth"], occasions: ["karwa-chauth"], collections: ["karwa-chauth-gifts"],
    art: { kind: "hamper", stone: "#B3261E" },
  }),
  make({
    slug: "mothers-day-box", name: "For Maa box", vertical: "gifting", category: "luxury-hampers",
    price: 1990, short: "A silk stole, a rose candle, Noor pearl drops and a card for everything you never said.",
    details: ["Silk-blend stole", "Rose & oud candle", "Noor pearl drops"],
    tags: ["mother"], occasions: ["mothers-day", "birthday"], collections: ["mothers-day-gifts"],
    art: { kind: "box", stone: S.ruby },
  }),
  make({
    slug: "corporate-desk-kit", name: "The good desk kit", vertical: "gifting", category: "stationery",
    price: 1290, short: "Linen journal, brass pen, a jade plant and a card with your logo. Minimum 20.",
    details: ["Logo on the sleeve and card", "Bulk pricing from 20 units"],
    tags: ["corporate"], occasions: ["corporate", "diwali"], collections: ["corporate-gifting"],
    art: { kind: "diary", stone: S.emerald },
  }),
];

export const collections: Collection[] = [
  { slug: "jhumka-edit", name: "The jhumka edit", vertical: "jewellery", line: "Bells, domes, and a little sway.", story: "Every Indian woman owns a jhumka; very few own one that feels like hers. These are the pairs we couldn't stop wearing: oxidised for Sundays, ruby for sangeets, and one oversized pair you'll save for the best nights.", tone: { bg: "#0E1F2E", fg: "#FAF8F5", accent: "#E9DDC4" }, art: [{ kind: "jhumka", finish: "antique", stone: S.ruby }, { kind: "jhumka", finish: "oxidised", stone: S.onyx }, { kind: "jhumka", finish: "gold", stone: S.emerald }] },
  { slug: "wedding-guest", name: "Wedding guest edit", vertical: "jewellery", line: "Shine, without upstaging the bride.", story: "Five functions, one suitcase, zero repeats. Pieces that work with a lehenga at the sangeet and a saree at the reception.", tone: { bg: "#F5DFD9", fg: "#0E1F2E", accent: "#C7787E" }, art: [{ kind: "chandbali", finish: "gold", stone: S.kundan }, { kind: "tikka", finish: "antique", stone: S.ruby }, { kind: "choker", finish: "gold", stone: S.kundan }] },
  { slug: "festive-edit", name: "The festive edit", vertical: "jewellery", line: "Dressed for diyas.", story: "Emerald and ruby, antique gold and temple work. Made for puja mornings, card-party nights and every family photo in between.", tone: { bg: "#2F3B2C", fg: "#FAF8F5", accent: "#D9BE84" }, art: [{ kind: "choker", finish: "antique", stone: S.emerald }, { kind: "bangles", finish: "gold", stone: S.ruby }, { kind: "drop", finish: "antique", stone: S.ruby }] },
  { slug: "mehendi-haldi", name: "Mehendi & haldi edit", vertical: "jewellery", line: "Floral, featherlight, splash-proof.", story: "Marigold for the haldi, mint for the mehendi. Light enough to forget you're wearing them, bright enough for every candid.", tone: { bg: "#F3D67A", fg: "#0E1F2E", accent: "#1E3A4F" }, art: [{ kind: "haathphool", finish: "gold", stone: "#E2B33C" }, { kind: "haathphool", finish: "gold", stone: S.mint }, { kind: "tikka", finish: "gold", stone: S.pink }] },
  { slug: "statement", name: "Statement pieces", vertical: "jewellery", line: "One piece. All the attention.", story: "For the outfits that need a full stop. Oversized chandbalis, broad collars and a passa that swings when you turn your head.", tone: { bg: "#15212C", fg: "#FAF8F5", accent: "#C29B57" }, art: [{ kind: "chandbali", finish: "antique", stone: S.pink }, { kind: "necklace", finish: "antique", stone: S.emerald }, { kind: "passa", finish: "antique", stone: S.pearl }] },
  { slug: "everyday-elegance", name: "Everyday elegance", vertical: "jewellery", line: "The pieces you forget to take off.", story: "Pearls for meetings, hoops for brunch, an oxidised jhumka for when the kurta needs it. Small, considered, worn daily.", tone: { bg: "#ECEFEE", fg: "#15212C", accent: "#C7787E" }, art: [{ kind: "drop", finish: "gold", stone: S.pearl }, { kind: "hoop", finish: "gold" }, { kind: "bracelet", finish: "gold", stone: S.pearl }] },
  { slug: "under-499", name: "Under ₹499", vertical: "jewellery", line: "Little luxuries.", story: "Studs, pins and anklets that make great gifts, or a very easy yes for yourself.", tone: { bg: "#FAF8F5", fg: "#0E1F2E", accent: "#C29B57" }, art: [{ kind: "stud", finish: "gold", stone: S.pearl }, { kind: "anklet", finish: "silver" }, { kind: "hairpin", finish: "gold", stone: S.pearl }] },
  { slug: "under-999", name: "Under ₹999", vertical: "jewellery", line: "Big looks, kind prices.", story: "Jhumkas, tikkas and kadas that look far more expensive than they are. We won't tell.", tone: { bg: "#E9DDC4", fg: "#0E1F2E", accent: "#1E3A4F" }, art: [{ kind: "jhumka", finish: "oxidised", stone: S.onyx }, { kind: "tikka", finish: "antique", stone: S.ruby }, { kind: "kada", finish: "oxidised", stone: S.emerald }] },
  { slug: "signature", name: "The Ditsy signature collection", vertical: "jewellery", line: "The pieces that made us.", story: "Our founding favourites, chosen one at a time from hundreds we saw in Delhi's oldest markets. If you only buy one Ditsy piece, start here.", tone: { bg: "#091521", fg: "#E9DDC4", accent: "#C29B57" }, art: [{ kind: "jhumka", finish: "antique", stone: S.ruby }, { kind: "necklace", finish: "antique", stone: S.ruby }, { kind: "chandbali", finish: "gold", stone: S.kundan }] },
  // Gifting
  { slug: "birthday-gifts", name: "Birthday gifts", vertical: "gifting", line: "Another year, beautifully wrapped.", story: "Candles, chocolates and little keepsakes for the people who make your year.", tone: { bg: "#F5DFD9", fg: "#0E1F2E", accent: "#C7787E" }, art: [{ kind: "candle", stone: S.pink }, { kind: "chocolate", stone: "#6B3A2A" }, { kind: "box", stone: S.pink }] },
  { slug: "anniversary-gifts", name: "Anniversary gifts", vertical: "gifting", line: "For every year you chose each other.", story: "Engraved frames, chai for two and hampers that say what cards can't.", tone: { bg: "#0E1F2E", fg: "#FAF8F5", accent: "#E9DDC4" }, art: [{ kind: "frame", stone: S.kundan }, { kind: "mug", stone: S.pink }, { kind: "hamper", stone: S.pink }] },
  { slug: "bridesmaid-gifts", name: "Bridesmaid gifts", vertical: "gifting", line: "For the squad that held your dupatta.", story: "Personalised boxes, pearl studs and potlis for the women who made your wedding.", tone: { bg: "#F5DFD9", fg: "#0E1F2E", accent: "#C29B57" }, art: [{ kind: "box", stone: S.pink }, { kind: "pouch", stone: S.pink }, { kind: "trinket", stone: S.mint }] },
  { slug: "wedding-gifts", name: "Wedding gifts", vertical: "gifting", line: "Better than an envelope.", story: "Shagun hampers, brass and brocade for the couple starting something new.", tone: { bg: "#091521", fg: "#E9DDC4", accent: "#C29B57" }, art: [{ kind: "hamper", stone: S.ruby }, { kind: "pouch", stone: S.kundan }, { kind: "frame", stone: S.kundan }] },
  { slug: "baby-shower-gifts", name: "Baby shower gifts", vertical: "gifting", line: "Soft things for a new beginning.", story: "Muslin, memory books and treats for the parents-to-be.", tone: { bg: "#DCEBE3", fg: "#15212C", accent: "#1F5B45" }, art: [{ kind: "box", stone: S.mint }, { kind: "diary", stone: S.mint }, { kind: "candle", stone: S.mint }] },
  { slug: "newborn-gifts", name: "Newborn gifts", vertical: "gifting", line: "Hello, little one.", story: "Keepsakes for the first weeks, and the parents surviving them.", tone: { bg: "#DCEBE3", fg: "#15212C", accent: "#1F5B45" }, art: [{ kind: "box", stone: S.mint }, { kind: "frame", stone: S.kundan }, { kind: "trinket", stone: S.mint }] },
  { slug: "rakhi-gifts", name: "Rakhi gifts", vertical: "gifting", line: "For the one who stole your chocolates.", story: "Thalis, sweets and gifts going both ways.", tone: { bg: "#B3261E", fg: "#FAF8F5", accent: "#F3D67A" }, art: [{ kind: "trinket", stone: S.ruby }, { kind: "chocolate", stone: "#C9A03A" }, { kind: "box", stone: S.ruby }] },
  { slug: "diwali-gifts", name: "Diwali gifts", vertical: "gifting", line: "Light, sweetness and something to keep.", story: "Brass diyas, saffron barfi and candles for every home on your list.", tone: { bg: "#2F1A10", fg: "#F3D67A", accent: "#C29B57" }, art: [{ kind: "hamper", stone: S.ruby }, { kind: "candle", stone: "#C47A55" }, { kind: "chocolate", stone: "#C9A03A" }] },
  { slug: "karwa-chauth-gifts", name: "Karwa chauth gifts", vertical: "gifting", line: "For the day, and the moonrise.", story: "Sargi boxes, bangles and a little something for the evening.", tone: { bg: "#1E3A4F", fg: "#FAF8F5", accent: "#E9DDC4" }, art: [{ kind: "hamper", stone: "#B3261E" }, { kind: "bangles", finish: "gold", stone: S.ruby }, { kind: "trinket", stone: S.ruby }] },
  { slug: "valentines-gifts", name: "Valentine's gifts", vertical: "gifting", line: "Less cliché, more 'you remembered'.", story: "Pink salt chocolates, chai for two and a pendant that means something.", tone: { bg: "#C7787E", fg: "#FAF8F5", accent: "#F5DFD9" }, art: [{ kind: "chocolate", stone: "#6B3A2A" }, { kind: "mug", stone: S.pink }, { kind: "necklace", finish: "rosegold", stone: S.pink }] },
  { slug: "mothers-day-gifts", name: "Mother's day gifts", vertical: "gifting", line: "For the first person who gifted you anything.", story: "Silk, pearls and candles for Maa, Mummy, Amma and everyone in between.", tone: { bg: "#ECEFEE", fg: "#0E1F2E", accent: "#C7787E" }, art: [{ kind: "box", stone: S.ruby }, { kind: "drop", finish: "gold", stone: S.pearl }, { kind: "candle", stone: S.pink }] },
  { slug: "corporate-gifting", name: "Corporate gifting", vertical: "gifting", line: "Gifts your team will actually keep.", story: "Desk kits, plants and hampers with your logo done tastefully. From 20 units, delivered pan-India.", tone: { bg: "#15212C", fg: "#E9DDC4", accent: "#C29B57" }, art: [{ kind: "diary", stone: S.emerald }, { kind: "plant", stone: S.emerald }, { kind: "hamper", stone: S.ruby }] },
  { slug: "thank-you-gifts", name: "Thank you gifts", vertical: "gifting", line: "Two words, nicely boxed.", story: "Small, lovely ways to say it to teachers, hosts, neighbours and everyone who showed up.", tone: { bg: "#E9DDC4", fg: "#0E1F2E", accent: "#1E3A4F" }, art: [{ kind: "candle", stone: S.pink }, { kind: "trinket", stone: S.mint }, { kind: "plant", stone: S.emerald }] },
  { slug: "personalised-gifts", name: "Personalised gifts", vertical: "gifting", line: "Their name, your thought.", story: "Engraved, embossed and foiled gifts made just for them.", tone: { bg: "#FAF8F5", fg: "#0E1F2E", accent: "#C29B57" }, art: [{ kind: "frame", stone: S.kundan }, { kind: "diary", stone: S.sapphire }, { kind: "box", stone: S.pink }] },
  { slug: "luxury-hampers", name: "Luxury hampers", vertical: "gifting", line: "Generous, from the first ribbon.", story: "Trunks and boxes filled with brass, sweets and scent, for the gifts that need to arrive making an impression.", tone: { bg: "#0E1F2E", fg: "#E9DDC4", accent: "#C29B57" }, art: [{ kind: "hamper", stone: S.ruby }, { kind: "hamper", stone: S.pink }, { kind: "box", stone: S.ruby }] },
];

export const bundles: Bundle[] = [
  { slug: "jhumka-tikka-pair", name: "Jhumka + maang tikka", vertical: "jewellery", line: "The Gulnaar jhumkas with their matching Rani tikka.", productSlugs: ["gulnaar-statement-jhumka", "rani-maang-tikka"], price: 1790 },
  { slug: "kundan-necklace-earrings", name: "Necklace + earrings", vertical: "jewellery", line: "Zehra kundan set styled with Mehtab chandbalis.", productSlugs: ["zehra-kundan-set", "mehtab-chandbali"], price: 3690 },
  { slug: "complete-bridal", name: "Complete wedding look", vertical: "jewellery", line: "Shehzadi set, matha patti, bangles and haath phool.", productSlugs: ["shehzadi-bridal-set", "noor-matha-patti", "zoya-kundan-bangles", "gulaab-haath-phool"], price: 8990 },
  { slug: "mehendi-combo", name: "Mehendi combo", vertical: "jewellery", line: "Hari mehendi set with Ghungroo anklets and Chameli pins.", productSlugs: ["hari-mehendi-set", "ghungroo-anklets", "chameli-hair-pins"], price: 1890 },
  { slug: "festive-look", name: "Festive look", vertical: "jewellery", line: "Diya choker set, Kesar jhumkas and Zoya bangles.", productSlugs: ["diya-festive-set", "kesar-designer-jhumka", "zoya-kundan-bangles"], price: 4290 },
  { slug: "earrings-bangles", name: "Earrings + bangles", vertical: "jewellery", line: "Saanjh oxidised jhumkas with the Meher kada.", productSlugs: ["saanjh-oxidised-jhumka", "meher-oxidised-kada"], price: 1290 },
  { slug: "everyday-kit", name: "Occasion styling kit", vertical: "jewellery", line: "Noor drops, Ira bracelet and Mira pendant for every day of the week.", productSlugs: ["noor-pearl-drops", "ira-pearl-bracelet", "mira-pendant"], price: 1490 },
  // gifting combinations
  { slug: "self-care-trio", name: "The slow evening trio", vertical: "gifting", line: "Rose & oud candle, pink salt chocolates and a trinket dish.", productSlugs: ["rose-oud-candle", "sea-salt-chocolates", "kamal-trinket-dish"], price: 1449 },
  { slug: "festive-sweet-light", name: "Sweets & light", vertical: "gifting", line: "Saffron barfi with two Mitti candles.", productSlugs: ["saffron-barfi-box", "mitti-mini-candle", "mitti-mini-candle"], price: 990 },
];

export const occasions: Occasion[] = [
  { slug: "wedding", name: "Weddings", line: "Every function, covered.", story: "From roka to reception: bridal sets, guest edits, shagun hampers and return gifts for 300.", tone: "#0E1F2E", art: { kind: "necklace", finish: "antique", stone: S.ruby } },
  { slug: "mehendi", name: "Mehendi & haldi", line: "Florals and fun.", story: "Featherlight floral jewellery and favours for the brightest day of the wedding.", tone: "#C9A03A", art: { kind: "haathphool", finish: "gold", stone: "#E2B33C" } },
  { slug: "diwali", name: "Diwali", line: "Light it up.", story: "Festive sets, brass, sweets and hampers for family, friends and the office.", tone: "#2F1A10", art: { kind: "hamper", stone: S.ruby } },
  { slug: "birthday", name: "Birthdays", line: "Make a wish.", story: "Little luxuries for them, and return gifts for every guest.", tone: "#C7787E", art: { kind: "box", stone: S.pink } },
  { slug: "anniversary", name: "Anniversaries", line: "Still choosing you.", story: "Engraved, edited and endlessly thoughtful.", tone: "#1E3A4F", art: { kind: "frame", stone: S.kundan } },
  { slug: "karwa-chauth", name: "Karwa chauth", line: "Until moonrise.", story: "Sargi boxes, bangles and the earrings for the evening.", tone: "#B3261E", art: { kind: "bangles", finish: "gold", stone: S.ruby } },
  { slug: "baby-shower", name: "Baby shower", line: "Soft beginnings.", story: "Welcome boxes for parents-to-be and sweet favours for guests.", tone: "#1F5B45", art: { kind: "box", stone: S.mint } },
  { slug: "rakhi", name: "Rakhi", line: "Siblings, sorted.", story: "Thalis, treats and something special in return.", tone: "#B3261E", art: { kind: "trinket", stone: S.ruby } },
  { slug: "corporate", name: "Corporate", line: "Gifts with your name on.", story: "Branded kits and hampers in bulk, delivered across India.", tone: "#15212C", art: { kind: "diary", stone: S.emerald } },
  { slug: "everyday", name: "Every day", line: "No occasion needed.", story: "Pearls, hoops and little treats for an ordinary Tuesday.", tone: "#C7787E", art: { kind: "drop", finish: "gold", stone: S.pearl } },
];

export const returnGiftOccasions = [
  { slug: "birthday", name: "Birthday return gifts" },
  { slug: "wedding", name: "Wedding return gifts" },
  { slug: "baby-shower", name: "Baby shower return gifts" },
  { slug: "first-birthday", name: "First birthday return gifts" },
  { slug: "housewarming", name: "Housewarming return gifts" },
  { slug: "anniversary", name: "Anniversary return gifts" },
  { slug: "engagement", name: "Engagement return gifts" },
  { slug: "festive", name: "Festive return gifts" },
  { slug: "kids-party", name: "Kids' party return gifts" },
  { slug: "corporate", name: "Corporate return gifts" },
];

export const returnGiftTiers = [
  { id: "under-199", label: "Under ₹199 per guest" },
  { id: "199-399", label: "₹199–₹399 per guest" },
  { id: "399-699", label: "₹399–₹699 per guest" },
  { id: "premium", label: "Premium combos" },
] as const;

export const returnGifts: ReturnGiftCombo[] = [
  { slug: "mitti-thank-you", name: "Mitti thank-you", tier: "under-199", pricePerPerson: 179, minQty: 25, includes: ["Mitti mini candle", "Kraft sleeve with name tag"], occasions: ["housewarming", "festive", "birthday"], art: { kind: "candle", stone: "#C47A55" } },
  { slug: "little-potli", name: "Little potli", tier: "under-199", pricePerPerson: 189, minQty: 30, includes: ["Mini brocade potli", "Two dry-fruit bites", "Thank-you tag"], occasions: ["wedding", "engagement", "festive"], art: { kind: "pouch", stone: S.pink } },
  { slug: "crayon-party-pack", name: "Party pack", tier: "under-199", pricePerPerson: 159, minQty: 20, includes: ["Colouring notebook", "Crayon set", "Sticker sheet"], occasions: ["kids-party", "first-birthday", "birthday"], art: { kind: "diary", stone: "#E2B33C" } },
  { slug: "kamal-favour", name: "Kamal favour", tier: "199-399", pricePerPerson: 349, minQty: 25, includes: ["Lotus trinket dish", "Satin ribbon", "Printed card"], occasions: ["wedding", "baby-shower", "anniversary"], art: { kind: "trinket", stone: S.mint } },
  { slug: "sweet-diya", name: "Sweet diya", tier: "199-399", pricePerPerson: 299, minQty: 25, includes: ["Brass-finish diya", "4-piece barfi box", "Name tag"], occasions: ["festive", "housewarming", "wedding"], art: { kind: "chocolate", stone: "#C9A03A" } },
  { slug: "little-sprout", name: "Little sprout", tier: "199-399", pricePerPerson: 279, minQty: 20, includes: ["Seed pencil set", "Mini plant kit", "Thank-you card"], occasions: ["first-birthday", "kids-party", "baby-shower", "corporate"], art: { kind: "plant", stone: S.emerald } },
  { slug: "rose-ritual", name: "Rose ritual", tier: "399-699", pricePerPerson: 549, minQty: 20, includes: ["Rose & oud mini candle", "Pink salt chocolates (3)", "Gift box with ribbon"], occasions: ["anniversary", "engagement", "birthday", "baby-shower"], art: { kind: "candle", stone: S.pink } },
  { slug: "desk-mate", name: "Desk mate", tier: "399-699", pricePerPerson: 649, minQty: 20, includes: ["Pocket linen notebook", "Brass pen", "Logo sleeve"], occasions: ["corporate"], art: { kind: "diary", stone: S.sapphire } },
  { slug: "shagun-mini", name: "Shagun mini", tier: "premium", pricePerPerson: 1190, minQty: 15, includes: ["Brocade potli", "Brass diya", "Saffron barfi", "Personalised card"], occasions: ["wedding", "engagement", "festive"], art: { kind: "hamper", stone: S.ruby } },
  { slug: "pearl-promise", name: "Pearl promise", tier: "premium", pricePerPerson: 990, minQty: 10, includes: ["Tara studs", "Kamal trinket dish", "Keepsake box with name"], occasions: ["engagement", "wedding", "anniversary"], art: { kind: "box", stone: S.pink } },
];

export const reviews: Review[] = [
  { productSlug: "gulnaar-statement-jhumka", name: "Ananya", city: "Pune", rating: 5, text: "Wore these to my cousin's sangeet and three aunties asked where they were from. Light enough that I forgot about them by the second dance.", date: "2026-10-18" },
  { productSlug: "gulnaar-statement-jhumka", name: "Ritika", city: "Chandigarh", rating: 5, text: "The pearl fringe moves so beautifully. Packaging felt like a gift to myself.", date: "2026-09-30" },
  { productSlug: "noor-pearl-drops", name: "Meera", city: "Bengaluru", rating: 5, text: "Have not taken them off in a month. Office, gym, dinner.", date: "2026-11-02" },
  { productSlug: "shehzadi-bridal-set", name: "Simran", city: "Ludhiana", rating: 5, text: "Wore it for my pheras. Photographers kept asking if it was real gold. Half the weight of what my mother wore.", date: "2026-11-12" },
  { productSlug: "genda-haldi-set", name: "Tanvi", city: "Jaipur", rating: 5, text: "Survived a full haldi and still looked good after. Bought five for my bridesmaids.", date: "2026-10-07" },
  { productSlug: "shagun-luxury-hamper", name: "Rohan", city: "Gurugram", rating: 5, text: "Sent these to clients for Diwali. Two of them messaged to say thank you, which never happens.", date: "2026-11-05" },
];

export const testimonials = [
  { quote: "It felt like someone actually chose each piece. Nothing looked mass-produced.", name: "Aditi", city: "Delhi", context: "Bought the Mehtab chandbalis" },
  { quote: "We ordered 180 return gifts for my daughter's first birthday. Every single box arrived perfect, and the name tags were hand-tied.", name: "Kavya", city: "Mohali", context: "Bulk order, first birthday" },
  { quote: "My bridesmaids cried. In a good way. The personalised boxes were the best part of my wedding planning.", name: "Ishita", city: "Mumbai", context: "Bridesmaid keepsake boxes" },
];

// ---------- Gift box builder options ----------
export const boxOptions: BoxOption[] = [
  { id: "petite", name: "Petite box", price: 190, capacity: 3, color: "#F5DFD9", lid: "#E7B9B0", note: "Holds up to 3 items" },
  { id: "classic", name: "Classic box", price: 290, capacity: 5, color: "#0E1F2E", lid: "#1E3A4F", note: "Holds up to 5 items" },
  { id: "trunk", name: "Keepsake trunk", price: 590, capacity: 7, color: "#E9DDC4", lid: "#D9C9A6", note: "Reusable, holds up to 7 items" },
];

export const ribbonOptions: RibbonOption[] = [
  { id: "wine", name: "Midnight satin", color: "#1E3A4F", price: 0 },
  { id: "blush", name: "Blush silk", color: "#E7B9B0", price: 40 },
  { id: "gold", name: "Gold organza", color: "#C9A55E", price: 60 },
  { id: "ivory", name: "Ivory grosgrain", color: "#F4EEE6", price: 40 },
];

export const cardOptions: CardOption[] = [
  { id: "none", name: "No card", price: 0, color: "transparent" },
  { id: "printed", name: "Printed card", price: 0, color: "#FAF8F5" },
  { id: "handwritten", name: "Handwritten card", price: 90, color: "#F5DFD9" },
];

export const giftBoxOccasions = ["Birthday", "Anniversary", "Thank you", "Wedding", "Diwali", "Baby shower", "Just because"];

// Products that can go inside a custom box but aren't sold alone
const boxExtras: P[] = [
  { slug: "dried-rose-jar", name: "Dried rose petal jar", vertical: "gifting", category: "keepsakes", price: 190, short: "A small glass jar of dried Kannauj rose petals.", tags: ["box-only"], occasions: [], collections: [], boxable: true, art: { kind: "trinket", stone: S.pink } },
  { slug: "mini-tara-studs", name: "Tara studs (gift size)", vertical: "gifting", category: "keepsakes", price: 349, short: "Our Tara star studs in a mini pouch.", tags: ["box-only"], occasions: [], collections: [], boxable: true, art: { kind: "stud", finish: "gold", stone: S.pearl } },
  { slug: "brass-diya", name: "Hand-beaten brass diya", vertical: "gifting", category: "home-and-candles", price: 290, short: "A small brass diya, hand-beaten in Moradabad.", tags: ["box-only"], occasions: [], collections: [], boxable: true, art: { kind: "candle", stone: "#C9A03A" } },
];
boxExtras.forEach((p) => products.push(make(p)));

export const ART_FALLBACK: ProductArt = { kind: "box", stone: S.pink };
