import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});


test("GET to  /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parseUpadatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpadatedAt);

  expect(responseBody.dependecies.database.version).toEqual("16.6");

  expect(responseBody.dependecies.database.max_connections).toEqual(100);

  expect(responseBody.dependecies.database.opened_connections).toEqual(1);
});
