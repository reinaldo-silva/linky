import { IRepository } from "@shared/repository/interface";
import { GetUrlUseCase } from "@shared/useCases/getUrlUseCase";
import { MockLocalRepository } from "../repository/mockLocal";

describe("GetUrlUseCase", () => {
  let getUrlUseCase: GetUrlUseCase;
  let mockLocalRepository: IRepository;

  beforeEach(() => {
    mockLocalRepository = new MockLocalRepository();
    getUrlUseCase = new GetUrlUseCase(mockLocalRepository);
  });

  it("should return a URL successfully", async () => {
    const key = "testKey";
    const urlData = "http://example.com";

    await mockLocalRepository.create(key, urlData, 1);
    const data = await mockLocalRepository.get(key);

    const result = await getUrlUseCase.handle(key);

    expect(result).toEqual({ exp: 0, id: key, url: data });
  });

  it("should return null if the URL is not found", async () => {
    const key = "nonExistentKey";

    const result = await getUrlUseCase.handle(key);

    expect(result).toBeNull();
  });
});
