import type { Metadata } from "next";
import Link from "next/link";
import { list } from "@/lib/server/store";
import type { Enquiry, Order } from "@/lib/server/types";
import { getAllProductsSync, getBundles, getCategories, getCollections, builderOptions } from "@/lib/catalog";
import { coupons } from "@/lib/pricing";
import { inr, cx } from "@/lib/format";
import { setEnquiryStatus, setOrderStatus, setReviewStatus } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

const TABS = [
  ["overview", "Overview"], ["orders", "Orders"], ["enquiries", "Bulk enquiries"], ["jewellery", "Jewellery products"], ["gifting", "Gifting products"],
  ["merch", "Categories, collections & bundles"], ["builder", "Gift box options"], ["coupons", "Coupons"], ["reviews", "Reviews"], ["subscribers", "Subscribers"],
] as const;

const ORDER_STATUSES = ["pending_payment", "paid", "confirmed_cod", "packed", "shipped", "delivered", "cancelled"];
const ENQ_STATUSES = ["new", "contacted", "quoted", "won", "lost"];

type Review = { id: string; productSlug: string; name: string; rating: number; text: string; status: string; createdAt: string };

export default async function Admin({ searchParams }: { searchParams: { tab?: string } }) {
  const tab = searchParams.tab ?? "overview";
  const [orders, enquiries, reviews, subs] = await Promise.all([list<Order>("orders"), list<Enquiry>("enquiries"), list<Review>("reviews"), list<{ id: string; email: string; createdAt: string }>("subscribers")]);
  const products = getAllProductsSync();
  const revenue = orders.filter((o) => o.status !== "cancelled" && o.status !== "pending_payment").reduce((s, o) => s + o.totals.total, 0);
  const lowStock = products.filter((p) => (p.variants ? p.variants.reduce((s, v) => s + v.stock, 0) : p.stock) <= 5);

  return (
    <section className="wrap py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-midnight">Ditsy admin</h1>
        <form action="/api/admin/logout" method="post"><button className="text-sm underline">Sign out</button></form>
      </div>
      <p className="mt-3 max-w-3xl rounded-xl bg-champagne/40 px-4 py-3 text-[14px] text-ink/75">
        Orders, enquiries and reviews update live. Products, prices, stock, collections, bundles, coupons and banners are read from <code>src/data/catalog.ts</code> until the database is connected; the editors switch on in the next phase, using the schema in <code>prisma/schema.prisma</code>.
      </p>
      <nav className="no-scrollbar mt-6 flex gap-1 overflow-x-auto border-b border-midnight/10">
        {TABS.map(([k, l]) => (
          <Link key={k} href={`/admin?tab=${k}`} className={cx("shrink-0 rounded-t-lg px-4 py-2.5 text-[14px]", tab === k ? "bg-midnight text-pearl" : "text-ink/60 hover:text-ink")}>{l}</Link>
        ))}
      </nav>

      <div className="mt-8 overflow-x-auto">
        {tab === "overview" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["Orders", orders.length], ["Revenue (confirmed)", inr(revenue)], ["Open enquiries", enquiries.filter((e) => e.status === "new" || e.status === "contacted").length], ["Low-stock products", lowStock.length], ["Products live", products.filter((p) => !p.tags.includes("box-only")).length], ["Reviews awaiting approval", reviews.filter((r) => r.status === "pending").length], ["Subscribers", subs.length], ["Bundles", (await getBundles()).length]].map(([l, v]) => (
              <div key={String(l)} className="rounded-2xl bg-white/60 p-5"><p className="text-[13px] text-ink/55">{l}</p><p className="mt-1 font-display text-3xl text-midnight">{v}</p></div>
            ))}
          </div>
        )}

        {tab === "orders" && (
          <Table head={["Order", "Date", "Customer", "Items", "Total", "Payment", "Status"]} empty="No orders yet. Place a test order from the shop to see it here.">
            {orders.map((o) => (
              <tr key={o.id} className="align-top">
                <td><Link className="underline" href={`/order/${o.id}`}>{o.id}</Link></td>
                <td>{new Date(o.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                <td>{o.address.name}<br /><span className="text-ink/50">{o.address.phone}, {o.address.city}</span></td>
                <td>{o.lines.map((l) => `${l.name} × ${l.qty}`).join(", ")}{o.giftNote && <><br /><em className="text-ink/50">Gift note: {o.giftNote}</em></>}</td>
                <td>{inr(o.totals.total)}{o.coupon && <><br /><span className="text-ink/50">{o.coupon}</span></>}</td>
                <td>{o.payment === "cod" ? "COD" : "Online"}</td>
                <td><StatusForm action={setOrderStatus} id={o.id} value={o.status} options={ORDER_STATUSES} /></td>
              </tr>
            ))}
          </Table>
        )}

        {tab === "enquiries" && (
          <Table head={["Ref", "Received", "Contact", "Occasion", "Qty", "Budget", "City & date", "Notes", "Status"]} empty="No enquiries yet.">
            {enquiries.map((e) => (
              <tr key={e.id} className="align-top">
                <td>{e.id}<br /><span className="text-ink/50">{e.type}</span></td>
                <td>{new Date(e.createdAt).toLocaleDateString("en-IN")}</td>
                <td>{e.name}<br /><a className="underline" href={`https://wa.me/${e.phone.replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}`} target="_blank" rel="noreferrer">{e.phone}</a>{e.email && <><br />{e.email}</>}{e.company && <><br />{e.company}</>}</td>
                <td>{e.occasion}</td>
                <td>{e.quantity}</td>
                <td>{e.budgetPerGift}</td>
                <td>{e.city}<br />{e.deliveryDate}</td>
                <td className="max-w-xs">{e.customisation}{e.details && <pre className="mt-1 whitespace-pre-wrap text-[12px] text-ink/50">{JSON.stringify(e.details, null, 1)}</pre>}</td>
                <td><StatusForm action={setEnquiryStatus} id={e.id} value={e.status} options={ENQ_STATUSES} /></td>
              </tr>
            ))}
          </Table>
        )}

        {(tab === "jewellery" || tab === "gifting") && (
          <Table head={["ID", "Name", "Category", "Price", "Stock", "Collections", "Flags"]} empty="">
            {products.filter((p) => p.vertical === tab).map((p) => {
              const stock = p.variants ? p.variants.map((v) => `${v.label}: ${v.stock}`).join(", ") : String(p.stock);
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td><Link className="underline" href={`/product/${p.slug}`}>{p.name}</Link></td>
                  <td>{p.category}</td>
                  <td>{inr(p.price)}{p.compareAt && <span className="text-ink/40 line-through"> {inr(p.compareAt)}</span>}</td>
                  <td className={cx(lowStock.includes(p) && "text-rose")}>{stock}</td>
                  <td>{p.collections.join(", ")}</td>
                  <td>{[p.isNew && "new", p.bestseller && "bestseller", p.boxable && "in builder", p.model3d && "3D", p.tags.includes("box-only") && "builder only"].filter(Boolean).join(", ")}</td>
                </tr>
              );
            })}
          </Table>
        )}

        {tab === "merch" && <Merch />}

        {tab === "builder" && (
          <div className="grid gap-8 md:grid-cols-3">
            {([["Boxes", builderOptions.boxes.map((b) => `${b.name}: ${inr(b.price)}, ${b.capacity} items`)], ["Ribbons", builderOptions.ribbons.map((r) => `${r.name}: ${r.price ? inr(r.price) : "free"}`)], ["Cards", builderOptions.cards.map((c) => `${c.name}: ${c.price ? inr(c.price) : "free"}`)]] as const).map(([t, rows]) => (
              <div key={t} className="rounded-2xl bg-white/60 p-5"><p className="font-display text-xl text-midnight">{t}</p><ul className="mt-2 space-y-1 text-[14px]">{rows.map((r) => <li key={r}>{r}</li>)}</ul></div>
            ))}
          </div>
        )}

        {tab === "coupons" && (
          <Table head={["Code", "What it does", "Minimum", "Applies to"]} empty="">
            {coupons.map((c) => (<tr key={c.code}><td className="font-medium">{c.code}</td><td>{c.label}</td><td>{c.min ? inr(c.min) : "None"}</td><td>{c.vertical ?? "Everything"}</td></tr>))}
          </Table>
        )}

        {tab === "reviews" && (
          <Table head={["Product", "Name", "Rating", "Review", "Status"]} empty="No customer-submitted reviews yet.">
            {reviews.map((r) => (
              <tr key={r.id} className="align-top"><td>{r.productSlug}</td><td>{r.name}</td><td>{r.rating}</td><td className="max-w-md">{r.text}</td><td><StatusForm action={setReviewStatus} id={r.id} value={r.status} options={["pending", "approved", "hidden"]} /></td></tr>
            ))}
          </Table>
        )}

        {tab === "subscribers" && (
          <Table head={["Email", "Joined"]} empty="No subscribers yet.">
            {subs.map((s) => (<tr key={s.id}><td>{s.email}</td><td>{new Date(s.createdAt).toLocaleDateString("en-IN")}</td></tr>))}
          </Table>
        )}
      </div>
    </section>
  );
}

