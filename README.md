# nextjs-strapiv4-cms

Headless CMS backend built on [Strapi 5](https://docs.strapi.io), PostgreSQL 18 and a pnpm workspace. Deployed to [Railway](https://railway.com) via infrastructure as code.

Originally forked from [strapi/nextjs-corporate-starter](https://github.com/strapi/nextjs-corporate-starter); the Next.js frontend has since been removed and only the Strapi backend lives here.

## Stack

- **Strapi** 5.58 with GraphQL, Users & Permissions and SEO plugins
- **PostgreSQL** 18 (local via Podman Compose)
- **Node** 22–24, **pnpm** 12
- **Uploads**: local in development, AWS S3 in production

## Repository layout

```txt
apps/backend/       Strapi application (config, content types, seed script, Dockerfile)
.railway/           Railway infrastructure as code (railway.ts)
compose.yml         Local PostgreSQL
flake.nix           Nix dev shell with all tooling
justfile            Maintenance recipes
lefthook.yml        Git hooks (biome, dprint, keep-sorted, cocogitto)
```

## Getting started

### 1. Tooling

With Nix and direnv, `direnv allow` loads the dev shell from `flake.nix` (pnpm, podman, just, biome, dprint, railway CLI, trivy, kics, …) and installs the Git hooks via lefthook.

Without Nix, install Node 24, pnpm 12 and Podman (or Docker) yourself.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the database

```bash
pnpm up      # podman compose up -d
```

PostgreSQL listens on `localhost:5555` with user, password and database `strapi`, which are the defaults in `apps/backend/config/database.js`.

### 4. Configure the backend

```bash
cp apps/backend/.env.example apps/backend/.env
```

| Variable                                                                                    | Purpose                              |
| ------------------------------------------------------------------------------------------- | ------------------------------------ |
| `HOST`, `PORT`                                                                              | Server bind address (default `1337`) |
| `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`                     | Strapi secrets                       |
| `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` | PostgreSQL connection                |
| `STRAPI_URL`                                                                                | Public URL of the backend            |
| `AWS_ACCESS_KEY_ID`, `AWS_ACCESS_SECRET`, `AWS_REGION`, `AWS_BUCKET`                        | S3 uploads (production only)         |

### 5. Run Strapi

```bash
pnpm dev
```

The admin panel is at <http://localhost:1337/admin>; on first start you are asked to create an admin user.

### 6. Seed content

```bash
pnpm seed
```

Runs `apps/backend/scripts/seed.js`, which creates the `en` and `de` locales and seeds pages, globals, articles, categories and authors.

## Content types

`article`, `author`, `category`, `dynamic-rich-text`, `global`, `lead-form-submission`, `page`, `product-feature`. `page` and `global` are localized.

The API is available over REST (`/api/...`) and GraphQL (`/graphql`). Create API tokens under **Settings → API Tokens** in the admin panel for any consuming frontend.

## Scripts

| Command              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `pnpm dev`           | Start Strapi in develop mode                         |
| `pnpm be`            | Build the Strapi admin panel                         |
| `pnpm seed`          | Seed the database                                    |
| `pnpm export`        | Export data to `apps/seed-data.tar.gz` (unencrypted) |
| `pnpm seed:legacy`   | Import `apps/seed-data.tar.gz` with `strapi import`  |
| `pnpm up` / `down`   | Start / stop local PostgreSQL                        |
| `pnpm build:backend` | Build the production image with Podman               |
| `pnpm scan:backend`  | Build the image and scan it with trivy and kics      |
| `pnpm fmt`           | Format backend sources with dprint                   |
| `just update`        | Update `flake.lock` and commit it                    |

## Deployment

The backend runs as a single Railway service defined in [`.railway/railway.ts`](.railway/railway.ts). It builds `apps/backend` with Railpack, starts with `pnpm start`, health-checks `/_health` and only redeploys when the backend or workspace manifests change. The file is a named partial: Postgres, Redis and the backup cron are managed in the Railway dashboard, and secrets stay in Railway.

```bash
railway config plan    # preview changes
railway config apply   # apply them
```

See [`.railway/README.md`](.railway/README.md) for details.

## Contributing

Commits follow [Conventional Commits](https://www.conventionalcommits.org) and are verified by cocogitto in the `commit-msg` hook. Pre-commit hooks format staged files with biome, dprint and keep-sorted.
