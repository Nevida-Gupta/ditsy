import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="display-l text-midnight">This page wandered off</p>
        <p className="lede mx-auto mt-4">The link may be old, or the piece has sold out for good. Everything else is right where we left it.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/jewellery" className="btn-wine">Shop jewellery</Link>
          <Link href="/gifting" className="btn-line text-midnight">Explore gifting</Link>
        </div>
      </div>
    </section>
  );
}
