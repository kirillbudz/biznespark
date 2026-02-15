@echo off
REM Подключение к серверу деплоя (ключ: C:\Users\Kirill\Documents\.ssh\id_ed25519)
ssh -i "C:\Users\Kirill\Documents\.ssh\id_ed25519" root@217.114.8.122 %*
