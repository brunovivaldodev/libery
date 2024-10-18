import { AppError } from "../../../../base/application/exceptions";
import { BookRepository, Manager, ManagerRepository } from "../../../../domain";
import {
  BookRepositoryFake,
  ManagerRepositoryFake,
} from "../../../repositories";
import { UpdateBookUseCase } from "./update-book.usecase";

describe("Create Book UseCase", () => {
  let managerRepository: ManagerRepository;
  let bookRepository: BookRepository;

  beforeEach(() => {
    managerRepository = new ManagerRepositoryFake();
    bookRepository = new BookRepositoryFake();

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

    const book = manager.createBook({
      id: "76b091d4-5d2a-41da-b495-f912e35a87ff",
      title: "Clean Code",
      subject: "Programação",
      author: [author],
      genre: "Tecnico",
      releaseDate: new Date(),
      createdBy: manager,
      description: "Melhor livro sobre programação",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    managerRepository.save(manager);
    bookRepository.save(book);
  });
  it("should update a book", async () => {
    const input = {
      managerId: "38149813-fb81-48ea-8514-a7f27927c91e",
      bookId: "76b091d4-5d2a-41da-b495-f912e35a87ff",
      description: "O melhor Livro",
    };

    const createBookUseCase = new UpdateBookUseCase(bookRepository);

    const output = await createBookUseCase.execute(input);

    const updatedBook = await bookRepository.findById(
      "76b091d4-5d2a-41da-b495-f912e35a87ff"
    );

    expect(output.id).toBeDefined();
    expect(updatedBook?.description).toBe("O melhor Livro");
  });

  it("should not update a book with invalid invalid manger", async () => {
    const input = {
      managerId: "invalid-manager",
      bookId: "36ffd751-1b20-4b8e-8bd1-36ed32684d34",
    };

    const createBookUseCase = new UpdateBookUseCase(bookRepository);

    expect(
      async () => await createBookUseCase.execute(input)
    ).rejects.toBeInstanceOf(AppError);
  });
});
