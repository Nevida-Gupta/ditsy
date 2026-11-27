export const site = {
  name: "Ditsy",
  tagline: "Wear it. Give it. Keep it.",
  positioning: "Thoughtfully curated treasures for every occasion.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ditsy.in",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  consultationUrl: process.env.NEXT_PUBLIC_CONSULTATION_URL || "",
  email: "hello@ditsy.in",
  // Update once the Instagram handle is confirmed
  instagram: "https://instagram.com/ditsy.in",
  instagramHandle: "@ditsy.in",
  freeShippingAbove: 999,
  shippingFee: 79,
  codFee: 49,
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
