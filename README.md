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

`app/page.tsx` — временная заглушка: лого, номер телефона и четыре кнопки
мессенджеров/маркетплейса (Telegram, WhatsApp, MAX, Avito). Значения ниже —
плейсхолдеры, замените на свои прямо в `app/page.tsx`:

| Что | Где в коде | Placeholder |
|---|---|---|
| Телефон | `href="tel:+79991234567"` и текст рядом | `+7 999 123-45-67` |
| Telegram | `CONTACTS[0].href` | `https://t.me/kosa_msk` |
| WhatsApp | `CONTACTS[1].href` | номер `79991234567` + текст сообщения |
| MAX | `CONTACTS[2].href` | `https://max.ru/u/kosa_msk` — **проверьте формат ссылки в самом приложении** (в MAX → Настройки → Имя пользователя), схема ссылок могла измениться |
| Avito | `CONTACTS[3].href` | `https://www.avito.ru/brands/kosa_msk` — замените на реальный адрес профиля/магазина |

Иконки Telegram и WhatsApp нарисованы вручную (не официальные SVG). Иконки MAX
(силуэт чата) и Avito (ценник) — обобщённые, не логотипы брендов: замените на
официальные ассеты из брендбуков, если это важно.

Когда домен `kosa-msk.ru` будет привязан у регистратора — CNAME на
`kosa-msk.website.yandexcloud.net` (подробности в `CLAUDE.md`).
