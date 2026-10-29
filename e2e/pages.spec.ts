import { type APIRequestContext, expect, test } from "@playwright/test";
import { apiHeaders } from "./support";

async function getPages(
  request: APIRequestContext,
  params: Record<string, string>,
) {
  const res = await request.get("/api/pages", {
    headers: apiHeaders(),
    params,
  });
  expect(res.status(), await res.text()).toBe(200);
  return res.json();
}

async function getHome(request: APIRequestContext, locale: string) {
  const body = await getPages(request, { "filters[slug]": "home", locale });
  expect(body.data).toHaveLength(1);
  return body.data[0];
}

test("German home page comes back with its whole dynamic zone populated", async ({
  request,
}, testInfo) => {
  const home = await getHome(request, "de");
  await testInfo.attach("page-home-de.json", {
    body: JSON.stringify(home, null, 2),
    contentType: "application/json",
  });

  expect(home).toMatchObject({
    slug: "home",
    locale: "de",
    shortName: "Startseite",
    heading: "Willkommen auf meiner großartigen Website",
  });
  expect(
    home.contentSections.map((s: { __component: string }) => s.__component),
  ).toEqual([
    "sections.hero",
    "sections.heading",
    "sections.rich-text",
    "sections.features",
    "sections.testimonials-group",
    "sections.bottom-actions",
  ]);

  const [hero, , , features, testimonials, bottomActions] =
    home.contentSections;

  expect(hero.title).toBe("Willkommen auf meiner großartigen Website");
  expect(hero.picture.mime).toBe("image/png");
  expect(hero.picture.url).toMatch(/^\/uploads\/.+\.png$/);
  expect(hero.buttons.map((b: { text: string }) => b.text)).toEqual([
    "Mehr erfahren",
    "Loslegen",
  ]);

  expect(features.feature.map((f: { title: string }) => f.title)).toEqual([
    "Headless-CMS",
    "Blitzschnelles Frontend",
    "API-First-Architektur",
    "Entwicklererlebnis",
  ]);

  expect(
    testimonials.testimonials.map(
      (t: { authorName: string; picture: { mime: string } }) => [
        t.authorName,
        t.picture.mime,
      ],
    ),
  ).toEqual([
    ["Sarah Chen", "image/png"],
    ["Marcus Rivera", "image/png"],
    ["Priya Patel", "image/png"],
  ]);

  expect(bottomActions.buttons.map((b: { text: string }) => b.text)).toEqual([
    "Kontaktieren Sie uns",
    "Mehr erfahren",
  ]);

  // The middleware restricts seo to these fields plus the populated image.
  expect(Object.keys(home.seo).sort()).toEqual([
    "id",
    "metaDescription",
    "metaTitle",
    "shareImage",
  ]);
  expect(home.seo.metaTitle).toBe("Startseite | Meine großartige Website");
  expect(home.seo.shareImage).toBeNull();
});

test("populated hero image is served as a real PNG of the reported size", async ({
  request,
}) => {
  const { picture } = (await getHome(request, "de")).contentSections[0];

  const res = await request.get(picture.url);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");

  const png = await res.body();
  expect(png.subarray(0, 8)).toEqual(
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  );
  // IHDR: width and height are big-endian uint32 at bytes 16 and 20.
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([
    picture.width,
    picture.height,
  ]);
});

test("en and de home are variants of the same document", async ({
  request,
}) => {
  const [en, de] = await Promise.all([
    getHome(request, "en"),
    getHome(request, "de"),
  ]);

  expect(en.documentId).toBe(de.documentId);
  expect(en.locale).toBe("en");
  expect(en.heading).toBe("Welcome to My Awesome Site");
  expect(
    en.contentSections[0].buttons.map((b: { text: string }) => b.text),
  ).toEqual(["Learn More", "Get Started"]);
});

test("listing without filters returns default-locale pages instead of crashing", async ({
  request,
}) => {
  const body = await getPages(request, {});

  const slugs = body.data.map((p: { slug: string }) => p.slug);
  for (const slug of ["home", "about", "contact"]) {
    expect(slugs).toContain(slug);
  }
  expect(new Set(body.data.map((p: { locale: string }) => p.locale))).toEqual(
    new Set(["en"]),
  );
});

test("client filters other than slug are dropped by the middleware", async ({
  request,
}) => {
  const [unfiltered, filtered] = await Promise.all([
    getPages(request, { locale: "en" }),
    getPages(request, {
      locale: "en",
      "filters[shortName][$eq]": "__no_such_page__",
    }),
  ]);

  expect(filtered.meta.pagination.total).toBe(unfiltered.meta.pagination.total);
  expect(
    filtered.data.map((p: { documentId: string }) => p.documentId),
  ).toEqual(unfiltered.data.map((p: { documentId: string }) => p.documentId));
});
