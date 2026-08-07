import { Reveal } from "@/components/Reveal";

const claims = [
  {
    headline: "Без силикона",
    text: "Срез не проходит химическую обработку — блеск живой, а не покрытие, которое смоется за месяц.",
  },
  {
    headline: "Оттенок в тон",
    text: "Подбираем по фото при дневном свете. Если в наличии нет вашего — ищем под заказ.",
  },
  {
    headline: "Мастерам тоже",
    text: "Продаём срез отдельно, если вы работаете с волосами или наращиваете у своего мастера.",
  },
];

export function Claims() {
  return (
    <section className="border-t border-border bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3 sm:gap-8">
        {claims.map((claim, i) => (
          <Reveal key={claim.headline} delay={i * 90}>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-medium sm:text-2xl">
              {claim.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              {claim.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
