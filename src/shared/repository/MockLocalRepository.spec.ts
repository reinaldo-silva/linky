import { MockLocalRepository } from "@shared/repository/mockLocal";

describe("MockLocalRepository", () => {
  let repository: MockLocalRepository;

  beforeEach(() => {
    repository = new MockLocalRepository();
  });

  test("deve criar e recuperar um valor válido", async () => {
    const key = "test-key";
    const value = { foo: "bar" };
    const expirationInDays = 1;

    await repository.create(key, value, expirationInDays);

    const result = await repository.get(key);

    expect(result).toEqual(value);
  });

  test("deve retornar null se o valor não for encontrado", async () => {
    const result = await repository.get("non-existent-key");

    expect(result).toBeNull();
  });

  test("deve retornar null se o valor estiver expirado", async () => {
    const key = "expired-key";
    const value = { foo: "bar" };
    const expirationInMilliseconds = -1 / (24 * 60 * 60);

    await repository.create(key, value, expirationInMilliseconds);

    const result = await repository.get(key);

    expect(result).toBeNull();
  });
});
