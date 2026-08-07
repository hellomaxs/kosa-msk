@AGENTS.md

# KOSA-MSK

Сайт: продажа премиальных натуральных волос + услуги наращивания, Москва.
⚠️ Формулировка «славянские волосы» по решению клиента НЕ используется — только
«премиальные натуральные». Стек: Next.js
(App Router) + TypeScript + Tailwind v4, **`output: "export"`** — чистая статика в `out/`.

Первая версия дизайна и контента собрана (`components/Header|Hero|Services|WhyUs|Contact|Footer`).
Бренд: реальный логотип клиента `public/logo.svg`, палитра `#DDCFC2` (акцент, из лого) +
`#858585` (приглушённый серый) на тёплом тёмном фоне (`app/globals.css`), шрифты Playfair
Display (заголовки) + Inter (текст), самохостинг через `next/font/google`. Контакты — единый
источник `lib/content.ts` (реальные телефон/WhatsApp/Telegram — не менять на плейсхолдеры).
Канал Avito обсуждается, но реальной ссылки на профиль ещё нет — не добавлять с
угаданным адресом.

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
- **✅ Домен `kosa-msk.ru` подключён (2026-08-07)** — и apex, и `www` открываются по HTTPS. Реальный домен клиента (был на
  NS flexbe.ru с заблокированной страницей конструктора, переключён на NS REG.RU).
  Архитектура: Yandex Object Storage (бакет `kosa-msk`) → **CDN-ресурс** `bc8rj6ubftvlwuyxxewn`
  (folder `kosa-msk`, origin-group `1303867032640262596`) → домены `kosa-msk.ru` +
  `www.kosa-msk.ru`, CNAME на провайдера CDN `26a4be0e959e83ec.topology.gslb.yccdn.ru`.
  TLS — управляемый сертификат Let's Encrypt через Certificate Manager (`kosa-msk-ru`,
  id `fpqv8soklt8jscodsvr7`, DNS-challenge `_acme-challenge(.www).kosa-msk.ru` CNAME на
  `fpqv8soklt8jscodsvr7.cm.yandexcloud.net`). ⚠️ Прямой CDN старого типа (флаг
  `--lets-encrypt-gcore-ssl-cert`) **не работает** — «gcore provider is deprecated»,
  поэтому сертификат оформлен отдельно и прикрепляется через
  `yc cdn resource update --cert-manager-ssl-cert-id`. Когда сертификат станет ACTIVE —
  привязать к CDN-ресурсу и обновить `SITE_URL`/canonical/OG/sitemap на `https://kosa-msk.ru`.
  До этого момента живой адрес — только `*.website.yandexcloud.net`.

## Заметки для будущих сессий

- `app/sitemap.ts` и `app/robots.ts` пока не добавлены — добавлять с
  `export const dynamic = "force-static"` (иначе `output: "export"` падает на сборке).
- Если появятся формы (заявка на наращивание, обратная связь) с персональными данными —
  это РФ-бизнес, обработка ПДн должна оставаться в `ru-central1` (152-ФЗ): не подключать
  зарубежные формы/аналитику без предварительной проверки.
- Иконки/шрифты — self-host (`next/font/google` уже используется, это и есть self-host,
  фонт скачивается в build-time).

