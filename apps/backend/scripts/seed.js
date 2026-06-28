#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Load .env file manually since dotenv may not be installed
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    // Remove surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const { createStrapi } = require("@strapi/strapi");

// Locales to seed. "en" is the Strapi default locale; "de" is added below.
// Only i18n-enabled content types (page, global) are seeded per-locale.
// article / category / author are NOT localized in their schemas, so they
// are seeded once without a locale.
const LOCALES = [
  { code: "en", name: "English (en)" },
  { code: "de", name: "German (de)" },
];

const SEED_CONFIG = {
  admin: {
    email: "admin@example.com",
    password: "Admin123!",
    firstname: "Admin",
    lastname: "User",
  },
  // Localized single type: one variant per locale.
  global: {
    en: {
      metadata: {
        metaTitle: "My Awesome Site",
        metaDescription: "A demo site built with Strapi and Next.js",
      },
      navbar: {
        links: [
          { url: "/", newTab: false, text: "Home" },
          { url: "/about", newTab: false, text: "About" },
          { url: "/blog", newTab: false, text: "Blog" },
        ],
        button: {
          url: "/contact",
          newTab: false,
          text: "Get in Touch",
          type: "primary",
        },
        navbarLogo: {
          logoText: "MySite",
        },
      },
      footer: {
        menuLinks: [
          { url: "/", newTab: false, text: "Home" },
          { url: "/about", newTab: false, text: "About" },
          { url: "/contact", newTab: false, text: "Contact" },
        ],
        legalLinks: [
          { url: "/privacy", newTab: false, text: "Privacy Policy" },
          { url: "/terms", newTab: false, text: "Terms of Service" },
        ],
        socialLinks: [],
        footerLogo: {
          logoText: "MySite",
        },
      },
    },
    de: {
      metadata: {
        metaTitle: "Meine großartige Website",
        metaDescription: "Eine Demo-Website, erstellt mit Strapi und Next.js",
      },
      navbar: {
        links: [
          { url: "/", newTab: false, text: "Startseite" },
          { url: "/about", newTab: false, text: "Über uns" },
          { url: "/blog", newTab: false, text: "Blog" },
        ],
        button: {
          url: "/contact",
          newTab: false,
          text: "Kontakt aufnehmen",
          type: "primary",
        },
        navbarLogo: {
          logoText: "MySite",
        },
      },
      footer: {
        menuLinks: [
          { url: "/", newTab: false, text: "Startseite" },
          { url: "/about", newTab: false, text: "Über uns" },
          { url: "/contact", newTab: false, text: "Kontakt" },
        ],
        legalLinks: [
          { url: "/privacy", newTab: false, text: "Datenschutz" },
          { url: "/terms", newTab: false, text: "Nutzungsbedingungen" },
        ],
        socialLinks: [],
        footerLogo: {
          logoText: "MySite",
        },
      },
    },
  },
  // Localized collection type: `slug` is shared across locales (localized:false),
  // everything else is translated per locale.
  pages: [
    {
      slug: "home",
      en: {
        shortName: "Home",
        heading: "Welcome to My Awesome Site",
        description: "This is the homepage built with Strapi and Next.js.",
        contentSections: [
          {
            __component: "sections.hero",
            title: "Welcome to My Awesome Site",
            description:
              "Built with Strapi and Next.js for blazing-fast performance.",
            buttons: [
              {
                url: "/about",
                newTab: false,
                text: "Learn More",
                type: "primary",
              },
              {
                url: "/contact",
                newTab: false,
                text: "Get Started",
                type: "secondary",
              },
            ],
          },
          {
            __component: "sections.heading",
            heading: "Why Choose Us",
            description: "We build modern web experiences.",
            title_color: "black",
            title_type: "h2",
          },
          {
            __component: "sections.rich-text",
            content:
              "<p>We combine the power of <strong>Strapi</strong> as a headless CMS with <strong>Next.js</strong> for server-side rendering and static site generation. The result is a fast, secure, and scalable web application.</p>",
          },
          {
            __component: "sections.features",
            heading: "Our Core Services",
            description:
              "We offer a comprehensive suite of solutions to power your digital presence.",
            feature: [
              {
                title: "Headless CMS",
                description:
                  "Flexible content management with Strapi, giving you full control over your data structures.",
                showLink: false,
                newTab: false,
              },
              {
                title: "Blazing Fast Frontend",
                description:
                  "Static generation and server-side rendering with Next.js for optimal performance.",
                showLink: false,
                newTab: false,
              },
              {
                title: "API-First Architecture",
                description:
                  "RESTful and GraphQL APIs that connect your content to any frontend or device.",
                showLink: false,
                newTab: false,
              },
              {
                title: "Developer Experience",
                description:
                  "TypeScript, hot reload, and a modern toolchain for productive development.",
                showLink: false,
                newTab: false,
              },
            ],
          },
          {
            __component: "sections.testimonials-group",
            title: "What Our Clients Say",
            description:
              "Hear from teams who have transformed their web stack with us.",
            testimonials: [
              {
                text: "This stack saved us months of development time. The flexibility of Strapi combined with Next.js performance is unbeatable.",
                authorName: "Sarah Chen",
              },
              {
                text: "We migrated from a monolithic CMS and never looked back. Our page loads went from 4s to under 1s.",
                authorName: "Marcus Rivera",
              },
              {
                text: "The developer experience is exceptional. Our team was productive from day one.",
                authorName: "Priya Patel",
              },
            ],
          },
          {
            __component: "sections.bottom-actions",
            title: "Ready to Get Started?",
            description: "Let's build something great together.",
            buttons: [
              {
                url: "/contact",
                newTab: false,
                text: "Contact Us",
                type: "primary",
              },
              {
                url: "/about",
                newTab: false,
                text: "Learn More",
                type: "secondary",
              },
            ],
          },
        ],
        seo: {
          metaTitle: "Home | My Awesome Site",
          metaDescription:
            "Welcome to our demo site built with Strapi and Next.js.",
        },
      },
      de: {
        shortName: "Startseite",
        heading: "Willkommen auf meiner großartigen Website",
        description:
          "Dies ist die Startseite, erstellt mit Strapi und Next.js.",
        contentSections: [
          {
            __component: "sections.hero",
            title: "Willkommen auf meiner großartigen Website",
            description:
              "Erstellt mit Strapi und Next.js für blitzschnelle Performance.",
            buttons: [
              {
                url: "/about",
                newTab: false,
                text: "Mehr erfahren",
                type: "primary",
              },
              {
                url: "/contact",
                newTab: false,
                text: "Loslegen",
                type: "secondary",
              },
            ],
          },
          {
            __component: "sections.heading",
            heading: "Warum uns wählen",
            description: "Wir schaffen moderne Web-Erlebnisse.",
            title_color: "black",
            title_type: "h2",
          },
          {
            __component: "sections.rich-text",
            content:
              "<p>Wir kombinieren die Leistung von <strong>Strapi</strong> als Headless-CMS mit <strong>Next.js</strong> für serverseitiges Rendering und statische Seitengenerierung. Das Ergebnis ist eine schnelle, sichere und skalierbare Webanwendung.</p>",
          },
          {
            __component: "sections.features",
            heading: "Unsere Kernleistungen",
            description:
              "Wir bieten eine umfassende Palette an Lösungen, um Ihre digitale Präsenz zu stärken.",
            feature: [
              {
                title: "Headless-CMS",
                description:
                  "Flexible Inhaltsverwaltung mit Strapi – volle Kontrolle über Ihre Datenstrukturen.",
                showLink: false,
                newTab: false,
              },
              {
                title: "Blitzschnelles Frontend",
                description:
                  "Statische Generierung und serverseitiges Rendering mit Next.js für optimale Performance.",
                showLink: false,
                newTab: false,
              },
              {
                title: "API-First-Architektur",
                description:
                  "RESTful- und GraphQL-APIs, die Ihre Inhalte mit jedem Frontend oder Gerät verbinden.",
                showLink: false,
                newTab: false,
              },
              {
                title: "Entwicklererlebnis",
                description:
                  "TypeScript, Hot Reload und ein moderner Toolchain für produktive Entwicklung.",
                showLink: false,
                newTab: false,
              },
            ],
          },
          {
            __component: "sections.testimonials-group",
            title: "Was unsere Kunden sagen",
            description:
              "Hören Sie von Teams, die ihren Web-Stack mit uns transformiert haben.",
            testimonials: [
              {
                text: "Dieser Stack hat uns Monate an Entwicklungszeit gespart. Die Flexibilität von Strapi kombiniert mit der Performance von Next.js ist unschlagbar.",
                authorName: "Sarah Chen",
              },
              {
                text: "Wir sind von einem monolithischen CMS migriert und haben es nie bereut. Unsere Ladezeiten sanken von 4 s auf unter 1 s.",
                authorName: "Marcus Rivera",
              },
              {
                text: "Das Entwicklererlebnis ist außergewöhnlich. Unser Team war vom ersten Tag an produktiv.",
                authorName: "Priya Patel",
              },
            ],
          },
          {
            __component: "sections.bottom-actions",
            title: "Bereit loszulegen?",
            description: "Lassen Sie uns gemeinsam etwas Großartiges schaffen.",
            buttons: [
              {
                url: "/contact",
                newTab: false,
                text: "Kontaktieren Sie uns",
                type: "primary",
              },
              {
                url: "/about",
                newTab: false,
                text: "Mehr erfahren",
                type: "secondary",
              },
            ],
          },
        ],
        seo: {
          metaTitle: "Startseite | Meine großartige Website",
          metaDescription:
            "Willkommen auf unserer Demo-Website, erstellt mit Strapi und Next.js.",
        },
      },
    },
    {
      slug: "about",
      en: {
        shortName: "About",
        heading: "About Us",
        description: "Learn more about who we are and what we do.",
        contentSections: [
          {
            __component: "sections.hero",
            title: "About Us",
            description:
              "We are a small team passionate about building great web experiences.",
            buttons: [
              {
                url: "/contact",
                newTab: false,
                text: "Contact Us",
                type: "primary",
              },
            ],
          },
          {
            __component: "sections.rich-text",
            content:
              "<p>Founded in 2024, we started with a simple mission: make content management effortless and front-end development delightful. We believe in open source, modern tooling, and great developer experience.</p>",
          },
          {
            __component: "sections.features",
            heading: "Our Values",
            description: "These principles guide everything we build.",
            feature: [
              {
                title: "Open Source First",
                description:
                  "We contribute back to the community and build on transparent, auditable foundations.",
                showLink: false,
                newTab: false,
              },
              {
                title: "Performance Obsessed",
                description:
                  "Every millisecond counts. We optimize relentlessly for speed and user experience.",
                showLink: false,
                newTab: false,
              },
              {
                title: "Developer Happiness",
                description:
                  "Great tools make great products. We invest in DX to empower our team.",
                showLink: false,
                newTab: false,
              },
            ],
          },
          {
            __component: "sections.list",
            listElement: [
              {
                title: "Innovation",
                content:
                  "<p>We stay ahead of the curve, adopting modern technologies and best practices to deliver cutting-edge solutions.</p>",
              },
              {
                title: "Collaboration",
                content:
                  "<p>We work closely with our clients, treating every project as a true partnership from start to finish.</p>",
              },
              {
                title: "Reliability",
                content:
                  "<p>Downtime is not an option. We build robust, scalable systems that our clients can depend on.</p>",
              },
            ],
          },
        ],
        seo: {
          metaTitle: "About | My Awesome Site",
          metaDescription: "Learn more about our team and mission.",
        },
      },
      de: {
        shortName: "Über uns",
        heading: "Über uns",
        description: "Erfahren Sie mehr darüber, wer wir sind und was wir tun.",
        contentSections: [
          {
            __component: "sections.hero",
            title: "Über uns",
            description:
              "Wir sind ein kleines Team mit Leidenschaft für großartige Web-Erlebnisse.",
            buttons: [
              {
                url: "/contact",
                newTab: false,
                text: "Kontaktieren Sie uns",
                type: "primary",
              },
            ],
          },
          {
            __component: "sections.rich-text",
            content:
              "<p>Gegründet im Jahr 2024, starteten wir mit einer einfachen Mission: Inhaltsverwaltung mühelos und Frontend-Entwicklung erfreulich zu machen. Wir glauben an Open Source, moderne Tools und ein großartiges Entwicklererlebnis.</p>",
          },
          {
            __component: "sections.features",
            heading: "Unsere Werte",
            description: "Diese Prinzipien leiten alles, was wir entwickeln.",
            feature: [
              {
                title: "Open Source zuerst",
                description:
                  "Wir geben der Community etwas zurück und bauen auf transparenten, überprüfbaren Grundlagen auf.",
                showLink: false,
                newTab: false,
              },
              {
                title: "Performance-besessen",
                description:
                  "Jede Millisekunde zählt. Wir optimieren unermüdlich für Geschwindigkeit und Nutzererlebnis.",
                showLink: false,
                newTab: false,
              },
              {
                title: "Entwicklerzufriedenheit",
                description:
                  "Großartige Tools machen großartige Produkte. Wir investieren in DX, um unser Team zu stärken.",
                showLink: false,
                newTab: false,
              },
            ],
          },
          {
            __component: "sections.list",
            listElement: [
              {
                title: "Innovation",
                content:
                  "<p>Wir bleiben am Puls der Zeit und setzen moderne Technologien und Best Practices ein, um zukunftsweisende Lösungen zu liefern.</p>",
              },
              {
                title: "Zusammenarbeit",
                content:
                  "<p>Wir arbeiten eng mit unseren Kunden zusammen und behandeln jedes Projekt von Anfang bis Ende als echte Partnerschaft.</p>",
              },
              {
                title: "Zuverlässigkeit",
                content:
                  "<p>Ausfallzeiten sind keine Option. Wir bauen robuste, skalierbare Systeme, auf die sich unsere Kunden verlassen können.</p>",
              },
            ],
          },
        ],
        seo: {
          metaTitle: "Über uns | Meine großartige Website",
          metaDescription:
            "Erfahren Sie mehr über unser Team und unsere Mission.",
        },
      },
    },
    {
      slug: "contact",
      en: {
        shortName: "Contact",
        heading: "Contact Us",
        description: "Get in touch with us.",
        contentSections: [
          {
            __component: "sections.heading",
            heading: "Contact Us",
            description: "We would love to hear from you.",
            title_color: "black",
            title_type: "h1",
          },
          {
            __component: "sections.rich-text",
            content:
              "<p>Email us at <a href='mailto:hello@example.com'>hello@example.com</a> or follow us on social media.</p>",
          },
          {
            __component: "sections.lead-form",
            title: "Subscribe to Our Newsletter",
            description:
              "Stay up to date with our latest articles and product updates.",
            emailPlaceholder: "Enter your email address",
            location: "https://example.com/api/subscribe",
            submitButton: {
              text: "Subscribe",
              type: "primary",
            },
          },
        ],
        seo: {
          metaTitle: "Contact | My Awesome Site",
          metaDescription: "Get in touch with our team.",
        },
      },
      de: {
        shortName: "Kontakt",
        heading: "Kontaktieren Sie uns",
        description: "Nehmen Sie Kontakt mit uns auf.",
        contentSections: [
          {
            __component: "sections.heading",
            heading: "Kontaktieren Sie uns",
            description: "Wir würden gerne von Ihnen hören.",
            title_color: "black",
            title_type: "h1",
          },
          {
            __component: "sections.rich-text",
            content:
              "<p>Schreiben Sie uns an <a href='mailto:hello@example.com'>hello@example.com</a> oder folgen Sie uns in den sozialen Medien.</p>",
          },
          {
            __component: "sections.lead-form",
            title: "Abonnieren Sie unseren Newsletter",
            description:
              "Bleiben Sie über unsere neuesten Artikel und Produkt-Updates auf dem Laufenden.",
            emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
            location: "https://example.com/api/subscribe",
            submitButton: {
              text: "Abonnieren",
              type: "primary",
            },
          },
        ],
        seo: {
          metaTitle: "Kontakt | Meine großartige Website",
          metaDescription: "Nehmen Sie Kontakt mit unserem Team auf.",
        },
      },
    },
  ],
  categories: [
    { name: "General", description: "General articles about everything." },
    { name: "Tech", description: "Technology and development topics." },
    { name: "Tutorial", description: "Step-by-step guides and tutorials." },
  ],
  authors: [
    { name: "Alice Writer", email: "alice@example.com" },
    { name: "Bob Coder", email: "bob@example.com" },
  ],
  articles: [
    {
      title: "Hello World",
      description: "Our very first blog post welcoming readers to the site.",
      publishedAt: new Date(),
      blocks: [
        {
          __component: "shared.rich-text",
          body: "<p>Welcome to our blog! We will be sharing insights, tutorials, and updates here. Stay tuned!</p>",
        },
        {
          __component: "shared.quote",
          title: "A Word from Our Team",
          body: "The best way to predict the future is to build it. Every line of code we write is a step toward a better web.",
          author: "Alice Writer, Lead Developer",
        },
      ],
    },
    {
      title: "Getting Started with Strapi",
      description: "A quick introduction to using Strapi as your headless CMS.",
      publishedAt: new Date(),
      blocks: [
        {
          __component: "shared.rich-text",
          body: "<p>Strapi is an open-source headless CMS that makes it easy to create and manage content. In this post we cover installation, content types, and the REST API.</p>",
        },
        {
          __component: "shared.video-embed",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      ],
    },
    {
      title: "Next.js Tips and Tricks",
      description: "Handy patterns for building faster with Next.js.",
      publishedAt: new Date(),
      blocks: [
        {
          __component: "shared.rich-text",
          body: "<p>Next.js App Router, Server Components, and caching strategies can dramatically improve your site performance. Here are our favorite tips.</p>",
        },
        {
          __component: "shared.media",
        },
      ],
    },
  ],
};

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
  };
  return map[ext] || "application/octet-stream";
}

