import type { Metadata } from "next";
export const metadata: Metadata = { title: "Admin sign in", robots: { index: false } };
export default function AdminLogin({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <section className="wrap grid min-h-[60vh] place-items-center py-16">
      <form action="/api/admin/login" method="post" className="w-full max-w-sm rounded-[28px] bg-sand/60 p-8">
        <h1 className="font-display text-3xl text-midnight">Ditsy admin</h1>
        <label htmlFor="pw" className="label mt-6">Password</label>
        <input id="pw" name="password" type="password" required className="field" autoComplete="current-password" />
        {searchParams.error && <p className="mt-2 text-sm text-rose" role="alert">That password didn&rsquo;t match. Check ADMIN_PASSWORD in your environment.</p>}
        <button className="btn-wine mt-6 w-full">Sign in</button>
      </form>
    </section>
  );
}
