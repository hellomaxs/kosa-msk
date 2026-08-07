# KOSA-MSK

Сайт: премиальные волосы для наращивания + услуги наращивания, Москва.

Next.js (App Router) + TypeScript + Tailwind, статический экспорт (`output: "export"`).

## Разработка

```bash
npm install
npm run dev
```

## Деплой

Автоматический: push в `main` собирает и заливает сайт на Yandex Cloud через
GitHub Actions (`.github/workflows/deploy.yml`). Ничего запускать вручную не нужно.

Живой сайт: https://kosa-msk.website.yandexcloud.net

## Текущее состояние

Первая полноценная версия главной страницы: `Header`, `Hero`, `Services`,
`WhyUs`, `Contact`, `Footer` (все в `components/`). Контакты — единый источник
`lib/content.ts` (реальные телефон/WhatsApp/Telegram). Бренд-цвета и лого —
из `public/logo.svg` (реальный логотип клиента), палитра `#DDCFC2` / `#858585`
в `app/globals.css`.

Иконки Telegram/WhatsApp/MAX в `components/icons.tsx` нарисованы вручную (не
официальные SVG) — заменить на официальные ассеты из брендбуков, если это
важно. MAX использует общий силуэт чата, не логотип бренда.

Ещё не решено: канал Avito (идея из другой сессии) — нужна реальная ссылка
на профиль/магазин продавца, пока не добавлен, чтобы не вести на
несуществующий адрес.

Домен `kosa-msk.ru` подключается (CNAME на CDN, сертификат Let's Encrypt) —
подробности и текущий статус в `CLAUDE.md`.
