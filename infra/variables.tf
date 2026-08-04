variable "cloud_id" {
  description = "ID облака в Yandex Cloud (yc config get cloud-id)"
  type        = string
}

variable "folder_id" {
  description = "ID каталога в Yandex Cloud (yc config get folder-id)"
  type        = string
}

variable "zone" {
  description = "Зона доступности по умолчанию"
  type        = string
  default     = "ru-central1-a"
}

variable "domain" {
  description = "Основной домен сайта, без www и без точки на конце"
  type        = string
  default     = "kosa-msk.ru"

  validation {
    condition     = !startswith(var.domain, "www.") && !endswith(var.domain, ".")
    error_message = "Укажите домен вида kosa-msk.ru — без префикса www и без точки на конце."
  }
}

variable "create_dns_zone" {
  description = <<-EOT
    true  — Terraform создаёт зону в Cloud DNS и все записи сам.
             После apply нужно прописать у регистратора NS-серверы Yandex Cloud
             (они будут в выводе ns_servers).
    false — зона остаётся у текущего DNS-провайдера (например, у регистратора).
             Terraform не трогает DNS, а выводит записи, которые нужно добавить
             руками (см. вывод dns_records_manual).
  EOT
  type        = bool
  default     = true
}

variable "cache_ttl" {
  description = "Сколько секунд CDN хранит ответ в кэше"
  type        = number
  default     = 3600
}