function Table({ head, children, empty }: { head: string[]; children: React.ReactNode; empty: string }) {
  const rows = Array.isArray(children) ? children.length : children ? 1 : 0;
  if (!rows && empty) return <p className="py-10 text-ink/60">{empty}</p>;
  return (
    <table className="w-full min-w-[900px] text-left text-[14px] [&_td]:border-b [&_td]:border-midnight/10 [&_td]:px-3 [&_td]:py-3 [&_th]:px-3 [&_th]:pb-2 [&_th]:font-normal [&_th]:text-ink/55">
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function StatusForm({ action, id, value, options }: { action: (f: FormData) => Promise<void>; id: string; value: string; options: string[] }) {
  return (
    <form action={action} className="flex gap-2">
      <input type="hidden" name="id" value={id} />
      <select name="status" defaultValue={value} className="rounded-lg border border-midnight/20 bg-white px-2 py-1">{options.map((o) => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}</select>
      <button className="rounded-lg bg-midnight px-3 py-1 text-pearl">Save</button>
    </form>
  );
}

async function Merch() {
  const [cats, cols, bundles] = await Promise.all([getCategories(), getCollections(), getBundles()]);
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div><p className="font-display text-2xl text-midnight">Categories ({cats.length})</p><ul className="mt-3 space-y-1 text-[14px]">{cats.map((c) => <li key={c.slug}>{c.vertical === "jewellery" ? "J" : "G"} / {c.group} / {c.name}</li>)}</ul></div>
      <div><p className="font-display text-2xl text-midnight">Collections ({cols.length})</p><ul className="mt-3 space-y-1 text-[14px]">{cols.map((c) => <li key={c.slug}><Link className="underline" href={`/collections/${c.slug}`}>{c.name}</Link></li>)}</ul></div>
      <div><p className="font-display text-2xl text-midnight">Bundles ({bundles.length})</p><ul className="mt-3 space-y-1 text-[14px]">{bundles.map((b) => <li key={b.slug}>{b.name}: {inr(b.price)} ({b.productSlugs.length} pieces)</li>)}</ul></div>
    </div>
  );
}
