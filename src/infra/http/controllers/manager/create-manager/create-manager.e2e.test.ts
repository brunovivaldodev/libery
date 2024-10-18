import request from "supertest";
import { app } from "../../../../../base/infra";

describe("E2E create manager", () => {
  it("should create a manager", async () => {
    const response = await request(app).post("/managers").send({
      name: "Bruno Vivaldo",
      email: "brunoteste@gmail.com",
      password: "####",
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.headers.authorization).toBeDefined();
  });
});