async function uploadImage(strapi, imagePath, options = {}) {
  const absPath = imagePath.startsWith("/")
    ? imagePath
    : path.resolve(__dirname, imagePath);

  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }

  const name = path.basename(absPath);
  const stats = fs.statSync(absPath);
  const mime = getMimeType(name);

  const [result] = await strapi
    .plugin("upload")
    .service("upload")
    .upload({
      data: {
        fileInfo: {
          name,
          alternativeText: options.alternativeText || name,
          caption: options.caption || "",
        },
      },
      files: {
        filepath: absPath,
        originalFilename: name,
        mimetype: mime,
        size: stats.size,
      },
    });

  console.log(`Uploaded image: ${name} (id: ${result.id})`);
  return result;
}

async function seedAdmin(strapi) {
  const existing = await strapi.db.query("admin::user").findOne({
    where: { email: SEED_CONFIG.admin.email },
  });
  if (existing) {
    console.log(`Admin user ${SEED_CONFIG.admin.email} already exists.`);
    return existing;
  }

  const superAdminRole = await strapi.db
    .query("admin::role")
    .findOne({ where: { code: "strapi-super-admin" } });

  if (!superAdminRole) {
    throw new Error("Super admin role not found. Is Strapi fully initialized?");
  }

  // In Strapi v5, password hashing is handled by the service
  const user = await strapi.service("admin::user").create({
    email: SEED_CONFIG.admin.email,
    firstname: SEED_CONFIG.admin.firstname,
    lastname: SEED_CONFIG.admin.lastname,
    password: SEED_CONFIG.admin.password,
    isActive: true,
    roles: [superAdminRole.id],
  });

  console.log(
    `Created admin user: ${user.email} / ${SEED_CONFIG.admin.password}`,
  );
  return user;
}

