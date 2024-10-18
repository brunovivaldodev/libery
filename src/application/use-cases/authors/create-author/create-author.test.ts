import { AppError } from "../../../../base/application/exceptions";
import {
  AuthorRepository,
  Manager,
  ManagerRepository,
} from "../../../../domain";
import {
  AuthorRepositoryFake,
  ManagerRepositoryFake,
} from "../../../repositories";
import { CreateAuthorUseCase } from "./create-author.usecase";

describe("Create Local UseCase", () => {
  let managerRepository: ManagerRepository;
  let localRepository: AuthorRepository;

  beforeEach(() => {
    managerRepository = new ManagerRepositoryFake();
    localRepository = new AuthorRepositoryFake();

    const manager = new Manager({
      id: "38149813-fb81-48ea-8514-a7f27927c91e",
      name: "Bruno Vivaldo",
      email: "brunotest@gmail.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    managerRepository.save(manager);
  });
  it("should create a author", async () => {
    const input = {
      managerId: "38149813-fb81-48ea-8514-a7f27927c91e",
      name: "Robert C Martin",
      nationality: "Angolan",
      pseudonym: "Uncle Bob",
    };

    const createLocalUseCase = new CreateAuthorUseCase(
      managerRepository,
      localRepository
    );

    const output = await createLocalUseCase.execute(input);

    expect(output.id).toBeDefined();
  });

  it("should create a local with invalid manger", async () => {
    const input = {
      managerId: "invalid-id",
      name: "Robert C Martin",
      status: "open",
      nationality: "Angolan",
      pseudonym: "Uncle Bob",
    };

    const createLocalUseCase = new CreateAuthorUseCase(
      managerRepository,
      localRepository
    );

    expect(
      async () => await createLocalUseCase.execute(input)
    ).rejects.toBeInstanceOf(AppError);
  });
});
