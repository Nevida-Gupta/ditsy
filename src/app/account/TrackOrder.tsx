"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function TrackOrder() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form className="mt-8 grid max-w-md gap-4" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true); setErr("");
      const f = Object.fromEntries(new FormData(e.currentTarget));
      const res = await fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const j = await res.json().catch(() => ({}));
      if (res.ok) router.push(`/order/${j.id}`); else { setErr(j.error); setBusy(false); }
    }}>
      <div><label className="label" htmlFor="t-id">Order number</label><input id="t-id" name="id" required placeholder="DTY-261127-A1B2C3" className="field uppercase" /></div>
      <div><label className="label" htmlFor="t-ph">Mobile number</label><input id="t-ph" name="phone" required inputMode="tel" className="field" /></div>
      {err && <p className="text-sm text-rose" role="alert">{err}</p>}
      <button className="btn-wine justify-self-start" disabled={busy}>{busy ? "Looking…" : "Find my order"}</button>
    </form>
  );
}
