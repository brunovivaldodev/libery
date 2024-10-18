import { AppError } from "../../../../base/application/exceptions";
import { Manager } from "../../../../domain/entities";
import { ManagerRepository } from "../../../../domain/repositories";
import { ManagerRepositoryFake } from "../../../repositories";
import { CreateManagerUseCase } from "./create-manager.usecase";
describe("Create Manager Account UseCase", () => {
  let managerRepository: ManagerRepository;

  beforeEach(() => {
    managerRepository = new ManagerRepositoryFake();

    const manager = new Manager({
      id: "38149813-fb81-48ea-8514-a7f27927c91e",
      name: "José André",
      email: "joseandre@gmail.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    managerRepository.save(manager);
  });
  it("should create a manager account", async () => {
    const input = {
      name: "Bruno Vivaldo",
      email: "brunotest@gmail.com",
      password: "test",
    };

    const createManagerUseCase = new CreateManagerUseCase(managerRepository);

    const output = await createManagerUseCase.execute(input);

    expect(output.id).toBeDefined();
  });

  it("should not be to create a manager already registed", async () => {
    const input = {
      name: "Bruno Vivaldo",
      email: "joseandre@gmail.com",
      password: "test",
    };

    const createManagerUseCase = new CreateManagerUseCase(managerRepository);

    expect(
      async () => await createManagerUseCase.execute(input)
    ).rejects.toBeInstanceOf(AppError);
  });
});
