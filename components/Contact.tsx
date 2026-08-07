import { contacts } from "@/lib/content";
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
    <section id="contacts" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium sm:text-4xl">
          Связаться с нами
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-foreground/65">
          Ответим на вопросы о волосах и наращивании удобным для вас способом.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {channels.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-8 transition-colors hover:border-accent"
            >
              <Icon className="h-6 w-6 text-accent" />
              <div>
                <div className="text-sm font-medium text-foreground">{label}</div>
                <div className="mt-1 text-xs text-muted">{value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
