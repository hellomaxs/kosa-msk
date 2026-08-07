import { Reveal } from "@/components/Reveal";

const lengths = [
  { cm: 40, label: "До лопаток", note: "Самая частая длина" },
  { cm: 50, label: "До талии", note: "Классика наращивания" },
  { cm: 60, label: "Ниже талии", note: "Редкая длина" },
  { cm: 70, label: "До бёдер", note: "Под заказ" },
];

const maxCm = 70;

export function Lengths() {
  return (
    <section id="lengths" className="border-t border-border px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-foreground/55">
            Что вы выбираете
          </p>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] leading-tight font-medium">
            Длина решает всё
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/70 sm:text-base">
            Цена зависит от длины и веса пряди. Чем длиннее — тем реже донор и
            тем дороже волосы.
          </p>
        </Reveal>

        <div className="mt-16 flex items-end gap-4 sm:gap-10">
          {lengths.map((item, i) => (
            <Reveal key={item.cm} delay={i * 90} className="flex-1">
              <div className="flex flex-col items-center">
                <span className="mb-4 font-[family-name:var(--font-display)] text-2xl font-medium sm:text-4xl">
                  {item.cm}
                  <span className="ml-1 text-sm font-normal text-foreground/60 sm:text-base">
                    см
                  </span>
                </span>
                <div
                  className="w-full max-w-[48px] rounded-b-[40%] bg-accent bg-[repeating-linear-gradient(90deg,transparent_0px,rgba(42,38,33,0.07)_1px,transparent_2px,transparent_5px)]"
                  style={{ height: `${(item.cm / maxCm) * 340}px` }}
                />
                <span className="mt-5 text-center text-xs font-medium sm:text-sm">
                  {item.label}
                </span>
                <span className="mt-1 hidden text-center text-xs text-foreground/60 sm:block">
                  {item.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
