@AGENTS.md

# KOSA-MSK

Сайт: продажа премиальных натуральных волос + услуги наращивания, Москва.
Стек: Next.js (App Router) + TypeScript + Tailwind v4, **`output: "export"`** — чистая
статика в `out/`.

⚠️ Формулировка «славянские волосы» по решению клиента НЕ используется — везде только
«премиальные натуральные».

⚠️ Не выдумывать факты о бизнесе (год основания, цены, сроки, количество клиентов).
Реальных цифр клиент пока не давал — формулировки намеренно без конкретных чисел.
Однажды в герое появилось выдуманное «с 2019 года» — убрано.

## Контент и дизайн

- Секции главной: `Hero` → `Lengths` → `Services` → `Process` → `Faq` → `Contact`,
  плюс `Header`/`Footer`. Все в `components/`.
- Палитра (`app/globals.css`): фон — **серый `#858585` буквально** (не тёмная тема,
  клиент дал этот цвет как фон), акцент — бежевый `#DDCFC2` из логотипа, текст — тёмный
  уголь `#2a2621`, карточки — кремовый `#f7f3ee`.
  ⚠️ Бежевый **не использовать как цвет текста** — не проходит контраст ни на сером,
  ни на кремовом. Только заливки/иконки/полоски.
- Шрифты: Playfair Display (заголовки) + Inter (текст), `next/font/google` (self-host).
- Логотип: `public/logo.svg` — реальный логотип клиента.
- Контакты: единый источник `lib/content.ts` — реальные телефон/WhatsApp/MAX/Telegram.
  Не заменять на плейсхолдеры.
- Канал Avito обсуждался, но реальной ссылки на профиль нет — не добавлять с угаданным
  адресом.
- Фото: `public/img/*.webp`, сгенерированы AI. Герой — русые волосы (клиент отдельно
  просил заменить блондинку).

## SEO / GEO (сделано, не ломать)

`app/sitemap.ts`, `app/robots.ts` (оба обязательно с `export const dynamic = "force-static"`,
иначе статик-экспорт падает), `lib/schema.ts` (HairSalon + WebSite + FAQPage через
`components/JsonLd.tsx`), `public/llms.txt`, метаданные с canonical/OG/geo.region RU-MOW.
В robots явно разрешены GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot/Google-Extended/
YandexBot. Ответы в FAQ (`lib/content.ts → faq`) написаны под цитирование ИИ-ассистентами.

## Деплой (настроен, работает автоматически)

Push в `main` → GitHub Actions (`.github/workflows/deploy.yml`) → `npm ci` → `npm run build`
→ `aws s3 sync out/` в бакет. Руками ничего запускать не нужно.

- **Живой сайт: https://kosa-msk.ru** (и `www.kosa-msk.ru`).
  Резервный технический адрес: `https://kosa-msk.website.yandexcloud.net` — он всегда
  работает напрямую из бакета, минуя CDN.
- **Yandex Cloud:** каталог `kosa-msk` (`b1gn9nj1tii53skssds8`) в облаке `b1gt7us9j8e95up7fubp`,
  сервис-аккаунт `kosa-msk-deployer` (`storage.admin`), бакет `kosa-msk` (public-read,
  website hosting index.html/404.html).
- **GitHub Secrets** (установлены): `YC_S3_ACCESS_KEY`, `YC_S3_SECRET_KEY`. Не выводить в лог.

⚠️ **Кеш.** Вечный `immutable`-кеш только для `out/_next` — там имена файлов
content-hashed. Всё из `public/` (картинки, llms.txt) сохраняет имя между деплоями и
кешируется на 5 минут. Если поставить `immutable` на `public/` — CDN будет отдавать старую
картинку после замены (уже наступали на это). Ручной сброс:
`yc cdn cache purge --resource-id bc8rj6ubftvlwuyxxewn --folder-id b1gn9nj1tii53skssds8 --all`
(есть лимит на частоту вызовов).

