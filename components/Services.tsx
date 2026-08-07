import Image from "next/image";
import { contacts } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    title: "Волосы на срезе",
    image: "/img/bundles.webp",
    description:
      "Премиальный натуральный срез в естественных оттенках — от русого до тёмного шатена. Каждая прядь с сохранённой кутикулой, без силиконовых покрытий.",
    points: ["Длины 40–70 см", "Подбор оттенка по фото", "Отправка по России"],
  },
  {
    title: "Наращивание",
    image: "/img/master.webp",
    description:
      "Капсульное наращивание в Москве. Работаем со своими волосами и с вашими — если материал уже куплен.",
    points: ["Капсульное и ленточное", "Коррекция и снятие", "Запись на неделю вперёд"],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="border-t border-border bg-surface px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-foreground/55">
            Чем занимаемся
          </p>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] leading-tight font-medium">
            Наращивание волос и продажа среза в Москве
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-10">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 120}>
              <article>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-8 font-[family-name:var(--font-display)] text-2xl font-medium sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/75 sm:text-base">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-sm text-foreground/85"
                    >
                      <span className="h-px w-6 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={contacts.phoneHref}
                  className="mt-8 inline-block border-b border-accent pb-1 text-sm font-medium transition-colors hover:border-foreground"
                >
                  Узнать цену
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
