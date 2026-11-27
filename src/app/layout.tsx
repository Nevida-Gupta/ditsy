import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource-variable/jost/wght.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BagDrawer } from "@/components/layout/BagDrawer";
import { Toast } from "@/components/layout/Toast";
import { getCategories, getCollections, getOccasions } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Ditsy | Statement jewellery and thoughtful gifting", template: "%s | Ditsy" },
  description: "Ditsy curates distinctive artificial jewellery and premium gifts for weddings, festivals and every day in between. Jhumkas, bridal sets, return gifts, hampers and bulk gifting across India.",
  openGraph: { type: "website", siteName: "Ditsy", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0E1F2E", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [jewelleryCats, giftingCats, jewelleryCols, giftingCols, occasions] = await Promise.all([
    getCategories("jewellery"), getCategories("gifting"), getCollections("jewellery"), getCollections("gifting"), getOccasions(),
  ]);
  return (
    <html lang="en-IN">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-pearl focus:px-4 focus:py-2">Skip to content</a>
        <Header menu={{ jewelleryCats, giftingCats, jewelleryCols, giftingCols, occasions }} />
        <main id="main">{children}</main>
        <Footer />
        <BagDrawer />
        <Toast />
      </body>
    </html>
  );
}
