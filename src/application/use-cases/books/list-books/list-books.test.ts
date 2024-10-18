import { SearchParams } from "../../../../base/domain";
import {
  BookFilter,
  BookRepository,
  BookSortableField,
  Manager,
  ManagerRepository,
} from "../../../../domain";
import {
  BookRepositoryFake,
  ManagerRepositoryFake,
} from "../../../repositories";
import { ListBooksUseCase } from "./list-books.usecase";

describe("List Book UseCase", () => {
  let managerRepository: ManagerRepository;
  let bookRepository: BookRepository;
  let listBooksInput = new SearchParams<BookFilter, BookSortableField>({
    filter: { title: "Clean Arch" },
  });

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

    const book1 = manager.createBook({
      id: "76b091d4-5d2a-41da-b495-f912e35a87ff",
      title: "Clean Arch",
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
    bookRepository.save(book1);
  });
  it("should list a bookes", async () => {
    const listBooksUseCase = new ListBooksUseCase(bookRepository);

    const { meta } = await listBooksUseCase.execute(listBooksInput);

    expect(meta.total).toBe(1);
    expect(meta.pageCount).toBe(1);
    expect(meta.currentPage).toBe(1);
    expect(meta.perPage).toBe(15);
  });
});
