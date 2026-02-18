#!/bin/bash
# Запускать на сервере: передаёт переменные из файла в сервис biznespark_test.
# Использование: ./scripts/server-update-env.sh /path/to/.env [имя_сервиса]
# Пример: ./scripts/server-update-env.sh /root/biznespark.env

set -e
ENV_FILE="${1:-}"
SERVICE_NAME="${2:-biznespark_test}"

if [[ -z "$ENV_FILE" || ! -f "$ENV_FILE" ]]; then
  echo "Использование: $0 /path/to/.env [имя_сервиса]"
  echo "Пример: $0 /root/biznespark.env"
  exit 1
fi

ARGS=()
while IFS= read -r line || [[ -n "$line" ]]; do
  line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
  [[ -z "$line" || "$line" =~ ^# ]] && continue
  ARGS+=(--env-add "$line")
done < "$ENV_FILE"

if [[ ${#ARGS[@]} -eq 0 ]]; then
  echo "В файле нет переменных (пустые строки и комментарии пропущены)."
  exit 1
fi

echo "Обновляю сервис $SERVICE_NAME переменными из $ENV_FILE..."
docker service update "${ARGS[@]}" "$SERVICE_NAME"
echo "Готово."
