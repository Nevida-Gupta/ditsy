import type { Metadata } from "next";
import { CheckoutView } from "./CheckoutView";
import { razorpayEnabled } from "@/lib/server/razorpay";
export const metadata: Metadata = { title: "Checkout", robots: { index: false } };
export const dynamic = "force-dynamic";
export default function Checkout() { return <CheckoutView onlineEnabled={razorpayEnabled()} />; }
