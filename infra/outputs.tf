output "bucket_name" {
  description = "Имя бакета — в него deploy.sh заливает index.html"
  value       = yandex_storage_bucket.site.bucket
}

output "bucket_website_endpoint" {
  description = "Прямой адрес бакета по HTTP — удобно для проверки до настройки DNS"
  value       = "http://${local.bucket_endpoint}"
}

output "cdn_resource_id" {
  description = "ID ресурса CDN — нужен для сброса кэша после деплоя"
  value       = yandex_cdn_resource.site.id
}

output "cdn_cname" {
  description = "Целевой хост CDN, на который смотрят DNS-записи домена"
  value       = yandex_cdn_resource.site.provider_cname
}

output "access_key_id" {
  description = "Access key сервисного аккаунта для S3-совместимого доступа"
  value       = yandex_iam_service_account_static_access_key.site.access_key
}

output "secret_access_key" {
  description = "Secret key сервисного аккаунта (terraform output -raw secret_access_key)"
  value       = yandex_iam_service_account_static_access_key.site.secret_key
  sensitive   = true
}

output "ns_servers" {
  description = "NS-серверы Cloud DNS — их нужно прописать у регистратора домена"
  value = var.create_dns_zone ? [
    "ns1.yandexcloud.net.",
    "ns2.yandexcloud.net.",
  ] : []
}

output "certificate_validation_records" {
  description = <<-EOT
    Записи для подтверждения владения доменом. Terraform добавляет их сам,
    когда create_dns_zone = true. Если зона внешняя — добавьте их у своего
    DNS-провайдера, иначе сертификат не выпустится.
  EOT
  value = [
    for challenge in yandex_cm_certificate.site.challenges : {
      name  = challenge.dns_name
      type  = challenge.dns_type
      value = challenge.dns_value
    }
  ]
}

output "dns_records_manual" {
  description = <<-EOT
    Записи, которые нужно добавить вручную, если DNS-зона осталась у
    регистратора (create_dns_zone = false). При create_dns_zone = true
    список пустой — Terraform уже всё создал.
  EOT
  value = var.create_dns_zone ? [] : [
    {
      name  = "${var.domain}."
      type  = "ANAME (или ALIAS / CNAME-flattening — как называется у регистратора)"
      value = yandex_cdn_resource.site.provider_cname
    },
    {
      name  = "${local.www_domain}."
      type  = "CNAME"
      value = yandex_cdn_resource.site.provider_cname
    },
  ]
}
