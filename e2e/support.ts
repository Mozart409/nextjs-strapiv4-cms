import { Client } from "pg";

// Created by apps/backend/scripts/seed.js.
export const ADMIN = {
  email: process.env.E2E_ADMIN_EMAIL ?? "admin@example.com",
  password: process.env.E2E_ADMIN_PASSWORD ?? "Admin123!",
};

// Full-access API token minted by global-setup.ts for this run.
export function apiHeaders() {
  const token = process.env.E2E_API_TOKEN;
  if (!token) {
    throw new Error("E2E_API_TOKEN is not set; did global setup run?");
  }
  return { Authorization: `Bearer ${token}` };
}

// Same defaults as apps/backend/config/database.js.
export async function withDb<T>(fn: (db: Client) => Promise<T>): Promise<T> {
  const db = new Client({
    host: process.env.DATABASE_HOST ?? "localhost",
    port: Number(process.env.DATABASE_PORT ?? 5555),
    database: process.env.DATABASE_NAME ?? "strapi",
    user: process.env.DATABASE_USERNAME ?? "strapi",
    password: process.env.DATABASE_PASSWORD ?? "strapi",
  });
  await db.connect();
  try {
    return await fn(db);
  } finally {
    await db.end();
  }
}