⚠️ В workflow **нельзя** `if: ${{ secrets.X != '' }}` на уровне шага — контекст `secrets`
там запрещён, workflow падает мгновенно с 0s и без логов джобы.

## Домен и TLS — актуальное состояние

Домен клиента `kosa-msk.ru`, DNS на NS REG.RU (раньше был flexbe.ru).

**Архитектура:** бакет `kosa-msk` → origin-group `1303867032640262596` → **CDN-ресурс
`bc8rj6ubftvlwuyxxewn`** (домены `kosa-msk.ru` + `www.kosa-msk.ru`).

**DNS-записи в REG.RU:**
- `www` → CNAME `26a4be0e959e83ec.topology.gslb.yccdn.ru`
- `@` → A `188.72.103.3` (на apex CNAME нельзя; это статический снимок IP GSLB-узла CDN —
  если Yandex его сменит, голый домен отвалится, а `www` переживёт)

**TLS:** сертификат Certificate Manager **`kosa-msk-ru-3`, id `fpqfa0l4t4kjavlqa5b1`**,
статус ISSUED, действует до 2026-11-05.
⚠️ Более ранние `kosa-msk-ru` (`fpqv8soklt8jscodsvr7`) и `kosa-msk-ru-2`
(`fpqa6galgfqhhvdilvju`) **УДАЛЕНЫ** — они зависли в VALIDATING. Если где-то встретится
ссылка на них — она устарела, не выполнять команды с этими ID.

⚠️ Флаг `yc cdn resource create --lets-encrypt-gcore-ssl-cert` **не работает** на этом
аккаунте («gcore provider is deprecated»). Сертификат оформляется отдельно через
`yc certificate-manager certificate request --challenge dns` и привязывается через
`yc cdn resource update --cert-manager-ssl-cert-id`.

### ⚠️ Легаси-CDN нестабилен — как диагностировать «домен не работает»

Этот CDN (`provider_type: ourcdn`) уже дважды показывал расхождение между
control-plane и edge: `yc cdn resource get` пишет `ssl_certificate: type: CM,
status: READY`, а edge-узлы при этом отдают **дефолтный** сертификат
`CN=*.yccdn.cloud.yandex.net` → в браузере `ERR_CERT_COMMON_NAME_INVALID`.
Один раз это разошлось само примерно за час; второй раз потребовалась перепривязка.

**Не диагностировать по `CLAUDE.md` — проверять фактами:**

```bash
# 1. Сертификат жив?
yc certificate-manager certificate list --folder-id b1gn9nj1tii53skssds8
# 2. Привязан к CDN?
yc cdn resource get bc8rj6ubftvlwuyxxewn --folder-id b1gn9nj1tii53skssds8 | grep -A6 ssl_certificate
# 3. Что РЕАЛЬНО отдаёт edge (главная проверка):
echo | openssl s_client -connect kosa-msk.ru:443 -servername kosa-msk.ru 2>&1 \
  | openssl x509 -noout -subject
```

Если в п.3 `CN=kosa-msk.ru` — всё хорошо. Если `CN=*.yccdn.cloud.yandex.net` — edge не
подхватил конфиг; форсировать перепривязкой:

```bash
yc cdn resource update bc8rj6ubftvlwuyxxewn --folder-id b1gn9nj1tii53skssds8 --dont-use-ssl-cert
yc cdn resource update bc8rj6ubftvlwuyxxewn --folder-id b1gn9nj1tii53skssds8 --cert-manager-ssl-cert-id fpqfa0l4t4kjavlqa5b1
```
и подождать — edge подхватывает не мгновенно (наблюдалось до часа).

## Прочее

- Формы с персональными данными: бизнес в РФ, обработка ПДн должна оставаться в
  `ru-central1` (152-ФЗ). Зарубежные формы/аналитику не подключать без проверки.
- ⚠️ Над этим репозиторием параллельно работают несколько сессий Claude (веб-версия и
  локальная). Перед push — `git fetch` и проверять `git log origin/main` на новые коммиты:
  конфликт в `app/page.tsx` уже случался.
