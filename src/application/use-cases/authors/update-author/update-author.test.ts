import {
  AuthorRepository,
  Manager,
  ManagerRepository,
} from "../../../../domain";
import {
  AuthorRepositoryFake,
  ManagerRepositoryFake,
} from "../../../repositories";
import { UpdateAuthorUseCase } from "./update-auhtor.usecase";

describe("Update Author UseCase", () => {
  let managerRepository: ManagerRepository;
  let authorRepository: AuthorRepository;

  beforeEach(() => {
    managerRepository = new ManagerRepositoryFake();
    authorRepository = new AuthorRepositoryFake();

    const manager = new Manager({
      id: "38149813-fb81-48ea-8514-a7f27927c91e",
      name: "Bruno Vivaldo",
      email: "brunotest@gmail.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const author = manager.createAuthor({
      id: "36ffd751-1b20-4b8e-8bd1-36ed32684d34",
      name: "Robert C Martin",
      nationality: "Angolan",
      pseudonym: "Uncle Bob",
      createdBy: manager,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    managerRepository.save(manager);
    authorRepository.save(author);
  });
  it("should update a author", async () => {
    const input = {
      managerId: "38149813-fb81-48ea-8514-a7f27927c91e",
      authorId: "36ffd751-1b20-4b8e-8bd1-36ed32684d34",
      pseudonym: "Uncle",
    };

    const createLunchUseCase = new UpdateAuthorUseCase(authorRepository);

    const output = await createLunchUseCase.execute(input);

    const updatedAuthor = await authorRepository.findById(
      "36ffd751-1b20-4b8e-8bd1-36ed32684d34"
    );

    expect(output.id).toBeDefined();
    expect(updatedAuthor?.pseudonym).toBe("Uncle");
  });
});
