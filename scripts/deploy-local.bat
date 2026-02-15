@echo off
REM Деплой с локальной папки на сервер (без GitHub): упаковка -> scp -> сборка на сервере.
set KEY="C:\Users\Kirill\Documents\.ssh\id_ed25519"
set SERVER=root@217.114.8.122
set ARCHIVE=biznespark-deploy.tar

cd /d "%~dp0.."
echo Packaging project...
tar -c -f %ARCHIVE% --exclude=node_modules --exclude=.next --exclude=.git --exclude=.cursor --exclude=%ARCHIVE% .
echo Uploading to server...
scp -i %KEY% %ARCHIVE% %SERVER%:/tmp/
echo Building and updating on server...
ssh -i %KEY% %SERVER% "cd /tmp && rm -rf biznespark-build && mkdir biznespark-build && tar xf /tmp/%ARCHIVE% -C biznespark-build && cd biznespark-build && docker build -t biznespark:latest . && docker service update --image biznespark:latest biznespark_test && rm /tmp/%ARCHIVE%"
del %ARCHIVE% 2>nul
echo Done.
pause
