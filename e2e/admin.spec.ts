import { expect, type Page, test } from "@playwright/test";
import { ADMIN } from "./support";

async function logIn(page: Page, email: string, password: string) {
  await page.goto("/admin/auth/login");
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}

test("health endpoint answers 204", async ({ request }) => {
  const res = await request.get("/_health");
  expect(res.status()).toBe(204);
});

test("rejects unknown credentials and stays on the login page", async ({
  page,
}) => {
  // Unknown email, so the seeded admin never hits the login rate limit.
  await logIn(page, "nobody@example.com", "not-the-password");

  await expect(page.getByText("Invalid credentials")).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/auth\/login/);
});

test("an editor logs in and sees the seeded German pages in the content manager", async ({
  page,
}) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/auth\/login/);

  await logIn(page, ADMIN.email, ADMIN.password);
  await expect(page).not.toHaveURL(/\/auth\/login/);

  await page.goto(
    "/admin/content-manager/collection-types/api::page.page?plugins[i18n][locale]=de",
  );

  // slug is shared across locales, the other columns are translated.
  const expected = {
    home: "Startseite",
    about: "Über uns",
    contact: "Kontakt",
  };
  for (const [slug, shortName] of Object.entries(expected)) {
    const row = page
      .getByRole("row")
      .filter({ has: page.getByText(slug, { exact: true }) });
    await expect(row).toHaveCount(1);
    await expect(row).toContainText(shortName);
  }
});
