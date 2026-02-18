FROM node:20-alpine AS builder
WORKDIR /app
# Переменные NEXT_PUBLIC_* подставляются в клиентский бандл при сборке (Turnstile, Profitbase).
# Передавай через docker build --build-arg или оставь пустыми.
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ARG NEXT_PUBLIC_PB_HOST=
ARG NEXT_PUBLIC_PB_DOMAIN=
ARG NEXT_PUBLIC_PB_ACCOUNT_ID=
ARG NEXT_PUBLIC_PB_REFERRER=
ARG NEXT_PUBLIC_PB_API_KEY=
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_PB_HOST=$NEXT_PUBLIC_PB_HOST
ENV NEXT_PUBLIC_PB_DOMAIN=$NEXT_PUBLIC_PB_DOMAIN
ENV NEXT_PUBLIC_PB_ACCOUNT_ID=$NEXT_PUBLIC_PB_ACCOUNT_ID
ENV NEXT_PUBLIC_PB_REFERRER=$NEXT_PUBLIC_PB_REFERRER
ENV NEXT_PUBLIC_PB_API_KEY=$NEXT_PUBLIC_PB_API_KEY
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
CMD ["node", "server.js"]
