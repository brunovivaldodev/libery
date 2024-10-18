import {
  AuthorRepository,
  Manager,
  ManagerRepository,
} from "../../../../domain";
import {
  AuthorRepositoryFake,
  ManagerRepositoryFake,
} from "../../../repositories";
import { DeleteAuthorUseCase } from "./delete-author.usecase";

describe("Create Local UseCase", () => {
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
  it("should delete a author", async () => {
    const input = {
      managerId: "38149813-fb81-48ea-8514-a7f27927c91e",
      authorId: "36ffd751-1b20-4b8e-8bd1-36ed32684d34",
    };

    const deleteAuthorUseCase = new DeleteAuthorUseCase(authorRepository);

    const author = await deleteAuthorUseCase.execute(input);

    const deletedLocal = await authorRepository.findById(
      "36ffd751-1b20-4b8e-8bd1-36ed32684d34"
    );

    expect(deletedLocal).toBeNull();
  });
});
