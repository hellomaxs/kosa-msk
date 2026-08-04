import type { SVGProps } from "react";

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.9 4.3 18.7 19.4c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13.2l-4.8-1.5c-1-.3-1.1-1 .2-1.5l18.8-7.3c.9-.3 1.6.2 1.4 1.4z" />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15.1L2 22.4l5.4-1.4A9.9 9.9 0 1 0 12 2zm0 1.8a8.1 8.1 0 1 1-4.1 15.1l-.3-.2-3.2.8.9-3.1-.2-.3A8.1 8.1 0 0 1 12 3.8zm-3.7 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.3 3.7 2.1.8 2.6.7 3 .6.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4 0-.5.2-.7l.5-.6c.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5l-.8-2c-.2-.5-.4-.5-.6-.5h-.3z" />
    </svg>
  );
}

// Официальной иконки MAX не использую — только общий силуэт мессенджера.
// При желании замените на официальный SVG из брендбука MAX.
function MaxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z" />
    </svg>
  );
}

// Аналогично — общая иконка «ценник» вместо логотипа Avito.
function AvitoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11.5 3.5h5A2 2 0 0 1 18.5 5.5v5a2 2 0 0 1-.6 1.4l-7.6 7.6a2 2 0 0 1-2.8 0l-4.5-4.5a2 2 0 0 1 0-2.8l7.6-7.6a2 2 0 0 1 1.4-.6Z" />
      <circle cx="14.5" cy="7.5" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

const CONTACTS = [
  {
    name: "Telegram",
    href: "https://t.me/kosa_msk",
    Icon: TelegramIcon,
    ring: "#4FA8E8",
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/79991234567?text=${encodeURIComponent(
      "Здравствуйте! Расскажите про волосы для наращивания"
    )}`,
    Icon: WhatsAppIcon,
    ring: "#3FC463",
  },
  {
    name: "MAX",
    href: "https://max.ru/u/kosa_msk",
    Icon: MaxIcon,
    ring: "#E7E1D3",
  },
  {
    name: "Avito",
    href: "https://www.avito.ru/brands/kosa_msk",
    Icon: AvitoIcon,
    ring: "#A57BFF",
  },
] as const;

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-20 text-center">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/40 bg-accent/10 font-[family-name:var(--font-display)] text-xl font-semibold text-accent">
          K
        </span>
        <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide">
          KOSA · MSK
        </span>
      </div>

      <div className="max-w-md">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Москва
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-4xl">
          Сайт в разработке
        </h1>
        <p className="mt-4 text-base text-foreground/70">
          Премиальные волосы для наращивания и услуги мастера. Пока сайт
          готовится — свяжитесь напрямую.
        </p>
      </div>

      <a
        href="tel:+79991234567"
        className="inline-flex min-h-11 items-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-wide text-foreground transition-colors hover:text-accent sm:text-4xl"
      >
        +7 999 123-45-67
      </a>

      <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
        {CONTACTS.map(({ name, href, Icon, ring }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-3 py-5 transition-colors hover:border-accent/50 hover:bg-accent/5"
          >
            <span
              className="grid h-11 w-11 place-items-center rounded-full"
              style={{ color: ring, backgroundColor: `${ring}1a` }}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium">{name}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
