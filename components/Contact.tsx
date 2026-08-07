import { contacts } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { PhoneIcon, WhatsAppIcon, MaxIcon, TelegramIcon } from "@/components/icons";

const channels = [
  {
    label: "Позвонить",
    value: contacts.phoneDisplay,
    href: contacts.phoneHref,
    Icon: PhoneIcon,
  },
  {
    label: "WhatsApp",
    value: contacts.phoneDisplay,
    href: contacts.whatsappHref,
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "MAX",
    value: contacts.phoneDisplay,
    href: contacts.phoneHref,
    Icon: MaxIcon,
  },
  {
    label: "Telegram",
    value: contacts.telegramHandle,
    href: contacts.telegramHref,
    Icon: TelegramIcon,
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="contacts"
      className="border-t border-border bg-surface px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-foreground/55">
            Связаться
          </p>
          <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] leading-tight font-medium">
            Пришлите фото волос — ответим с подбором
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
            Удобнее всего в Telegram или WhatsApp: там сразу видно оттенок и
            длину.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ label, value, href, Icon, external }, i) => (
            <Reveal key={label} delay={i * 70}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex h-full items-center gap-4 rounded-sm border border-foreground/15 bg-background/40 px-5 py-6 transition-colors hover:border-foreground/45"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-5 w-5 text-foreground" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="mt-0.5 block text-xs text-foreground/65">
                    {value}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
