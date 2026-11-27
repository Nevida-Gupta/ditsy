# Ditsy — ditsy.in

Premium jewellery and gifting D2C site. Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · React Three Fiber · Zod · Zustand. Brand and creative direction: see `BRAND.md`.

## Run it

```bash
cp .env.example .env.local   # fill in what you have; everything is optional for local dev
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```
Admin: `/admin` (password = `ADMIN_PASSWORD`).

## What's in the box

| Area | Routes |
|---|---|
| Master brand | `/` (16-section homepage), `/about`, `/occasions`, `/occasions/[slug]` |
| Jewellery | `/jewellery`, `/collections/[slug]` (categories + edits like The Jhumka Edit, Under ₹499), `/product/[slug]`, `/bundles` |
| Gifting | `/gifting`, `/gifting/return-gifts` (by budget per person), `/build-your-box`, `/bulk-gifting` |
| Commerce | bag drawer, `/cart`, `/checkout`, `/order/[id]`, `/wishlist`, `/search`, `/account` (order tracking) |
| Content | `/policies/shipping`, `/policies/returns`, `/policies/care`, `sitemap.xml`, `robots.txt`, JSON-LD |
| Admin | `/admin`: overview, orders, bulk enquiries (status pipeline), jewellery and gifting products, merchandising, gift-box options, coupons, review moderation, subscribers |

## Feature status — working vs planned

**Working now**
- Homepage photo hero: "Wear it. Give it. Keep it." slider with real lifestyle photography, slow cross-fade, swipe, keyboard and reduced-motion support.
- 3D product viewer (drag to rotate, zoom), shown only when a product has a real `.glb` scan in `model3d`.
- Build-your-own gift box: occasion → box → items (capacity-limited) → ribbon → card + message → live preview and running price → quantity → add to bag or send as enquiry.
- Bundles at combined prices; "complete the look" on product pages.
- Filters and sort, wishlist, bag, coupons (`DITSY10`, `WELCOME200`, `BRIDE15`, `FREESHIP`), free-shipping threshold, COD fee.
- Checkout with server-side re-pricing and stock checks (client prices are never trusted). Cash on delivery works end to end.
- Bulk enquiry with validation, WhatsApp enquiry deep-link, consultation link.
- Reviews (submitted → pending moderation in admin), newsletter, order tracking.
- Surprise gift messaging on every jewellery order.

**Needs keys or setup (code is in place)**
- Razorpay online payments: set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`. Order creation + signature verification are implemented in `src/lib/server/razorpay.ts` and `/api/payments/verify`. Until set, checkout says online payment isn't on yet and offers COD.
- WhatsApp number and consultation booking URL: `.env`.

**Planned (clearly labelled on the site)**
- Database: orders/enquiries/reviews currently persist as JSON in `./.data` (fine on one server, NOT on Vercel serverless). Point `src/lib/server/store.ts` and `src/lib/catalog.ts` at Postgres via `prisma/schema.prisma`. Page code doesn't change.
- Admin editors for products, prices, stock, collections, bundles, coupons, banners: read-only until the DB is connected.
- Customer accounts (mobile OTP), synced wishlist.
- Virtual try-on / AR: needs studio photography and real 3D scans (`.glb` per product → set `model3d`).
- Order emails/SMS (Resend / MSG91), shipping integration (Shiprocket).

## Replacing sample content

- **Catalogue:** `src/data/catalog.ts` — products, categories, collections, bundles, occasions, return-gift combos, gift-box options. Prices, names and descriptions are sample data to replace with the real stock.
- **Stand-in product photos:** `src/data/photos.ts` maps each product type to a pool of real free-licence photos so nothing on the site is illustrated or generated. Your own `images` always win.
- **Lifestyle photos:** `src/data/imagery.ts` (currently free-licence Unsplash/Pexels placeholders). Swap to your own shoot in `/public/lifestyle/` and remove the remote domains from `next.config.mjs`.
- **Product photos:** add `images: ["/products/slug-1.jpg", ...]` to a product; it replaces the illustration everywhere.
- **3D:** put a `.glb` in `public/models/` and set `model3d: "/models/name.glb"`.
- **Testimonials and seeded reviews are samples.** Replace with real customer reviews before launch.
- **Instagram handle, email, shipping fees:** `src/lib/site.ts`.

## Before launch checklist
1. Real catalogue + photography, remove sample reviews/testimonials.
2. Postgres + Prisma, move store/catalog modules.
3. Razorpay live keys + webhook.
4. Proper admin auth (replace the single password with email login and roles from the schema).
5. Legal: privacy policy, terms, GST details in footer and invoices.
6. Lighthouse pass on real photography (use `next/image` with AVIF/WebP).
