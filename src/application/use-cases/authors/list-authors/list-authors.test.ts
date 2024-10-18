import { SearchParams } from "../../../../base/domain";
import {
  AuthorFilter,
  AuthorRepository,
  AuthorSortableField,
  Manager,
  ManagerRepository,
} from "../../../../domain";
import {
  AuthorRepositoryFake,
  ManagerRepositoryFake,
} from "../../../repositories";
import { ListAuthorsUseCase } from "./list-authors.usecase";

describe("List Authors UseCase", () => {
  let managerRepository: ManagerRepository;
  let authorsRepository: AuthorRepository;
  let listAuthorsInput = new SearchParams<AuthorFilter, AuthorSortableField>({
    filter: {
      nationality: "Angolan",
    },
  });

  beforeEach(() => {
    managerRepository = new ManagerRepositoryFake();
    authorsRepository = new AuthorRepositoryFake();

    const manager = new Manager({
      id: "38149813-fb81-48ea-8514-a7f27927c91e",
      name: "Bruno Vivaldo",
      email: "brunotest@gmail.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const author1 = manager.createAuthor({
      id: "36ffd751-1b20-4b8e-8bd1-36ed32684d34",
      name: "Robert C Martin",
      nationality: "Angolan",
      pseudonym: "Uncle Bob",
      createdBy: manager,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const author2 = manager.createAuthor({
      id: "1f052474-ccfe-4c61-b9a8-8a08bddbb5d7",
      name: "vaughn vernon",
      nationality: "Angolan",
      pseudonym: null,
      createdBy: manager,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    managerRepository.save(manager);
    authorsRepository.save(author1);
    authorsRepository.save(author2);
  });
  it("should list a Authors", async () => {
    const listAuthorsUseCase = new ListAuthorsUseCase(authorsRepository);

    const { meta } = await listAuthorsUseCase.execute(listAuthorsInput);

    expect(meta.total).toBe(2);
    expect(meta.pageCount).toBe(1);
    expect(meta.currentPage).toBe(1);
    expect(meta.perPage).toBe(15);
  });
});
