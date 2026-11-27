export type SP = { [k: string]: string | string[] | undefined };
export const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
export function priceRange(v?: string) {
  if (!v) return {};
  const [a, b] = v.split("-").map(Number);
  return { min: isNaN(a) ? undefined : a, max: isNaN(b) ? undefined : b };
}
