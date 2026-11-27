"use client";
import { useState } from "react";
import { cx } from "@/lib/format";

export function Newsletter({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("busy");
    const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) { setState("done"); setMsg("You're on the list. Your first letter has a welcome code."); }
    else { setState("error"); setMsg(j.error || "Enter a valid email address."); }
  };
  if (state === "done") return <p className={cx("mt-6 text-[15px]", dark ? "text-champagne" : "text-midnight")} role="status">{msg}</p>;
  return (
    <form onSubmit={submit} className="mt-6 flex max-w-md gap-2">
      <label htmlFor={dark ? "nl-f" : "nl"} className="sr-only">Email address</label>
      <input id={dark ? "nl-f" : "nl"} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email"
        className={cx("min-w-0 flex-1 rounded-full border px-5 py-3 text-[15px] focus:outline-none", dark ? "border-pearl/20 bg-transparent text-pearl placeholder:text-pearl/40 focus:border-champagne" : "border-midnight/20 bg-white/60 placeholder:text-ink/40 focus:border-midnight")} />
      <button className={dark ? "btn-pearl" : "btn-wine"} disabled={state === "busy"}>{state === "busy" ? "Joining…" : "Subscribe"}</button>
      {state === "error" && <p className="sr-only" role="alert">{msg}</p>}
    </form>
  );
}
