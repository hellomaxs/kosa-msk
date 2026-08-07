import { Reveal } from "@/components/Reveal";

const steps = [
  {
    title: "Пишете нам",
    text: "Фото ваших волос при дневном свете — по нему подбираем оттенок и оцениваем, сколько прядей нужно.",
  },
  {
    title: "Подбираем срез",
    text: "Показываем доступные срезы в вашем оттенке и длине, называем итоговую цену за материал.",
  },
  {
    title: "Наращиваем",
    text: "Записываем в салон в Москве. Капсульное наращивание занимает 3–5 часов.",
  },
  {
    title: "Ведём дальше",
    text: "Через 2–3 месяца — коррекция. Волосы переносим на новые капсулы, материал служит до года.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-t border-border px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-foreground/55">
            Как это устроено
          </p>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] leading-tight font-medium">
            От фото до наращивания — четыре шага
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-y-12 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 lg:gap-x-8">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <li className="border-t border-foreground/25 pt-6">
                <span className="font-[family-name:var(--font-display)] text-sm text-foreground/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {step.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
