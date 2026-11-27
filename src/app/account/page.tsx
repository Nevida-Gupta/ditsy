import type { Metadata } from "next";
import { TrackOrder } from "./TrackOrder";
export const metadata: Metadata = { title: "Your account", robots: { index: false } };
export default function Account() {
  return (
    <section className="wrap grid gap-12 py-16 md:grid-cols-2">
      <div>
        <h1 className="display-l text-midnight">Track an order</h1>
        <p className="lede mt-3">Enter the order number from your confirmation and the mobile number you used at checkout.</p>
        <TrackOrder />
      </div>
      <div className="rounded-[28px] bg-sand/60 p-8">
        <h2 className="font-display text-3xl text-midnight">Ditsy accounts</h2>
        <p className="mt-3 text-ink/70">Sign in with your mobile number, saved addresses, order history and a wishlist that follows you between devices are coming with our launch. Until then, checkout works without an account and your wishlist is saved on this device.</p>
      </div>
    </section>
  );
}
