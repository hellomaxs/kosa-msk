#!/usr/bin/env bash
#
# Заливает index.html в Object Storage и сбрасывает кэш CDN.
#
#   ./deploy.sh
#
# Что нужно заранее:
#   - terraform apply в каталоге infra/ (создаёт бакет, CDN и ключи)
#   - установленный aws cli (pip install awscli)
#   - установленный yc     (для сброса кэша; без него шаг пропускается)
#
# Ключи доступа и ID ресурсов берутся из terraform output, вручную
# прописывать ничего не нужно.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA="$ROOT/infra"
ENDPOINT="https://storage.yandexcloud.net"

say() { printf '\033[1;35m→\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

command -v terraform >/dev/null || die "не найден terraform"
command -v aws >/dev/null       || die "не найден aws cli — поставьте: pip install awscli"
[ -f "$ROOT/index.html" ]       || die "не найден $ROOT/index.html"
[ -d "$INFRA/.terraform" ]      || die "сначала выполните: cd infra && terraform init && terraform apply"

say "Читаю параметры из terraform output"
BUCKET=$(terraform -chdir="$INFRA" output -raw bucket_name)
CDN_ID=$(terraform -chdir="$INFRA" output -raw cdn_resource_id)
AWS_ACCESS_KEY_ID=$(terraform -chdir="$INFRA" output -raw access_key_id)
AWS_SECRET_ACCESS_KEY=$(terraform -chdir="$INFRA" output -raw secret_access_key)
export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION="ru-central1"

[ -n "$BUCKET" ] || die "terraform не вернул имя бакета"

# Страница одна и меняется руками, поэтому кэшируем её недолго:
# правки должны доезжать до посетителей за минуты, а не за сутки.
say "Загружаю index.html в бакет $BUCKET"
aws --endpoint-url="$ENDPOINT" s3 cp \
  "$ROOT/index.html" "s3://$BUCKET/index.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "public, max-age=300, must-revalidate" \
  --only-show-errors

# Картинки, если они появились рядом со страницей, кэшируем надолго —
# их имена обычно меняются вместе с содержимым.
if [ -d "$ROOT/img" ]; then
  say "Загружаю картинки из img/"
  aws --endpoint-url="$ENDPOINT" s3 sync \
    "$ROOT/img" "s3://$BUCKET/img" \
    --cache-control "public, max-age=31536000, immutable" \
    --delete --only-show-errors
fi

if command -v yc >/dev/null; then
  say "Сбрасываю кэш CDN"
  yc cdn cache purge --resource-id "$CDN_ID" --path '/*' >/dev/null
else
  printf '\033[1;33m!\033[0m yc не найден — кэш CDN не сброшен.\n'
  printf '  Правки доедут сами, когда истечёт TTL кэша, либо сбросьте вручную:\n'
  printf '  yc cdn cache purge --resource-id %s --path "/*"\n' "$CDN_ID"
fi

printf '\033[1;32m✓\033[0m Готово: https://%s\n' "$BUCKET"
