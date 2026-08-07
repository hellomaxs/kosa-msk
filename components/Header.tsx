import Image from "next/image";
import { contacts } from "@/lib/content";
import { PhoneIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="KOSA-MSK"
            width={188}
            height={45}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm tracking-wide text-foreground/80 md:flex">
          <a href="#services" className="transition-colors hover:text-accent">
            Услуги
          </a>
          <a href="#why" className="transition-colors hover:text-accent">
            О нас
          </a>
          <a href="#contacts" className="transition-colors hover:text-accent">
            Контакты
          </a>
        </nav>

        <a
          href={contacts.phoneHref}
          className="flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-background"
        >
          <PhoneIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{contacts.phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
}
