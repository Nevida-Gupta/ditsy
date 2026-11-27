import Link from "next/link";
export function SectionHead({ title, line, href, cta, dark }: { title: string; line?: string; href?: string; cta?: string; dark?: boolean }) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className={`display-l ${dark ? "text-pearl" : "text-midnight"}`}>{title}</h2>
        {line && <p className={`mt-3 max-w-[52ch] text-[17px] ${dark ? "text-pearl/70" : "text-ink/65"}`}>{line}</p>}
      </div>
      {href && <Link href={href} className={`link shrink-0 text-[15px] ${dark ? "text-champagne" : "text-midnight"}`}>{cta ?? "View all"}</Link>}
    </div>
  );
}
