locals {
  www_domain      = "www.${var.domain}"
  bucket_endpoint = "${var.domain}.website.yandexcloud.net"
}

# ─────────────────────────────────────────────────────────────────────────────
# Сервисный аккаунт: от его имени Terraform и deploy.sh пишут в бакет
# ─────────────────────────────────────────────────────────────────────────────

resource "yandex_iam_service_account" "site" {
  name        = "kosa-msk-site"
  description = "Управление бакетом статики и сбросом кэша CDN"
  folder_id   = var.folder_id
}

resource "yandex_resourcemanager_folder_iam_member" "storage_admin" {
  folder_id = var.folder_id
  role      = "storage.admin"
  member    = "serviceAccount:${yandex_iam_service_account.site.id}"
}

resource "yandex_resourcemanager_folder_iam_member" "cdn_editor" {
  folder_id = var.folder_id
  role      = "cdn.editor"
  member    = "serviceAccount:${yandex_iam_service_account.site.id}"
}

resource "yandex_iam_service_account_static_access_key" "site" {
  service_account_id = yandex_iam_service_account.site.id
  description        = "Ключ S3 для загрузки статики"

  # Ключ создаётся только после выдачи прав, иначе первый apply
  # может упасть с ошибкой доступа к бакету.
  depends_on = [yandex_resourcemanager_folder_iam_member.storage_admin]
}

# ─────────────────────────────────────────────────────────────────────────────
# Object Storage: бакет с включённым хостингом статического сайта
#
# Имя бакета обязано совпадать с доменом — от него зависит адрес
# origin-эндпоинта <домен>.website.yandexcloud.net, который отдаётся в CDN.
# ─────────────────────────────────────────────────────────────────────────────

resource "yandex_storage_bucket" "site" {
  access_key = yandex_iam_service_account_static_access_key.site.access_key
  secret_key = yandex_iam_service_account_static_access_key.site.secret_key

  bucket    = var.domain
  folder_id = var.folder_id

  anonymous_access_flags {
    read        = true
    list        = false
    config_read = false
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

# ─────────────────────────────────────────────────────────────────────────────
# Cloud DNS
# ─────────────────────────────────────────────────────────────────────────────

resource "yandex_dns_zone" "site" {
  count = var.create_dns_zone ? 1 : 0

  name        = replace(var.domain, ".", "-")
  description = "Публичная зона ${var.domain}"
  zone        = "${var.domain}."
  public      = true
  folder_id   = var.folder_id
}

# ─────────────────────────────────────────────────────────────────────────────
# TLS-сертификат Let's Encrypt с проверкой владения через DNS
#
# Внимание: challenges заполняются уже ПОСЛЕ создания сертификата. Если зоной
# управляет Terraform, первый `apply` создаёт сертификат и валидационные
# записи; выдача занимает несколько минут. Если DNS-зона внешняя
# (create_dns_zone = false), записи нужно добавить руками — см. вывод
# certificate_validation_records.
# ─────────────────────────────────────────────────────────────────────────────

resource "yandex_cm_certificate" "site" {
  name        = replace(var.domain, ".", "-")
  description = "Сертификат для ${var.domain} и ${local.www_domain}"
  folder_id   = var.folder_id
  domains     = [var.domain, local.www_domain]

  managed {
    challenge_type = "DNS_CNAME"
  }
}

resource "yandex_dns_recordset" "cert_validation" {
  for_each = var.create_dns_zone ? {
    for challenge in yandex_cm_certificate.site.challenges :
    challenge.dns_name => challenge
  } : {}

  zone_id = yandex_dns_zone.site[0].id
  name    = each.value.dns_name
  type    = each.value.dns_type
  ttl     = 60
  data    = [each.value.dns_value]
}

# ─────────────────────────────────────────────────────────────────────────────
# CDN — он же точка терминации HTTPS
#
# Бакет отдаёт статику только по HTTP, поэтому сертификат вешается на CDN,
# а сам CDN ходит в origin по http. Провайдера CDN нужно один раз
# активировать в каталоге: yc cdn provider activate --type gcore
# ─────────────────────────────────────────────────────────────────────────────

resource "yandex_cdn_origin_group" "site" {
  name      = "kosa-msk-site"
  folder_id = var.folder_id
  use_next  = true

  origin {
    source  = local.bucket_endpoint
    enabled = true
  }
}

resource "yandex_cdn_resource" "site" {
  cname               = var.domain
  secondary_hostnames = [local.www_domain]
  folder_id           = var.folder_id
  active              = true
  origin_protocol     = "http"
  origin_group_id     = yandex_cdn_origin_group.site.id

  ssl_certificate {
    type                   = "certificate_manager"
    certificate_manager_id = yandex_cm_certificate.site.id
  }

  options {
    edge_cache_settings = var.cache_ttl
    gzip_on             = true
    ignore_cookie       = true
    redirect_http_to_https = true

    # Бакету не нужны ни куки, ни query-параметры для отдачи одной страницы —
    # игнорируем их, чтобы не плодить варианты кэша.
    ignore_query_params = true

    static_response_headers = {
      "X-Content-Type-Options" = "nosniff"
      "Referrer-Policy"        = "strict-origin-when-cross-origin"
    }
  }

  depends_on = [yandex_storage_bucket.site]
}

# ─────────────────────────────────────────────────────────────────────────────
# Записи, направляющие домен на CDN
# ─────────────────────────────────────────────────────────────────────────────

# ANAME — аналог CNAME для корня зоны: у apex-домена не может быть CNAME.
resource "yandex_dns_recordset" "apex" {
  count = var.create_dns_zone ? 1 : 0

  zone_id = yandex_dns_zone.site[0].id
  name    = "${var.domain}."
  type    = "ANAME"
  ttl     = 300
  data    = [yandex_cdn_resource.site.provider_cname]
}

resource "yandex_dns_recordset" "www" {
  count = var.create_dns_zone ? 1 : 0

  zone_id = yandex_dns_zone.site[0].id
  name    = "${local.www_domain}."
  type    = "CNAME"
  ttl     = 300
  data    = [yandex_cdn_resource.site.provider_cname]
}
