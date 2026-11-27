import "server-only";
import crypto from "crypto";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

export const razorpayEnabled = () => Boolean(keyId && keySecret);

/** Creates a Razorpay order via the REST API. Amount in rupees. */
export async function createRazorpayOrder(amountInr: number, receipt: string) {
  if (!keyId || !keySecret) throw new Error("Razorpay is not configured");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
    },
    body: JSON.stringify({ amount: Math.round(amountInr * 100), currency: "INR", receipt }),
  });
  if (!res.ok) throw new Error(`Razorpay error ${res.status}`);
  return (await res.json()) as { id: string; amount: number; currency: string };
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  if (!keySecret) return false;
  const expected = crypto.createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
