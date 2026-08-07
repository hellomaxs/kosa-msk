import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Image
          src="/logo.svg"
          alt="KOSA-MSK"
          width={140}
          height={33}
          className="h-6 w-auto opacity-80"
        />
        <p className="text-xs text-foreground/70">
          © {new Date().getFullYear()} KOSA-MSK · Москва
        </p>
      </div>
    </footer>
  );
}
