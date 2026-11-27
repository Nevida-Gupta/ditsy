/** Token derived from ADMIN_PASSWORD; works in both the Node and Edge runtimes. Replace with real auth (NextAuth/Clerk) before inviting staff. */
export async function adminToken() {
  const data = new TextEncoder().encode(`ditsy-admin:${process.env.ADMIN_PASSWORD ?? ""}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
