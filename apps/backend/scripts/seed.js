#!/usr/bin/env node
"use strict";

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
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const { createStrapi } = require("@strapi/strapi");

const SEED_CONFIG = {
  admin: {
    email: "admin@example.com",
    password: "Admin123!",
    firstname: "Admin",
    lastname: "User",
  },
  global: {
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
    },
  },
  pages: [
    {
      slug: "home",
      shortName: "Home",
      heading: "Welcome to My Awesome Site",
      description: "This is the homepage built with Strapi and Next.js.",
      publishedAt: new Date(),
      contentSections: [
        {
          __component: "sections.hero",
          title: "Welcome to My Awesome Site",
          description: "Built with Strapi and Next.js for blazing-fast performance.",
          buttons: [
            { url: "/about", newTab: false, text: "Learn More", type: "primary" },
            { url: "/contact", newTab: false, text: "Get Started", type: "secondary" },
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
      ],
      seo: {
        metaTitle: "Home | My Awesome Site",
        metaDescription: "Welcome to our demo site built with Strapi and Next.js.",
      },
    },
    {
      slug: "about",
      shortName: "About",
      heading: "About Us",
      description: "Learn more about who we are and what we do.",
      publishedAt: new Date(),
      contentSections: [
        {
          __component: "sections.hero",
          title: "About Us",
          description: "We are a small team passionate about building great web experiences.",
          buttons: [{ url: "/contact", newTab: false, text: "Contact Us", type: "primary" }],
        },
        {
          __component: "sections.rich-text",
          content:
            "<p>Founded in 2024, we started with a simple mission: make content management effortless and front-end development delightful. We believe in open source, modern tooling, and great developer experience.</p>",
        },
      ],
      seo: {
        metaTitle: "About | My Awesome Site",
        metaDescription: "Learn more about our team and mission.",
      },
    },
    {
      slug: "contact",
      shortName: "Contact",
      heading: "Contact Us",
      description: "Get in touch with us.",
      publishedAt: new Date(),
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
      ],
      seo: {
        metaTitle: "Contact | My Awesome Site",
        metaDescription: "Get in touch with our team.",
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
      ],
    },
    {
      title: "Getting Started with Strapi",
      description: "A quick introduction to using Strapi as your headless CMS.",
      publishedAt: new Date(),
      blocks: [
        {
          __component: "shared.rich-text",
          body:
            "<p>Strapi is an open-source headless CMS that makes it easy to create and manage content. In this post we cover installation, content types, and the REST API.</p>",
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
          body:
            "<p>Next.js App Router, Server Components, and caching strategies can dramatically improve your site performance. Here are our favorite tips.</p>",
        },
      ],
    },
  ],
};

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

  console.log(`Created admin user: ${user.email} / ${SEED_CONFIG.admin.password}`);
  return user;
}

async function seedGlobal(strapi) {
  const existing = await strapi.entityService.findOne("api::global.global", 1);
  if (existing) {
    console.log("Global config already exists.");
    return existing;
  }

  const global = await strapi.entityService.create("api::global.global", {
    data: {
      metadata: SEED_CONFIG.global.metadata,
      navbar: SEED_CONFIG.global.navbar,
      footer: SEED_CONFIG.global.footer,
    },
  });

  console.log("Created global config.");
  return global;
}

async function seedPages(strapi) {
  const results = [];
  for (const pageData of SEED_CONFIG.pages) {
    const existing = await strapi.db.query("api::page.page").findOne({
      where: { slug: pageData.slug },
    });
    if (existing) {
      console.log(`Page "${pageData.slug}" already exists.`);
      results.push(existing);
      continue;
    }

    const page = await strapi.entityService.create("api::page.page", {
      data: pageData,
    });
    console.log(`Created page: ${page.slug}`);
    results.push(page);
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

async function seedArticles(strapi, categories, authors) {
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

    const article = await strapi.entityService.create("api::article.article", {
      data: {
        ...articleData,
        category: category.id,
        authorsBio: author.id,
      },
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

  await seedAdmin(strapi);
  await seedGlobal(strapi);
  const pages = await seedPages(strapi);
  const categories = await seedCategories(strapi);
  const authors = await seedAuthors(strapi);
  await seedArticles(strapi, categories, authors);

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
