import { IRepository } from "@shared/repository/interface";
import { CreateUrlUseCase } from "@shared/useCases/createUrlUseCase";

const mockRepository: jest.Mocked<IRepository> = {
  get: jest.fn(),
  create: jest.fn(),
};

describe("CreateUrlUseCase", () => {
  let createUrlUseCase: CreateUrlUseCase;

  beforeEach(() => {
    createUrlUseCase = new CreateUrlUseCase(mockRepository);
  });

  it("should create a URL successfully", async () => {
    const key = "testKey";
    const data = "http://example.com";
    const exp = 1;

    mockRepository.create.mockResolvedValue(data);

    const result = await createUrlUseCase.handle(key, data, exp);

    expect(mockRepository.create).toHaveBeenCalledWith(key, data, exp);
    expect(result).toEqual({ exp, id: key, url: data });
  });

  it("should use default expiration when exp is not provided", async () => {
    const key = "testKey";
    const data = "http://example.com";

    mockRepository.create.mockResolvedValue(data);

    const result = await createUrlUseCase.handle(key, data);

    expect(mockRepository.create).toHaveBeenCalledWith(key, data, 1);
    expect(result).toEqual({ exp: 1, id: key, url: data });
  });
});
