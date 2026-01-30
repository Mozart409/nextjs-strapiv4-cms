# Multi-stage build for production Strapi v5 (monorepo)
FROM node:22-alpine AS build

RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    git \
    > /dev/null 2>&1

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN corepack enable && corepack prepare pnpm@9.15.2 --activate

WORKDIR /opt/

# Copy workspace config and lockfile
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install dependencies for backend only
RUN pnpm install --frozen-lockfile --filter backend

ENV PATH=/opt/node_modules/.bin:$PATH

# Copy backend source
COPY apps/backend ./apps/backend

WORKDIR /opt/apps/backend
RUN pnpm build

# Production image
FROM node:22-alpine

RUN apk add --no-cache vips-dev curl

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN corepack enable && corepack prepare pnpm@9.15.2 --activate

WORKDIR /opt/

# Copy workspace files
COPY --from=build /opt/node_modules ./node_modules
COPY --from=build /opt/apps/backend/node_modules ./apps/backend/node_modules

WORKDIR /opt/apps/backend
COPY --from=build /opt/apps/backend ./

ENV PATH=/opt/node_modules/.bin:/opt/apps/backend/node_modules/.bin:$PATH

RUN chown -R node:node /opt/apps/backend
USER node

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:1337/_health || exit 1

CMD ["pnpm", "start"]
