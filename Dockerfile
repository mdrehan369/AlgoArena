# ================================================================
# Base
# ================================================================
FROM node:22 AS base

WORKDIR /app


# ================================================================
# Dependencies
# ================================================================
FROM base AS deps

COPY package*.json ./
COPY turbo.json ./

COPY apps/web/package.json ./apps/web/
COPY apps/backend/package.json ./apps/backend/
COPY apps/runner/package.json ./apps/runner/

COPY packages/db/package.json ./packages/db/

RUN npm ci

# ================================================================
# PRISMA / DATABASE TOOLS
# ================================================================
FROM base AS prisma

COPY --from=deps /app/node_modules ./node_modules

COPY package*.json ./
COPY packages/db ./packages/db

RUN npx prisma generate \
    --schema=./packages/db/prisma/schema.prisma

# ================================================================
# WEB BUILDER
# ================================================================
FROM base AS web-builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN npx prisma generate \
    --schema=./packages/db/prisma/schema.prisma

RUN npx turbo build --filter=web


# ================================================================
# WEB PRODUCTION
# ================================================================
FROM base AS web

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=web-builder \
    /app/apps/web/.next/standalone ./

COPY --from=web-builder \
    /app/apps/web/.next/static \
    ./apps/web/.next/static

COPY --from=web-builder \
    /app/apps/web/public \
    ./apps/web/public

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]


# ================================================================
# BACKEND BUILDER
# ================================================================
FROM base AS backend-builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate \
    --schema=./packages/db/prisma/schema.prisma

RUN npx turbo build --filter=backend


# ================================================================
# BACKEND PRODUCTION
# ================================================================
FROM base AS backend

ENV NODE_ENV=production
ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify
RUN addgroup --system --gid ${DOCKER_GID} docker
RUN adduser fastify docker

COPY --from=backend-builder \
    /app/apps/backend/dist \
    ./apps/backend/dist

COPY --from=backend-builder \
    /app/apps/backend/package.json \
    ./apps/backend/package.json

COPY --from=backend-builder \
    /app/packages/db \
    ./packages/db

COPY --from=backend-builder \
    /app/node_modules \
    ./node_modules

COPY --from=backend-builder \
    /app/package.json \
    ./package.json

USER fastify

EXPOSE 5000

CMD ["node", "apps/backend/dist/src/index.js"]


# ================================================================
# RUNNER BUILDER
# ================================================================
FROM base AS runner-builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate \
    --schema=./packages/db/prisma/schema.prisma

RUN npx turbo build --filter=runner


# ================================================================
# RUNNER PRODUCTION
# ================================================================
FROM base AS runner

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV KAFKA_BROKER_HOST=algoarenaKafka:9092
ENV KAFKA_CLIENT_ID=mytestrunner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

COPY --from=runner-builder \
    /app/apps/runner/dist \
    ./apps/runner/dist

COPY --from=runner-builder \
    /app/apps/runner/package.json \
    ./apps/runner/package.json

COPY --from=runner-builder \
    /app/packages/db \
    ./packages/db

COPY --from=runner-builder \
    /app/node_modules \
    ./node_modules

COPY --from=runner-builder \
    /app/package.json \
    ./package.json

USER fastify

EXPOSE 8000

CMD ["node", "apps/runner/dist/src/index.js"]
