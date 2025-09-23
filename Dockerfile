# Root Dockerfile for Turbo monorepo
FROM node AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./
COPY turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY apps/backend/package.json ./apps/backend/
COPY apps/runner/package.json ./apps/runner/
COPY packages/db/package.json ./packages/db/

RUN npm ci

FROM deps AS web-dev
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=development
COPY . .

EXPOSE 3000
# Generate Prisma client
RUN npx prisma generate --schema=./packages/db/prisma/schema.prisma
RUN cd ./packages/db && npm run build

CMD ["npx", "turbo", "run", "dev", "--filter=web"]



FROM deps AS backend-dev
ENV NODE_ENV=development
ENV HOST="0.0.0.0"

COPY . .

EXPOSE 5000

# Build db package so Fastify can import it
RUN cd ./packages/db && npm run build

# Run prisma generate at container start (has DATABASE_URL)
CMD sh -c "npx prisma generate --schema=./packages/db/prisma/schema.prisma && npx turbo run dev --filter=backend"


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# # Generate Prisma client
# RUN npx prisma generate --schema=./packages/db/prisma/schema.prisma
# RUN cd ./packages/db && npm run build
#
# # Build the project
# RUN npx turbo build --filter=web
# RUN npx turbo build --filter=backend

RUN npx turbo build

# Production image for web app
FROM base AS web
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/apps/web/next.config.js ./
COPY --from=builder /app/apps/web/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]

# Production image for API
FROM base AS backend
WORKDIR /app

ENV NODE_ENV=production
ENV HOST="0.0.0.0"
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

# Copy built application and dependencies
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/packages/db ./packages/db
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER fastify

EXPOSE 8000

CMD ["node", "apps/backend/dist/src/index.js"]

FROM base AS runnerbuilder
WORKDIR /app

COPY package*.json ./
COPY turbo.json ./
COPY apps/runner/package.json ./apps/runner/
COPY packages/db/package.json ./packages/db/

RUN npm ci

COPY . .

RUN npx prisma generate --schema=./packages/db/prisma/schema.prisma
RUN cd ./packages/db && npm run build

RUN npx turbo build --filter=runner

FROM base AS runner

ENV NODE_ENV=production
ENV HOST="0.0.0.0"
ENV KAFKA_BROKER_HOST="algoarenaKafka:9094"
ENV KAFKA_CLIENT_ID="mytestrunner"
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

# Copy built application and dependencies
COPY --from=runnerbuilder /app/apps/runner/dist ./apps/runner/dist
COPY --from=runnerbuilder /app/apps/runner/package.json ./apps/runner/package.json
COPY --from=runnerbuilder /app/packages/db ./packages/db
COPY --from=runnerbuilder /app/node_modules ./node_modules
COPY --from=runnerbuilder /app/package.json ./package.json

USER fastify

EXPOSE 8000

CMD ["node", "apps/runner/dist/src/index.js"]


FROM base AS runner-dev
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

# RUN npx prisma generate --schema=./packages/db/prisma/schema.prisma
# RUN cd ./packages/db && DATABASE_URL="postgresql://postgres:1234@algoarenaDatabase:5432/algoarena" npm run db:migrate
RUN cd ./packages/db && DATABASE_URL="postgresql://postgres:1234@algoarenaDatabase:5432/algoarena" npm run db:generate && DATABASE_URL="postgresql://postgres:1234@algoarenaDatabase:5432/algoarena" npm run build

CMD ["npx", "turbo", "run", "dev", "--filter=runner"]