async function seedLocales(strapi) {
  const localesService = strapi.plugin("i18n").service("locales");
  for (const locale of LOCALES) {
    const existing = await localesService.findByCode(locale.code);
    if (existing) {
      console.log(`Locale "${locale.code}" already exists.`);
      continue;
    }
    await localesService.create(locale);
    console.log(`Created locale: ${locale.code}`);
  }
}

// Build the data payload for a global locale variant.
function buildGlobalData(cfg, faviconFile) {
  return {
    favicon: faviconFile.id,
    metadata: cfg.metadata,
    navbar: {
      ...cfg.navbar,
      navbarLogo: {
        logoImg: faviconFile.id,
        logoText: cfg.navbar.navbarLogo.logoText,
      },
    },
    footer: {
      ...cfg.footer,
      footerLogo: {
        logoImg: faviconFile.id,
        logoText: cfg.footer.footerLogo.logoText,
      },
    },
  };
}

async function seedGlobal(strapi, faviconFile) {
  // Resolve (or create) the en variant first to get the shared documentId.
  // Global has draftAndPublish:false, so no publish step is needed.
  let documentId;
  const enVariant = await strapi
    .documents("api::global.global")
    .findFirst({ locale: "en" });
  if (enVariant) {
    documentId = enVariant.documentId;
    console.log("Global config (en) already exists.");
  } else {
    const created = await strapi.documents("api::global.global").create({
      locale: "en",
      data: buildGlobalData(SEED_CONFIG.global.en, faviconFile),
    });
    documentId = created.documentId;
    console.log("Created global config (en).");
  }

  // Attach any additional locale variants that don't exist yet.
  for (const { code } of LOCALES) {
    if (code === "en") continue;
    const existing = await strapi
      .documents("api::global.global")
      .findFirst({ locale: code });
    if (existing) {
      console.log(`Global config (${code}) already exists.`);
      continue;
    }
    await strapi.documents("api::global.global").update({
      documentId,
      locale: code,
      data: buildGlobalData(SEED_CONFIG.global[code], faviconFile),
    });
    console.log(`Created global config (${code}).`);
  }

  return documentId;
}

