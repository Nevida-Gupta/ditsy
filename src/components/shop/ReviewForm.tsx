"use client";
import { useState } from "react";
import { StarIcon } from "@/components/ui/Icons";
import { cx } from "@/lib/format";

export function ReviewForm({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  if (state === "done") return <p className="rounded-2xl bg-blush/50 p-5 text-midnight" role="status">Thank you. Your review will appear once we&rsquo;ve checked it, usually within a day.</p>;
  if (!open) return <button className="btn-line text-midnight" onClick={() => setOpen(true)}>Write a review</button>;
  return (
    <form className="grid max-w-xl gap-4 rounded-2xl border border-midnight/10 p-5" onSubmit={async (e) => {
      e.preventDefault();
      setState("busy");
      const f = new FormData(e.currentTarget);
      const res = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productSlug: slug, rating, name: f.get("name"), city: f.get("city"), text: f.get("text") }) });
      if (res.ok) setState("done"); else { const j = await res.json().catch(() => ({})); setErr(j.error || "Check the fields and try again."); setState("error"); }
    }}>
      <fieldset>
        <legend className="label">Your rating</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={rating === n} className={cx("text-gold", n > rating && "opacity-30")}><StarIcon className="h-7 w-7" /></button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor="rv-name">Name</label><input id="rv-name" name="name" required minLength={2} className="field" /></div>
        <div><label className="label" htmlFor="rv-city">City</label><input id="rv-city" name="city" className="field" /></div>
      </div>
      <div><label className="label" htmlFor="rv-text">Your review</label><textarea id="rv-text" name="text" required minLength={10} rows={4} className="field" /></div>
      {state === "error" && <p className="text-sm text-rose" role="alert">{err}</p>}
      <button className="btn-wine justify-self-start" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Submit review"}</button>
    </form>
  );
}
