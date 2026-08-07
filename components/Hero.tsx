import Image from "next/image";
import { contacts } from "@/lib/content";
import { TelegramIcon } from "@/components/icons";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden">
      <Image
        src="/img/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714]/85 via-[#1a1714]/35 to-[#1a1714]/20" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-6 pb-20 sm:pb-28">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.4em] text-accent">
          Москва · наращивание волос
        </p>
        <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-medium text-[#f5f0e9]">
          Волосы, которые
          <br />
          не выдают себя
        </h1>
        <p className="mt-7 max-w-lg text-base leading-relaxed text-[#f5f0e9]/80 sm:text-lg">
          Премиальные натуральные волосы без силикона и химической обработки.
          Подбираем оттенок под ваш — до неотличимости.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={contacts.phoneHref}
            className="rounded-full bg-accent px-9 py-4 text-center text-sm font-medium tracking-wide text-[#2a2621] transition-opacity hover:opacity-90"
          >
            Подобрать волосы
          </a>
          <a
            href={contacts.telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-[#f5f0e9]/35 px-9 py-4 text-sm tracking-wide text-[#f5f0e9] backdrop-blur-sm transition-colors hover:border-[#f5f0e9]/70"
          >
            <TelegramIcon className="h-4 w-4" />
            Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