// Build the data payload for a page locale variant.
function buildPageData(slug, loc, faviconFile) {
  return {
    slug,
    shortName: loc.shortName,
    heading: loc.heading,
    description: loc.description,
    seo: loc.seo,
    contentSections: loc.contentSections.map((section) => {
      if (section.__component === "sections.hero") {
        return { ...section, picture: faviconFile.id };
      }
      if (section.__component === "sections.testimonials-group") {
        return {
          ...section,
          testimonials: section.testimonials.map((t) => ({
            ...t,
            picture: faviconFile.id,
          })),
        };
      }
      return section;
    }),
  };
}

async function seedPages(strapi, faviconFile) {
  const results = [];
  for (const pageData of SEED_CONFIG.pages) {
    // Resolve (or create + publish) the en variant first to get the shared
    // documentId. slug is non-localized, so it is shared across all variants.
    let documentId;
    const enRow = await strapi.db.query("api::page.page").findOne({
      where: { slug: pageData.slug, locale: "en" },
    });
    if (enRow) {
      documentId = enRow.documentId;
      console.log(`Page "${pageData.slug}" (en) already exists.`);
    } else {
      const created = await strapi.documents("api::page.page").create({
        locale: "en",
        data: buildPageData(pageData.slug, pageData.en, faviconFile),
      });
      documentId = created.documentId;
      await strapi.documents("api::page.page").publish({
        documentId,
        locale: "en",
      });
      console.log(`Created page: ${pageData.slug} (en)`);
    }

    // Attach and publish any additional locale variants not present yet.
    for (const { code } of LOCALES) {
      if (code === "en") continue;
      const row = await strapi.db.query("api::page.page").findOne({
        where: { slug: pageData.slug, locale: code },
      });
      if (row) {
        console.log(`Page "${pageData.slug}" (${code}) already exists.`);
        continue;
      }
      await strapi.documents("api::page.page").update({
        documentId,
        locale: code,
        data: buildPageData(pageData.slug, pageData[code], faviconFile),
      });
      await strapi.documents("api::page.page").publish({
        documentId,
        locale: code,
      });
      console.log(`Created page: ${pageData.slug} (${code})`);
    }

    results.push(documentId);
  }
  return results;
}

