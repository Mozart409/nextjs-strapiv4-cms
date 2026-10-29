import { expect, test } from "@playwright/test";
import { apiHeaders, withDb } from "./support";

const created: string[] = [];

function uniqueEmail(label: string) {
  const email = `e2e-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
  created.push(email);
  return email;
}

function rowsByEmail(email: string) {
  return withDb(async (db) => {
    const { rows } = await db.query(
      "select document_id, email, status, published_at from lead_form_submissions where email = $1",
      [email],
    );
    return rows;
  });
}

test.afterAll(async () => {
  await withDb((db) =>
    db.query("delete from lead_form_submissions where email = any($1)", [
      created,
    ]),
  );
});

test("a submission is persisted as exactly one published row and can be deleted", async ({
  request,
}, testInfo) => {
  const email = uniqueEmail("persist");

  const res = await request.post("/api/lead-form-submissions", {
    headers: apiHeaders(),
    data: { data: { email, status: "contacted" } },
  });
  expect(res.status(), await res.text()).toBe(201);
  const { data } = await res.json();
  expect(data).toMatchObject({ email, status: "contacted" });

  const rows = await rowsByEmail(email);
  await testInfo.attach("lead-form-submission-row.json", {
    body: JSON.stringify(rows, null, 2),
    contentType: "application/json",
  });
  // draftAndPublish is off, so there is no separate draft row.
  expect(rows).toHaveLength(1);
  expect(rows[0]).toMatchObject({
    document_id: data.documentId,
    email,
    status: "contacted",
  });
  expect(rows[0].published_at).toBeInstanceOf(Date);

  const del = await request.delete(
    `/api/lead-form-submissions/${data.documentId}`,
    { headers: apiHeaders() },
  );
  expect(del.status()).toBe(204);
  expect(await rowsByEmail(email)).toEqual([]);
});

test("an unknown status is rejected without writing a row", async ({
  request,
}) => {
  const email = uniqueEmail("bad-status");

  const res = await request.post("/api/lead-form-submissions", {
    headers: apiHeaders(),
    data: { data: { email, status: "spam" } },
  });
  expect(res.status()).toBe(400);
  expect((await res.json()).error.name).toBe("ValidationError");
  expect(await rowsByEmail(email)).toEqual([]);
});

test("anonymous submissions are forbidden and not persisted", async ({
  request,
}) => {
  const email = uniqueEmail("anonymous");

  const res = await request.post("/api/lead-form-submissions", {
    data: { data: { email, status: "seen" } },
  });
  expect(res.status()).toBe(403);
  expect(await rowsByEmail(email)).toEqual([]);
});
