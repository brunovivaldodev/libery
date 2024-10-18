import { AppError } from "../../../../base/application/exceptions";
import {
  AuthorRepository,
  BookRepository,
  Manager,
  ManagerRepository,
} from "../../../../domain";
import {
  AuthorRepositoryFake,
  BookRepositoryFake,
  ManagerRepositoryFake,
} from "../../../repositories";
import { CreateBookUseCase } from "./create-book.usecase";

describe("Create Lunch UseCase", () => {
  let managerRepository: ManagerRepository;
  let bookRepository: BookRepository;
  let authorRepository: AuthorRepository;

  beforeEach(() => {
    managerRepository = new ManagerRepositoryFake();
    authorRepository = new AuthorRepositoryFake();
    bookRepository = new BookRepositoryFake();

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
    authorRepository.save(author1);
    authorRepository.save(author2);
  });
  it("should create a Book", async () => {
    const input = {
      managerId: "38149813-fb81-48ea-8514-a7f27927c91e",
      title: "Clean Code",
      subject: "Programação",
      authorsId: ["36ffd751-1b20-4b8e-8bd1-36ed32684d34"],
      genre: "Tecnico",
      releaseDate: new Date(),
      description: "Melhor livro sobre programação",
    };

    const createBookUseCase = new CreateBookUseCase(
      managerRepository,
      authorRepository,
      bookRepository
    );

    const output = await createBookUseCase.execute(input);

    expect(output.id).toBeDefined();
  });

  it("should create a Book with 2 authors", async () => {
    const input = {
      managerId: "38149813-fb81-48ea-8514-a7f27927c91e",
      title: "Clean Code",
      subject: "Programação",
      authorsId: [
        "36ffd751-1b20-4b8e-8bd1-36ed32684d34",
        "1f052474-ccfe-4c61-b9a8-8a08bddbb5d7",
      ],
      genre: "Tecnico",
      releaseDate: new Date(),
      description: "Melhor livro sobre programação",
    };

    const createBookUseCase = new CreateBookUseCase(
      managerRepository,
      authorRepository,
      bookRepository
    );

    const output = await createBookUseCase.execute(input);

    expect(output.id).toBeDefined();
  });

  it("should not create a local with invalid manger", async () => {
    const input = {
      managerId: "1b8170ca-fbd6-4c51-9b7c-703b9a01da61",
      title: "Clean Code",
      subject: "Programação",
      authorsId: ["36ffd751-1b20-4b8e-8bd1-36ed32684d34"],
      genre: "Tecnico",
      releaseDate: new Date(),
      description: "Melhor livro sobre programação",
    };
    const createLunchUseCase = new CreateBookUseCase(
      managerRepository,
      authorRepository,
      bookRepository
    );

    expect(
      async () => await createLunchUseCase.execute(input)
    ).rejects.toBeInstanceOf(AppError);
  });
});
