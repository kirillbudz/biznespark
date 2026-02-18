@echo off
REM Загружает .env.local с ПК на сервер и применяет переменные к сервису biznespark_test.
REM Запускать из корня проекта или из папки scripts (скрипт поднимается на уровень выше).
set KEY="C:\Users\Kirill\Documents\.ssh\id_ed25519"
set SERVER=root@217.114.8.122

cd /d "%~dp0.."
if not exist .env.local (
  echo Файл .env.local не найден в корне проекта.
  pause
  exit /b 1
)

echo Загружаю .env.local на сервер...
scp -i %KEY% .env.local %SERVER%:/root/biznespark.env
if errorlevel 1 (
  echo Ошибка загрузки.
  pause
  exit /b 1
)

echo Применяю переменные к сервису...
ssh -i %KEY% %SERVER% "cd /tmp && rm -rf biznespark-build && git clone -q https://github.com/kirillbudz/biznespark.git biznespark-build && cd biznespark-build && chmod +x scripts/server-update-env.sh && ./scripts/server-update-env.sh /root/biznespark.env"
echo Готово. Заявки должны приходить в Telegram.
pause
