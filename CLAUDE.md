@AGENTS.md

# KOSA-MSK

Сайт: продажа премиальных славянских волос + услуги наращивания, Москва. Стек: Next.js
(App Router) + TypeScript + Tailwind v4, **`output: "export"`** — чистая статика в `out/`.
Контент/дизайн ещё не согласованы — `app/page.tsx` сейчас placeholder-заглушка.

## Деплой (уже настроен и работает автоматически)

Push в `main` → GitHub Actions (`.github/workflows/deploy.yml`) → `npm ci` → `npm run build`
→ `aws s3 sync out/` в бакет Yandex Object Storage. Ничего руками запускать не нужно —
просто коммитить в `main`.

- **Живой сайт:** https://kosa-msk.website.yandexcloud.net
- **Yandex Cloud:** отдельный каталог (folder) `kosa-msk` (`b1gn9nj1tii53skssds8`) в облаке
  `b1gt7us9j8e95up7fubp`, сервис-аккаунт `kosa-msk-deployer` (роль `storage.admin`), бакет
  `kosa-msk` (public-read, website hosting index.html/404.html).
- **GitHub Secrets** (уже установлены): `YC_S3_ACCESS_KEY`, `YC_S3_SECRET_KEY` — статический
  ключ сервис-аккаунта `kosa-msk-deployer`. Не менять/не выводить в лог.
- Домен пока не привязан — сайт живёт на `*.website.yandexcloud.net`. Когда появится
  домен (напр. `kosa-msk.ru`), CNAME на `kosa-msk.website.yandexcloud.net`, и обновить
  `SITE_URL`/canonical/OG/sitemap.

## Заметки для будущих сессий

- `app/sitemap.ts` и `app/robots.ts` пока не добавлены — добавлять с
  `export const dynamic = "force-static"` (иначе `output: "export"` падает на сборке).
- Если появятся формы (заявка на наращивание, обратная связь) с персональными данными —
  это РФ-бизнес, обработка ПДн должна оставаться в `ru-central1` (152-ФЗ): не подключать
  зарубежные формы/аналитику без предварительной проверки.
- Иконки/шрифты — self-host (`next/font/google` уже используется, это и есть self-host,
  фонт скачивается в build-time).

