import type { ArtKind } from "@/lib/types";

/**
 * Real product-type photography (Unsplash License: free for commercial use) shown wherever a
 * product has no photos of its own yet. Every product and collection falls back to a photo from
 * the pool for its type, so the site never shows illustrations or generated images.
 *
 * Replace by adding real `images: ["/products/…jpg"]` to each product in src/data/catalog.ts;
 * those always win over this pool.
 */
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=85`;

export const photoPools: Record<string, string[]> = {
  earrings: [
    u("photo-1762686130435-897de4b26aac"), // rows of ornate jhumkas
    u("photo-1714733831162-0a6e849141be"), // silver and gold pair
    u("photo-1791311470258-12dbddb5bcba"), // purple jhumkas held up
    u("photo-1763578590148-fbac0711f3b2"), // adjusting an ornate earring
    u("photo-1648291531524-97afa1c2ac30"), // earrings, close-up
    u("photo-1778148046574-c1509f5a40d4"), // large ornate earrings with sari
    u("photo-1767971958465-16d986fad8df"), // silver with turquoise and pearl
    u("photo-1597055952513-4e9bce9345c3"), // drop earrings
    u("photo-1778148046645-62d1be9d1783"), // fixing earrings outdoors
  ],
  necklaces: [
    u("photo-1721103418312-b0057a8c31c2"), // gold necklace with pearls on red
    u("photo-1601121141461-9d6647bca1ed"), // gold and purple beaded
    u("photo-1651160670627-2896ddf7822f"), // gold and black necklace
    u("photo-1727947074642-0bd47ef70b58"), // necklaces with matching earrings
    u("photo-1600862754152-80a263dd564f"), // gold and red beaded
    u("photo-1601121141461-920cb1993441"), // worn necklace
    u("photo-1721807644561-9efcabee5c42"), // jewellery spread on a table
    u("photo-1601121141499-17ae80afc03a"), // gold and silver beaded
    u("flagged/photo-1570055349452-29232699cc63"), // gold necklace
    u("photo-1721206625226-c064ff8d92a7"), // jewellery on purple
    u("photo-1617191880362-aac615de3c26"), // gold and red beaded piece
    u("photo-1601121141418-c1caa10a2a0b"), // beaded, alternate
  ],
  face: [
    u("photo-1787831398033-d70495c1e8a4"), // ornate gold jewellery, nose ring, bindi
    u("photo-1631698532383-97ffe7c223c7"), // jewellery on the face, blue sari
    u("photo-1779475546066-742c9a580de1"), // smiling, traditional jewellery
    u("photo-1654764746225-e63f5e90facd"), // bride in red and gold
  ],
  hands: [
    u("photo-1758995116383-f51775896add"), // stack of ornate gold bangles
    u("photo-1763578590148-fbac0711f3b2"), // bangles and ring
    "https://images.pexels.com/photos/4105332/pexels-photo-4105332.jpeg?auto=compress&cs=srgb&w=2400", // mehendi hands with jewellery
  ],
  hair: [u("photo-1769103638683-6391a4490ec6"), u("photo-1778148046605-f5f2862a1450")],
  candles: [
    u("photo-1602874801007-bd458bb1b8b6"),
    u("photo-1757688525739-8d1e13daf44f"),
    u("photo-1661313562934-d902cb4ad0bb"),
    u("photo-1607284235728-e0d256e519f9"),
    u("photo-1587395455908-e178101fcdcd"),
    u("photo-1669334388727-9a3437e12fa2"),
    u("photo-1580578568379-f01ec38bba69"),
  ],
  gifts: [
    u("photo-1697717852279-cc39a8eb481a"), // red and pink boxes, gold bows
    u("photo-1608755727748-dfa2e44f255b"), // box on floral textile
    u("photo-1669994814741-fa5a07c97c67"), // blue gift box
    u("photo-1647221598398-934ed5cb0e4f"), // three colourful boxes
    u("photo-1694481901573-a970f982ac5e"), // black box, gold ribbon
    u("photo-1635166304779-8ebcfe8e57bd"), // white box, red ribbon, held
    u("photo-1647221598276-124ebb861536"), // three boxes on red
    u("photo-1694481903606-822baa14f7ab"), // wrapped presents on a table
    u("photo-1697719274531-5b647347a1ed"), // black boxes, blue bows
    u("photo-1578704694513-08946e996642"), // white box beside a plant
    u("photo-1544377208-215a63786183"), // wrapping a white box
    u("photo-1453834190665-46ff0a1fbd5a"), // brown and black box
    u("photo-1672853827236-e2ccf90761a1"), // orange wrapped box
  ],
};

const POOL_FOR: Record<ArtKind, keyof typeof photoPools> = {
  jhumka: "earrings", chandbali: "earrings", stud: "earrings", hoop: "earrings", drop: "earrings",
  necklace: "necklaces", choker: "necklaces",
  tikka: "face", mathapatti: "face", passa: "face", nath: "face",
  bangles: "hands", kada: "hands", haathphool: "hands", bracelet: "hands", anklet: "hands",
  hairpin: "hair",
  candle: "candles",
  box: "gifts", hamper: "gifts", pouch: "gifts", mug: "gifts", diary: "gifts", plant: "gifts",
  frame: "gifts", chocolate: "gifts", trinket: "gifts", card: "gifts",
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** A stable photo for a product type; `seed` (usually the product name) spreads items across the pool. */
export function photoFor(kind: ArtKind, seed: string, offset = 0) {
  const pool = photoPools[POOL_FOR[kind] ?? "gifts"];
  return pool[(hash(seed) + offset) % pool.length];
}
