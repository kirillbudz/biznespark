#!/bin/bash
# Сборка образа с передачей NEXT_PUBLIC_* из файла (чтобы Turnstile/Profitbase работали в проде).
# Запускать из корня репо на сервере: ./scripts/docker-build-with-env.sh /root/biznespark.env
set -e
ENV_FILE="${1:-/root/biznespark.env}"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Файл не найден: $ENV_FILE. Сборка без NEXT_PUBLIC_* (Turnstile/Profitbase в проде не будут видны)."
  docker build -t biznespark:latest .
  exit 0
fi
build_args=()
while IFS= read -r line || [[ -n "$line" ]]; do
  line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
  [[ -z "$line" || "$line" =~ ^# ]] && continue
  if [[ "$line" =~ ^NEXT_PUBLIC_ ]]; then
    build_args+=(--build-arg "$line")
  fi
done < "$ENV_FILE"
echo "Сборка с ${#build_args[@]} build-arg из $ENV_FILE"
docker build "${build_args[@]}" -t biznespark:latest .
