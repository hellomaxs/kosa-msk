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

- **Живой сайт: https://kosa-msk.ru** (`www.kosa-msk.ru` → 301 на него).
  Резервный технический адрес: `https://kosa-msk.website.yandexcloud.net` (старый бакет
  `kosa-msk`, оставлен намеренно).
- **Yandex Cloud:** каталог `kosa-msk` (`b1gn9nj1tii53skssds8`) в облаке `b1gt7us9j8e95up7fubp`,
  сервис-аккаунт `kosa-msk-deployer` (`storage.admin`).
- **Бакеты:** `kosa-msk.ru` — боевой, туда деплоит CI (public-read, website
  index.html/404.html). `www.kosa-msk.ru` — только редирект на apex. `kosa-msk` — старый,
  как резервный адрес.
- **GitHub Secrets** (установлены): `YC_S3_ACCESS_KEY`, `YC_S3_SECRET_KEY`. Не выводить в лог.

⚠️ **Кеш.** Вечный `immutable`-кеш только для `out/_next` — там имена файлов
content-hashed. Всё из `public/` (картинки, llms.txt) сохраняет имя между деплоями и
кешируется на 5 минут. Если поставить `immutable` на `public/` — старая картинка будет
отдаваться после замены (уже наступали на это, тогда ещё через CDN). Сейчас CDN нет,
кеширует только браузер, так что 5 минут — потолок ожидания.

⚠️ В workflow **нельзя** `if: ${{ secrets.X != '' }}` на уровне шага — контекст `secrets`
там запрещён, workflow падает мгновенно с 0s и без логов джобы.

## Домен и TLS — актуальное состояние

Домен `kosa-msk.ru`. **NS делегированы на Yandex Cloud DNS** (`ns1.yandexcloud.net`,
`ns2.yandexcloud.net`) — в панели REG.RU остаётся только смена NS, записи там больше
не редактируются.

**Архитектура (2026-08-24): CDN НЕ используется, он удалён.** Домен идёт напрямую
в Object Storage:

- бакет `kosa-msk.ru` — сайт, HTTPS-сертификат привязан к бакету
- бакет `www.kosa-msk.ru` — только `redirect_all_requests` на apex
- **DNS-зона в Yandex Cloud** `kosa-msk-ru` (`dns9d3qkcpq18pt00jva`):
  `ANAME @` и `CNAME www` → `kosa-msk.ru.website.yandexcloud.net.`,
  плюс `_acme-challenge(.www)` CNAME → `fpqfa0l4t4kjavlqa5b1.cm.yandexcloud.net.`
  (нужны для автопродления сертификата — не удалять)

**Почему ANAME, а не A:** на apex нельзя CNAME. Раньше стояла A-запись с айпишником
CDN — хрупко. ANAME есть у Yandex Cloud DNS, у REG.RU его не было, из-за этого и
переезжали DNS.

**TLS:** сертификат Certificate Manager `kosa-msk-ru-3`, id `fpqfa0l4t4kjavlqa5b1`,
до 2026-11-05, покрывает оба домена. Привязка: `yc storage bucket set-https <бакет>
--certificate-id fpqfa0l4t4kjavlqa5b1`. Проверка: `yc storage bucket get-https <бакет>`.
⚠️ Ранние `fpqv8soklt8jscodsvr7` и `fpqa6galgfqhhvdilvju` **удалены** — команды с этими
ID не выполнять.

### Грабли HTTPS на Object Storage (все словлены на практике)

1. **Имя бакета обязано совпадать с доменом.** Поэтому боевой бакет называется
   `kosa-msk.ru`, а не `kosa-msk`.
2. **Каждый домен из сертификата должен иметь свой бакет** — алиас или редирект. Пока
   не было бакета `www.kosa-msk.ru`, HTTPS не активировался.
3. **Имя не должно быть занято CDN-ресурсом.** `www` поднялся сразу, а apex продолжал
   отдавать `CN=*.yccdn.cloud.yandex.net`, пока не удалили CDN-ресурс, державший
   `cname: kosa-msk.ru`. После удаления — `delete-https` + `set-https` заново.
4. **Активация не мгновенная** — ~30 минут после того, как домен зарезолвился.
5. ⚠️ **Локальный DNS-кеш врёт.** Эта машина держала старую A-запись, и проверка
   упорно показывала CDN-сертификат, когда всё уже работало. Перед выводами:
   `Clear-DnsClientCache` (PowerShell), либо сверяться с внешним dnschecker.org.

**Проверка, что всё живо:**

```bash
echo | openssl s_client -connect kosa-msk.ru:443 -servername kosa-msk.ru 2>&1   | openssl x509 -noout -subject
```
Ожидаем `CN=kosa-msk.ru`.

### Почему ушли с CDN

Легаси-CDN (`provider_type: ourcdn`, единственный доступный — gcore уже отключён)
**дважды** ломался одинаково: `yc cdn resource get` показывал
`ssl_certificate: type: CM, status: READY`, а edge-узлы отдавали дефолтный сертификат
→ `ERR_CERT_COMMON_NAME_INVALID` в браузере. Первый раз разошлось само за час, второй
раз не помогла даже перепривязка. Сервис сворачивают — не возвращаться на него.

## Прочее

- Формы с персональными данными: бизнес в РФ, обработка ПДн должна оставаться в
  `ru-central1` (152-ФЗ). Зарубежные формы/аналитику не подключать без проверки.
- ⚠️ Над этим репозиторием параллельно работают несколько сессий Claude (веб-версия и
  локальная). Перед push — `git fetch` и проверять `git log origin/main` на новые коммиты:
  конфликт в `app/page.tsx` уже случался.
