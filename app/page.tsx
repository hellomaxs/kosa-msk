export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 text-sm tracking-[0.3em] text-accent uppercase">
        KOSA-MSK
      </p>
      <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight sm:text-5xl">
        Премиальные волосы и наращивание в Москве
      </h1>
      <p className="mt-6 max-w-xl text-lg text-foreground/70">
        Сайт в разработке. Скоро здесь — каталог славянских волос и запись на
        услуги наращивания.
      </p>
      <a
        href="tel:+70000000000"
        className="mt-10 rounded-full border border-accent px-8 py-3 text-sm uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-background"
      >
        Связаться с нами
      </a>
    </main>
  );
}
