# Инфраструктура kosa-msk.ru в Yandex Cloud

Terraform-конфигурация, которая поднимает хостинг статического сайта целиком:

```
Посетитель → CDN (HTTPS, сертификат Let's Encrypt) → Object Storage (index.html)
                ↑
            Cloud DNS: kosa-msk.ru и www.kosa-msk.ru
```

Четыре сервиса вместо одного нужны потому, что Object Storage отдаёт сайт на
своём домене только по HTTP. HTTPS на `kosa-msk.ru` появляется на уровне CDN —
он терминирует TLS и ходит в бакет по HTTP внутри облака.

## Что создаётся

| Ресурс | Зачем |
|---|---|
| `yandex_iam_service_account` + статический ключ | доступ к бакету по S3-протоколу для `deploy.sh` |
| `yandex_storage_bucket` | хранит `index.html`, включён режим статического сайта |
| `yandex_cm_certificate` | бесплатный сертификат Let's Encrypt на домен и `www` |
| `yandex_cdn_origin_group` + `yandex_cdn_resource` | HTTPS, кэш, gzip, редирект с HTTP |
| `yandex_dns_zone` + записи | `kosa-msk.ru` и `www` смотрят на CDN |

## Порядок действий

### 1. Подготовка аккаунта

```bash
# Установить CLI и войти
curl -sSL https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash
yc init

# Записать ID — они понадобятся в terraform.tfvars
yc config get cloud-id
yc config get folder-id
```

В консоли облака должен быть привязан платёжный аккаунт, иначе создание
ресурсов упадёт с ошибкой биллинга.

### 2. Активировать CDN

Провайдер CDN включается один раз на каталог и через Terraform не создаётся:

```bash
yc cdn provider activate --type gcore
```

### 3. Заполнить переменные

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
$EDITOR terraform.tfvars     # подставить cloud_id и folder_id
```

### 4. Развернуть

```bash
export YC_TOKEN=$(yc iam create-token)
terraform init
terraform apply
```

Сертификат выпускается не мгновенно. Порядок такой: Terraform создаёт
сертификат, получает от него DNS-записи для проверки владения и добавляет их в
зону. Если `apply` завершился, а сертификат ещё в статусе `VALIDATING` —
подождите несколько минут и запустите `terraform apply` ещё раз, чтобы CDN
подхватил уже выпущенный сертификат.

Проверить статус:

```bash
yc certificate-manager certificate list
```

### 5. Переключить домен на Yandex Cloud

При `create_dns_zone = true` (по умолчанию) зону ведёт Cloud DNS, и у
регистратора, где куплен `kosa-msk.ru`, нужно заменить NS-серверы на:

```
ns1.yandexcloud.net
ns2.yandexcloud.net
```

Обновление NS у регистратора занимает от пары часов до суток.

Если DNS-зону хочется оставить у регистратора — поставьте
`create_dns_zone = false` и добавьте записи из вывода `dns_records_manual`
и `certificate_validation_records` вручную. Учтите: для корня домена нужна
поддержка ANAME/ALIAS — у части регистраторов её нет, тогда проще
делегировать зону в Cloud DNS.

### 6. Залить страницу

Из корня репозитория:

```bash
./deploy.sh
```

Скрипт берёт ключи и ID из `terraform output`, загружает `index.html` с
правильными `Content-Type` и `Cache-Control`, синхронизирует папку `img/`,
если она есть, и сбрасывает кэш CDN.

Пока NS не переехали, результат можно проверить по прямому адресу бакета:

```bash
terraform -chdir=infra output bucket_website_endpoint
```

## Обновление сайта

Правки в `index.html` → `./deploy.sh`. Страница отдаётся с
`max-age=300`, кэш CDN сбрасывается скриптом, так что изменения видны сразу.

## Удаление

```bash
terraform destroy
```

Бакет должен быть пустым, иначе удаление не пройдёт:

```bash
aws --endpoint-url=https://storage.yandexcloud.net s3 rm s3://kosa-msk.ru --recursive
```

## Важное про состояние

`terraform.tfstate` содержит секретный ключ сервисного аккаунта в открытом
виде и поэтому исключён из git. Если разворачивать будет больше одного
человека — вынесите состояние в бакет:

```hcl
terraform {
  backend "s3" {
    endpoint   = "storage.yandexcloud.net"
    bucket     = "kosa-msk-tfstate"
    key        = "site/terraform.tfstate"
    region     = "ru-central1"
    skip_region_validation      = true
    skip_credentials_validation = true
  }
}
```