async function seedCategories(strapi) {
  const results = [];
  for (const catData of SEED_CONFIG.categories) {
    const existing = await strapi.db.query("api::category.category").findOne({
      where: { slug: catData.name.toLowerCase() },
    });
    if (existing) {
      console.log(`Category "${catData.name}" already exists.`);
      results.push(existing);
      continue;
    }

    const cat = await strapi.entityService.create("api::category.category", {
      data: catData,
    });
    console.log(`Created category: ${cat.name}`);
    results.push(cat);
  }
  return results;
}

async function seedAuthors(strapi) {
  const results = [];
  for (const authorData of SEED_CONFIG.authors) {
    const existing = await strapi.db.query("api::author.author").findOne({
      where: { email: authorData.email },
    });
    if (existing) {
      console.log(`Author "${authorData.name}" already exists.`);
      results.push(existing);
      continue;
    }

    const author = await strapi.entityService.create("api::author.author", {
      data: authorData,
    });
    console.log(`Created author: ${author.name}`);
    results.push(author);
  }
  return results;
}

async function seedArticles(strapi, categories, authors, faviconFile) {
  const results = [];
  for (let i = 0; i < SEED_CONFIG.articles.length; i++) {
    const articleData = SEED_CONFIG.articles[i];
    const existing = await strapi.db.query("api::article.article").findOne({
      where: { slug: articleData.title.toLowerCase().replace(/\s+/g, "-") },
    });
    if (existing) {
      console.log(`Article "${articleData.title}" already exists.`);
      results.push(existing);
      continue;
    }

    const category = categories[i % categories.length];
    const author = authors[i % authors.length];

    const data = {
      ...articleData,
      blocks: articleData.blocks.map((block) => {
        if (block.__component === "shared.media") {
          return { ...block, file: faviconFile.id };
        }
        return block;
      }),
      category: category.id,
      authorsBio: author.id,
    };

    const article = await strapi.entityService.create("api::article.article", {
      data,
    });
    console.log(`Created article: ${article.title}`);
    results.push(article);
  }
  return results;
}

async function run() {
  console.log("Starting Strapi...");
  const strapi = createStrapi({
    appDir: process.cwd(),
    distDir: process.cwd(),
  });

  await strapi.load();

  console.log("Seeding data...\n");

  const faviconFile = await uploadImage(strapi, "../favicon.png", {
    alternativeText: "Site favicon",
  });

  await seedAdmin(strapi);
  await seedLocales(strapi);
  await seedGlobal(strapi, faviconFile);
  const pages = await seedPages(strapi, faviconFile);
  const categories = await seedCategories(strapi);
  const authors = await seedAuthors(strapi);
  await seedArticles(strapi, categories, authors, faviconFile);

  console.log("\nDone!");
  console.log("Admin panel: http://localhost:1337/admin");
  console.log(`Email:    ${SEED_CONFIG.admin.email}`);
  console.log(`Password: ${SEED_CONFIG.admin.password}`);

  // Allow DB pool to settle before destroying to avoid tarn abort warnings
  await new Promise((resolve) => setTimeout(resolve, 500));
  await strapi.destroy();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
