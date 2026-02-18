# Бизнеспарк — сайт застройщика

Корпоративный маркетинговый сайт ООО СЗ «Бизнеспарк» (Якутск): главная страница компании, лендинги жилых комплексов «Крепость» и «Гастелло», политика конфиденциальности. Описание компании, преимущества, проекты, контакты; на страницах ЖК — герой, описание, подбор квартир (виджет Profitbase), планировки, галерея, форма обратной связи.

## Что есть на сайте

- **Главная** (`/`) — герой компании, о застройщике, преимущества, блок проектов, контакты.
- **ЖК «Крепость»** (`/projects/krepost`) — лендинг ЖК с подбором квартир, планировками и галереей.
- **ЖК «Гастелло»** (`/projects/gastello`) — лендинг второго проекта.
- **Политика конфиденциальности** (`/privacy`).
- Контент компании вынесен в `src/content/company.ts` (название, контакты, текст «О компании», статистика).

## Стек и библиотеки

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4** + PostCSS
- **Catalyst** — UI-компоненты (кнопки, заголовки, форма, навигация и др.)
- **shadcn/ui** — утилита `cn`, компонент Button
- **Headless UI** (`@headlessui/react`) — интерактивные компоненты
- **Motion** — анимации
- **class-variance-authority**, **clsx**, **tailwind-merge** — классы и варианты стилей
- **ESLint** + **eslint-config-next**
- Без CMS, без БД, без админки

## Структура проекта

- `src/app/` — страницы и layout (главная, проекты, privacy)
- `src/app/api/contact/` — API отправки формы обратной связи
- `src/components/` — секции и блоки (CompanyHero, AboutCompanySection, AdvantagesSection, ProjectsSection, Hero, AboutSection, ChooseApartmentSection, GallerySection, ContactSection, ProfitbaseFloatingWidget, ProjectNav и др.)
- `src/components/ui/` — UI-компоненты (shadcn)
- `src/components/catalyst/` — компоненты Catalyst
- `src/components/gastello/` — компоненты страницы ЖК Гастелло
- `src/content/` — данные компании и тексты
- `src/lib/` — утилиты
- `public/` — статика (изображения, видео, галерея, медиа по проектам)

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```

## Переменные окружения

Список переменных — в **`.env.example`** (скопируй в `.env.local` для разработки).

- **Заявки с сайта:** чтобы заявки приходили в Telegram, на сервере обязательно задать `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`. Turnstile: в [Cloudflare Turnstile](https://dash.cloudflare.com/) в настройках виджета в **Hostname Management** добавь оба хоста — корень домена и **www** (иначе на проде виджет не покажется).
- **Виджет Profitbase:** ключи с префиксом `NEXT_PUBLIC_PB_*` (в проде нужны при сборке образа, если виджет должен работать). Локально виджет может возвращать 401/403, если в кабинете Profitbase не добавлен localhost; на проде укажи домен в настройках доступа.

### Переменные на сервере (чтобы заявки приходили)

Переменные окружения контейнеру передаются через Docker Swarm. После деплоя один раз настрой их на сервере:

1. Подключись к серверу (например, `scripts\ssh-connect.bat` или `ssh -i путь/к/ключу root@IP`).
2. Создай файл с переменными (например, `/root/biznespark.env`). Скопируй из репозитория `.env.example`, заполни значения:
   - `TELEGRAM_BOT_TOKEN` — токен бота от [@BotFather](https://t.me/BotFather).
   - `TELEGRAM_CHAT_ID` — ID чата или группы (можно узнать через [@userinfobot](https://t.me/userinfobot) в нужном чате).
   При необходимости добавь `TURNSTILE_SECRET_KEY` и др.
3. Примени переменные к сервису. **С ПК (если уже есть `.env.local`):** запусти **`scripts\deploy-env.bat`** — он загрузит `.env.local` на сервер и применит переменные.  
   Либо на сервере вручную (после создания `/root/biznespark.env`):
   ```bash
   cd /tmp && rm -rf biznespark-build && git clone https://github.com/kirillbudz/biznespark.git biznespark-build && cd biznespark-build
   chmod +x scripts/server-update-env.sh
   ./scripts/server-update-env.sh /root/biznespark.env
   ```
   Либо одной командой:  
   `docker service update --env-add TELEGRAM_BOT_TOKEN=ваш_токен --env-add TELEGRAM_CHAT_ID=ваш_chat_id biznespark_test`
4. После этого контейнер перезапустится с новыми переменными; заявки начнут уходить в Telegram.

Файл `/root/biznespark.env` на сервер не добавляй в репозиторий — храни только на сервере.

**Почему в корне проекта на сервере нет `.env`:** репозиторий клонируется без секретов (`.env` в `.gitignore`). Переменные для **запущенного** приложения берутся из окружения контейнера (их задаёт `server-update-env.sh` из `/root/biznespark.env`). Для **сборки** образа (чтобы Cloudflare Turnstile и виджет Profitbase работали в проде) скрипт `docker-build-with-env.sh` читает тот же `/root/biznespark.env` и передаёт `NEXT_PUBLIC_*` в `docker build --build-arg`. Отдельный файл `.env` в корне репо на сервере не нужен.

## Деплой с локала в GitHub

1. Закоммить и запушить изменения:
   ```bash
   git add .
   git commit -m "описание изменений"
   git push origin main
   ```
2. Репозиторий обновится; для деплоя на сервер используй скрипты из раздела ниже.

## Деплой на сервер

Сервер должен быть с Docker и Docker Swarm; приложение разворачивается как сервис Swarm.

**Два варианта:**

1. **Деплой из GitHub** — на сервере клонируется репозиторий, собирается образ, обновляется сервис.  
   Запуск с ПК: **`scripts\deploy.bat`**  
   В скрипте нужно указать путь к SSH-ключу и адрес сервера (хост и пользователь).

2. **Деплой с локальной папки** — архив проекта копируется на сервер по SCP, там собирается образ и обновляется сервис. Удобно, если правки ещё не запушены в GitHub.  
   Запуск с ПК: **`scripts\deploy-local.bat`**  
   Аналогично в скрипте задаются путь к ключу и адрес сервера.

В оба скрипта не добавляй IP, пароли и содержимое ключей в репозиторий — храни их только локально или в секретах.

## Лицензия

Private.
