terraform {
  required_version = ">= 1.5"

  required_providers {
    yandex = {
      source  = "yandex-cloud/yandex"
      version = "~> 0.140"
    }
  }
}

provider "yandex" {
  # Токен берётся из переменной окружения YC_TOKEN,
  # либо из ~/.config/yandex-cloud/config.yaml после `yc init`.
  cloud_id  = var.cloud_id
  folder_id = var.folder_id
  zone      = var.zone
}
