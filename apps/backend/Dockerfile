# syntax=docker/dockerfile:1
# Multi-stage build for production Strapi v5 (monorepo)
# Workspace only contains apps/backend

ARG NODE_VERSION=24
ARG PNPM_VERSION=10.29.2

# ─── Build stage ───
FROM node:${NODE_VERSION}-alpine AS build

RUN apk update && apk upgrade --no-cache && apk add --no-cache \
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

ARG PNPM_VERSION
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /opt/

# Copy workspace root files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package manifest
COPY apps/backend/package.json ./apps/backend/

# Install all dependencies (backend is the only workspace package)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

ENV PATH=/opt/node_modules/.bin:$PATH

# Copy backend source and build
COPY apps/backend ./apps/backend

WORKDIR /opt/apps/backend
RUN pnpm build

# ─── Production stage ───
FROM node:${NODE_VERSION}-alpine

LABEL org.opencontainers.image.title="strapi-backend" \
      org.opencontainers.image.description="Strapi v5 CMS backend" \
      org.opencontainers.image.source="https://github.com/Mozart409/nextjs-strapiv4-cms"

# Patch Alpine packages for CVE fixes; tini provides proper PID 1 signal handling
RUN apk update && apk upgrade --no-cache && apk add --no-cache vips-dev curl tini

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PNPM_VERSION
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /opt/

# Copy workspace manifests for a clean production install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install ONLY production dependencies (no devDependencies, no build tools)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod

# Remove esbuild and other build-only Go binaries that carry CVEs but are not needed at runtime.
# The admin panel is already built in the build stage; esbuild is only a build tool.
RUN find /opt/node_modules -path "*esbuild*" -type f \( -name "esbuild" -o -name "esbuild.exe" \) -delete || true && \
    find /opt/node_modules -path "*esbuild*" -type d -name "bin" -exec sh -c 'rm -f "$1"/*' _ {} \; || true

WORKDIR /opt/apps/backend

# Copy built backend artifacts (excludes node_modules, .tmp, build cache)
COPY --from=build /opt/apps/backend/build ./build
COPY --from=build /opt/apps/backend/.strapi ./.strapi
COPY --from=build /opt/apps/backend/config ./config
COPY --from=build /opt/apps/backend/src ./src
COPY --from=build /opt/apps/backend/scripts ./scripts
COPY --from=build /opt/apps/backend/package.json ./

# Ensure runtime directories exist
RUN mkdir -p .tmp public/uploads

ENV PATH=/opt/node_modules/.bin:/opt/apps/backend/node_modules/.bin:$PATH

RUN chown -R node:node /opt/apps/backend
USER node

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:1337/_health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["pnpm", "start"]
