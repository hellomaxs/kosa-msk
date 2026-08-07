const services = [
  {
    title: "Наращивание волос",
    description:
      "Профессиональное наращивание с индивидуальным подбором длины, густоты и оттенка под структуру ваших волос.",
  },
  {
    title: "Премиальные волосы",
    description:
      "Продажа натуральных славянских волос — для тех, кто наращивает волосы у своего мастера или работает с волосами профессионально.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[family-name:var(--font-display)] text-center text-3xl font-medium sm:text-4xl">
          Услуги
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/50"
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-accent">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
