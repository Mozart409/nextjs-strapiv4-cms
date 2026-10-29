import { type FullConfig, request } from "@playwright/test";
import { ADMIN } from "./support";

/**
 * Logs in as the seeded admin and mints a full-access API token, so the specs
 * hit the REST API the way a real consumer does. The returned function is the
 * global teardown and revokes the token again.
 */
export default async function globalSetup(config: FullConfig) {
  const api = await request.newContext({
    baseURL: config.projects[0].use.baseURL,
  });

  const login = await api.post("/admin/login", { data: ADMIN });
  if (!login.ok()) {
    throw new Error(
      `Admin login as ${ADMIN.email} failed (${login.status()}): ${await login.text()}. Run \`pnpm seed\` first.`,
    );
  }
  const { data: session } = await login.json();
  const auth = { Authorization: `Bearer ${session.token}` };

  const created = await api.post("/admin/api-tokens", {
    headers: auth,
    data: {
      name: `e2e-${Date.now()}`,
      description: "Created by the Playwright global setup",
      type: "full-access",
      lifespan: null,
    },
  });
  if (!created.ok()) {
    throw new Error(
      `Creating the API token failed (${created.status()}): ${await created.text()}`,
    );
  }
  const { data: token } = await created.json();
  process.env.E2E_API_TOKEN = token.accessKey;

  return async () => {
    await api.delete(`/admin/api-tokens/${token.id}`, { headers: auth });
    await api.dispose();
  };
}
