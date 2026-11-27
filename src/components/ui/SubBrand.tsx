import { Wordmark } from "./Wordmark";
import { cx } from "@/lib/format";

/** Ditsy master wordmark with the vertical name set beneath, as a lockup. */
export function SubBrand({ name, tone = "light", className }: { name: "Jewellery" | "Gifting"; tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cx("inline-flex flex-col items-start leading-none", className)}>
      <Wordmark className="text-[2.6rem]" jewel={name === "Jewellery" ? "#C29B57" : "#C7787E"} />
      <span className={cx("mt-1.5 pl-0.5 text-[13px] tracking-[0.32em]", tone === "light" ? "text-pearl/80" : "text-midnight/70")}>{name.toLowerCase()}</span>
    </span>
  );
}
