import { defineRailway, github, project, service } from "railway/iac";

// This repository is the source of exactly one Railway service, so it declares a
// named partial: it owns that service and leaves everything else in the
// environment (Backup CRON, Redis, Postgres and their volumes) to the dashboard.
export const partial = "nextjs-strapiv4-cms";

export default defineRailway(() => {
  const backend = service("nextjs-strapiv4-cms", {
    source: github("Romo61/nextjs-strapiv4-cms", {
      branch: "main",
      checkSuites: false,
    }),
    build: {
      // The Dockerfile copies the workspace manifests, so it builds with the
      // repository root as context rather than a root directory.
      builder: "DOCKERFILE",
      dockerfilePath: "apps/backend/Dockerfile",
      // Monorepo: only redeploy when the backend or the workspace manifests
      // change. Patterns match from the repository root, not the root directory.
      watchPatterns: [
        "/apps/backend/**",
        "/package.json",
        "/pnpm-lock.yaml",
        "/pnpm-workspace.yaml",
      ],
    },
    // Call strapi directly: pnpm 12 runs an install before scripts, which fails
    // on the root-owned node_modules and downloads pnpm via corepack on boot.
    start: "strapi start",
    // Strapi v5 answers GET /_health with 204.
    healthcheck: "/_health",
    // The first boot after the v4 → v5 upgrade runs data migrations for 5+ min.
    healthcheckTimeout: 900,
    replicas: { "europe-west4-drams3a": 1 },
    deploy: {
      limitOverride: {
        containers: {
          cpu: 1,
          cpuDescription: "8 vCPU",
          diskBytes: 100000000000,
          diskDescription: "100 GB",
          memoryBytes: 1000000000,
          memoryDescription: "8 GB",
        },
      },
      sleepApplication: false,
      // Zero-downtime deploys: keep the old deploy serving while the new one
      // boots, then give it a grace period after SIGTERM before SIGKILL.
      overlapSeconds: 30,
      drainingSeconds: 30,
    },
  });

  return project("strapi-v4", {
    // Secrets stay on Railway; IaC neither reads nor writes variables.
    variables: { managed: false },
    resources: [backend],
  });
});
