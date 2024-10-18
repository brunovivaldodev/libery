import { Manager } from "../../../../domain/entities";
import { ManagerRepository } from "../../../../domain/repositories";
import { ManagerRepositoryFake } from "../../../repositories";
import { AuthenticateManagerUseCase } from "./authenticate.usecase";

describe("Authenticate UseCase", () => {
  let managerRepository: ManagerRepository;

  beforeEach(() => {
    managerRepository = new ManagerRepositoryFake();

    const manager = new Manager({
      id: "38149813-fb81-48ea-8514-a7f27927c91e",
      name: "Bruno Vivaldo",
      email: "brunotest@gmail.com",
      password: "$2b$08$7Cv4J7mJh46TUeWwdyniYeHS5M4RPnlrs..1CNgvAMv6Yk7e2UXX2",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    managerRepository.save(manager);
  });
  it("should authenticate a manager", async () => {
    const input = {
      email: "brunotest@gmail.com",
      password: "test",
    };

    const createLunchUseCase = new AuthenticateManagerUseCase(
      managerRepository
    );

    const output = await createLunchUseCase.execute(input);

    expect(output.manager.email).toBe("brunotest@gmail.com");
    expect(output.manager.name).toBe("Bruno Vivaldo");
  });
});
