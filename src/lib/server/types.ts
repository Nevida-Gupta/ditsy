import type { CartLine } from "../pricing";

export interface Address {
  name: string; phone: string; email: string; line1: string; line2?: string;
  city: string; state: string; pincode: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: "pending_payment" | "paid" | "confirmed_cod" | "packed" | "shipped" | "delivered" | "cancelled";
  payment: "online" | "cod";
  lines: CartLine[];
  totals: { subtotal: number; discount: number; shipping: number; codFee: number; total: number };
  coupon?: string | null;
  address: Address;
  giftNote?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
}

export interface Enquiry {
  id: string;
  createdAt: string;
  type: "bulk" | "giftbox" | "return-gift";
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  name: string; phone: string; email?: string; company?: string;
  occasion?: string; quantity?: number; budgetPerGift?: string; city?: string; deliveryDate?: string;
  customisation?: string; details?: Record<string, unknown>;
}
