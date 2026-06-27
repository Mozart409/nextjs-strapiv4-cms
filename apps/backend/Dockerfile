# Multi-stage build for production Strapi v5 (monorepo)
# Workspace only contains apps/backend, so we install from root and filter is unnecessary
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

RUN corepack enable && corepack prepare pnpm@10.29.2 --activate

WORKDIR /opt/

# Copy workspace root files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package manifest
COPY apps/backend/package.json ./apps/backend/

# Install dependencies (backend is the only workspace package)
RUN pnpm install --frozen-lockfile

ENV PATH=/opt/node_modules/.bin:$PATH

# Copy backend source and build
COPY apps/backend ./apps/backend

WORKDIR /opt/apps/backend
RUN pnpm build

# Production image
FROM node:22-alpine

RUN apk add --no-cache vips-dev curl

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN corepack enable && corepack prepare pnpm@10.29.2 --activate

WORKDIR /opt/

# Copy workspace node_modules (pnpm .pnpm store + hoisted deps)
COPY --from=build /opt/node_modules ./node_modules
COPY --from=build /opt/apps/backend/node_modules ./apps/backend/node_modules

WORKDIR /opt/apps/backend

# Copy built backend (includes src, config, build, .strapi, package.json)
COPY --from=build /opt/apps/backend ./

# Ensure runtime directories exist
RUN mkdir -p .tmp public/uploads

ENV PATH=/opt/node_modules/.bin:/opt/apps/backend/node_modules/.bin:$PATH

RUN chown -R node:node /opt/apps/backend
USER node

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:1337/_health || exit 1

CMD ["pnpm", "start"]
