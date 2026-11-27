export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

export const discountPct = (price: number, compareAt?: number) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
