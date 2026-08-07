const points = [
  {
    title: "Натуральные волосы",
    description: "Славянские волосы без силиконовых покрытий и обработки.",
  },
  {
    title: "Индивидуальный подбор",
    description: "Оттенок, длина и густота — под ваши волосы и пожелания.",
  },
  {
    title: "Для клиентов и мастеров",
    description: "Услуга наращивания и продажа волос для профессионалов.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="border-t border-border bg-surface/50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[family-name:var(--font-display)] text-center text-3xl font-medium sm:text-4xl">
          Почему KOSA-MSK
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {points.map((point, i) => (
            <div key={point.title} className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-accent text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-medium text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
