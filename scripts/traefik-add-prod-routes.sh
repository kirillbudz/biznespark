#!/bin/bash
# Добавляет в сервис biznespark_test маршруты Traefik для прод-домена (корень + www).
# Запускать на сервере: bash traefik-add-prod-routes.sh

set -e
SERVICE_NAME="${1:-biznespark_test}"
DOMAIN="xn--14-6kcdulgtyvmj.xn--p1ai"

docker service update \
  --label-add "traefik.http.routers.biznespark-prod-http.entrypoints=web" \
  --label-add "traefik.http.routers.biznespark-prod-http.rule=Host(\`${DOMAIN}\`) || Host(\`www.${DOMAIN}\`)" \
  --label-add "traefik.http.routers.biznespark-prod-http.middlewares=biznespark-redirect-to-https" \
  --label-add "traefik.http.routers.biznespark-prod-http.service=biznespark-dev" \
  --label-add "traefik.http.routers.biznespark-prod.entrypoints=websecure" \
  --label-add "traefik.http.routers.biznespark-prod.rule=Host(\`${DOMAIN}\`) || Host(\`www.${DOMAIN}\`)" \
  --label-add "traefik.http.routers.biznespark-prod.tls.certresolver=le" \
  --label-add "traefik.http.routers.biznespark-prod.service=biznespark-dev" \
  "$SERVICE_NAME"

echo "Готово. Прод доступен по https://${DOMAIN} и https://www.${DOMAIN}"
