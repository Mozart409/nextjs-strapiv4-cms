import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:1337";

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  forbidOnly: !!process.env.CI,
  // No retries: a flaky test must be made deterministic, not re-run until green.
  retries: 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Locally, reuse the Strapi you already started with `pnpm dev`. Otherwise
  // `strapi start` needs a built admin panel: CI builds it in its own step, a
  // local run builds it here.
  webServer: {
    command: process.env.CI
      ? "pnpm --dir apps/backend exec strapi start"
      : "pnpm be && pnpm --dir apps/backend exec strapi start",
    url: `${baseURL}/_health`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    stdout: "pipe",
  },
});
