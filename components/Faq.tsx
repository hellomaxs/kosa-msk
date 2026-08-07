import { faq } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  return (
    <section id="faq" className="border-t border-border px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-foreground/55">
            Вопросы
          </p>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] leading-tight font-medium">
            Что спрашивают чаще всего
          </h2>
        </Reveal>

        <div className="mt-14 max-w-3xl">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="group border-b border-foreground/20 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="relative h-4 w-4 shrink-0">
                    <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-foreground/70" />
                    <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 rotate-90 bg-foreground/70 transition-transform duration-300 group-open:rotate-0" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/75">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
