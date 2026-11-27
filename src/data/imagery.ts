/**
 * Lifestyle photography used across the homepage.
 *
 * These are free-licence placeholders (Unsplash License / Pexels License: commercial use allowed,
 * no attribution required, but credits are kept here as good practice). Replace each `src` with
 * Ditsy's own shoot (put files in /public/lifestyle/ and use "/lifestyle/name.jpg") before launch,
 * so the site shows your pieces, not someone else's jewellery.
 */
export interface LifestyleImage {
  src: string;
  alt: string;
  /** CSS object-position, so faces stay in frame when cropped */
  focus?: string;
  credit: string;
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=85`;
const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=srgb&w=2400`;

export const imagery = {
  laughingSari: {
    src: unsplash("flagged/photo-1551854716-8b811be39e7e"),
    alt: "A woman in a green, gold and red silk sari and bangles, laughing and half hiding her face",
    focus: "50% 30%",
    credit: "Bella Pon Fruitsia, Unsplash",
  },
  bride: {
    src: unsplash("photo-1654764746225-e63f5e90facd"),
    alt: "A bride in a red and gold outfit wearing traditional jewellery, Jaipur",
    focus: "50% 25%",
    credit: "Harsh Gupta, Unsplash",
  },
  openingGift: {
    src: pexels(4920957),
    alt: "A smiling woman opening a beautifully wrapped gift",
    focus: "50% 35%",
    credit: "Pexels",
  },
  goldNecklace: {
    src: unsplash("photo-1769103638683-6391a4490ec6"),
    alt: "A woman in a sari with a gold necklace and flowers in her hair",
    focus: "50% 30%",
    credit: "Ajoy Das, Unsplash",
  },
  tyingRibbon: {
    src: pexels(10336057),
    alt: "Hands tying a pink ribbon around a gift box",
    focus: "50% 50%",
    credit: "Pexels",
  },
  mehendiHands: {
    src: pexels(4105332),
    alt: "Hands with bridal mehendi and jewellery at a wedding",
    focus: "50% 50%",
    credit: "Nishant M. Patel, Pexels",
  },
  friends: {
    src: pexels(18716784),
    alt: "Two friends in sparkling festive outfits laughing together outdoors",
    focus: "50% 30%",
    credit: "Ansh Rajput, Pexels",
  },
  floralPortrait: {
    src: pexels(18716785),
    alt: "A young woman in a floral outfit wearing statement jewellery",
    focus: "50% 25%",
    credit: "Ansh Rajput, Pexels",
  },
  henna: {
    src: pexels(18682272),
    alt: "A bride showing her henna and bangles",
    focus: "50% 40%",
    credit: "Ansh Rajput, Pexels",
  },
  smilingBride: {
    src: pexels(18716786),
    alt: "A smiling bride outdoors in an elegant outfit and jewellery",
    focus: "50% 25%",
    credit: "Ansh Rajput, Pexels",
  },
  eveningPortrait: {
    src: pexels(18716783),
    alt: "Women dressed up for an evening celebration",
    focus: "50% 30%",
    credit: "Ansh Rajput, Pexels",
  },
  exchangingGifts: {
    src: pexels(8910377),
    alt: "Two people exchanging colourfully wrapped gift boxes outdoors",
    focus: "50% 50%",
    credit: "Pexels",
  },
  earringAdjust: {
    src: unsplash("photo-1763578590148-fbac0711f3b2"),
    alt: "A woman fastening an ornate earring, wearing bangles and a ring",
    focus: "50% 35%",
    credit: "Nupur Batra, Unsplash",
  },
  jhumkaRows: {
    src: unsplash("photo-1762686130435-897de4b26aac"),
    alt: "Rows of ornate jhumka earrings",
    focus: "50% 50%",
    credit: "Surya Teja, Unsplash",
  },
  necklaceOnRed: {
    src: unsplash("photo-1721103418312-b0057a8c31c2"),
    alt: "A gold necklace with pearls on a red ground",
    focus: "50% 50%",
    credit: "Prahant Studio, Unsplash",
  },
  noseRing: {
    src: unsplash("photo-1787831398033-d70495c1e8a4"),
    alt: "A woman in ornate gold jewellery with a nose ring and bindi",
    focus: "50% 35%",
    credit: "Picture & Poet, Unsplash",
  },
  giftBoxes: {
    src: unsplash("photo-1697717852279-cc39a8eb481a"),
    alt: "Red and pink gift boxes tied with gold bows",
    focus: "50% 50%",
    credit: "Igor Omilaev, Unsplash",
  },
  candle: {
    src: unsplash("photo-1602874801007-bd458bb1b8b6"),
    alt: "A white candle in a clear glass holder",
    focus: "50% 50%",
    credit: "Joyce G, Unsplash",
  },
} satisfies Record<string, LifestyleImage>;

/** The tagline, told as three photographs: Wear it. Give it. Keep it. */
export const heroSlides = [
  {
    image: imagery.laughingSari,
    word: "Wear it.",
    title: "Jewellery with a point of view",
    body: "Jhumkas, chandbalis and sets chosen one at a time in Delhi’s old markets. Never a thousand of the same.",
    cta: { label: "Shop jewellery", href: "/jewellery" },
    alt: { label: "The Jhumka Edit", href: "/collections/jhumka-edit" },
  },
  {
    image: imagery.openingGift,
    word: "Give it.",
    title: "Gifts that feel chosen, not ordered",
    body: "Hampers, keepsakes and return gifts, wrapped so opening them is part of the present.",
    cta: { label: "Find a gift", href: "/gifting" },
    alt: { label: "Build your own box", href: "/build-your-box" },
  },
  {
    image: imagery.bride,
    word: "Keep it.",
    title: "The pieces that end up in the wedding album",
    body: "Bridal sets, maang tikkas and passas for every function from haldi to reception.",
    cta: { label: "Shop the wedding edit", href: "/occasions/wedding" },
    alt: { label: "Complete bridal bundles", href: "/bundles" },
  },
];
