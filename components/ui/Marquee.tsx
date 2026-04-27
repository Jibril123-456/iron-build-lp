import { siteConfig } from "@/config/site";

export function Marquee() {
  const m = siteConfig.marquee;
  if (!m.enabled || m.items.length === 0) return null;

  // duplicate so the loop seems infinite
  const sequence = [...m.items, ...m.items];

  return (
    <section
      aria-hidden
      className="section-dark relative overflow-hidden border-y border-[#262626] py-5"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {sequence.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 text-sm md:text-base font-display font-semibold uppercase tracking-[0.18em]"
          >
            <span>{item}</span>
            <span className="text-[#ff0000]" aria-hidden>
              ●
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
