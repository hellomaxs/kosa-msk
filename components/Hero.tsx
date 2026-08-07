import { contacts } from "@/lib/content";
import { TelegramIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(221,207,194,0.10),_transparent_60%)]" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-accent">
          KOSA-MSK · Москва
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-[1.15] font-medium sm:text-5xl md:text-6xl">
          Премиальные волосы
          <br />
          для наращивания
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
          Натуральные славянские волосы и услуги наращивания. Индивидуальный
          подбор длины и оттенка — для тех, кто выбирает качество.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={contacts.phoneHref}
            className="w-full rounded-full bg-accent px-8 py-3 text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-90 sm:w-auto"
          >
            Позвонить
          </a>
          <a
            href={contacts.telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-8 py-3 text-sm tracking-wide text-foreground/85 transition-colors hover:border-accent hover:text-accent sm:w-auto"
          >
            <TelegramIcon className="h-4 w-4" />
            Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
