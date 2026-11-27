"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/lib/pricing";

type NewLine = CartLine extends infer L ? (L extends CartLine ? Omit<L, "key" | "qty"> & { qty?: number } : never) : never;

interface ShopState {
  lines: CartLine[];
  wishlist: string[];
  coupon: string | null;
  bagOpen: boolean;
  toast: string | null;
  add: (line: NewLine) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  setCoupon: (c: string | null) => void;
  toggleWish: (slug: string) => void;
  openBag: (open: boolean) => void;
  showToast: (t: string | null) => void;
}

const lineKey = (l: NewLine) => {
  if (l.kind === "product") return `p:${l.slug}:${l.variantId ?? ""}`;
  if (l.kind === "bundle") return `b:${l.slug}`;
  return `g:${JSON.stringify(l.config)}`;
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      lines: [],
      wishlist: [],
      coupon: null,
      bagOpen: false,
      toast: null,
      add: (line) => {
        const key = lineKey(line);
        const qty = line.qty ?? 1;
        const existing = get().lines.find((l) => l.key === key);
        if (existing) {
          set({ lines: get().lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)) });
        } else {
          set({ lines: [...get().lines, { ...line, key, qty } as CartLine] });
        }
        set({ bagOpen: true });
      },
      setQty: (key, qty) =>
        set({ lines: qty < 1 ? get().lines.filter((l) => l.key !== key) : get().lines.map((l) => (l.key === key ? { ...l, qty } : l)) }),
      remove: (key) => set({ lines: get().lines.filter((l) => l.key !== key) }),
      clear: () => set({ lines: [], coupon: null }),
      setCoupon: (coupon) => set({ coupon }),
      toggleWish: (slug) => {
        const has = get().wishlist.includes(slug);
        set({ wishlist: has ? get().wishlist.filter((s) => s !== slug) : [...get().wishlist, slug], toast: has ? "Removed from wishlist" : "Saved to wishlist" });
      },
      openBag: (bagOpen) => set({ bagOpen }),
      showToast: (toast) => set({ toast }),
    }),
    { name: "ditsy-shop", partialize: (s) => ({ lines: s.lines, wishlist: s.wishlist, coupon: s.coupon }) },
  ),
);
