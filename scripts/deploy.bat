@echo off
REM Деплой на сервер с этого ПК: пуш в GitHub уже должен быть сделан.
set KEY="C:\Users\Kirill\Documents\.ssh\id_ed25519"
set SERVER=root@217.114.8.122
echo Deploying to server...
ssh -i %KEY% %SERVER% "cd /tmp && rm -rf biznespark-build && git clone https://github.com/kirillbudz/biznespark.git biznespark-build && cd biznespark-build && chmod +x scripts/docker-build-with-env.sh scripts/server-update-env.sh && ./scripts/docker-build-with-env.sh /root/biznespark.env && docker service update --image biznespark:latest biznespark_test && (test -f /root/biznespark.env && ./scripts/server-update-env.sh /root/biznespark.env || true)"
echo Done.
pause
