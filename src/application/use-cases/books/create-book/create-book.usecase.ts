import { AppError } from "../../../../base/application/exceptions";
import {
  Author,
  AuthorRepository,
  BookRepository,
  ManagerRepository,
} from "../../../../domain";

type CreateBookInput = {
  managerId: string;
  title: string;
  subject: string;
  authorsId: string[];
  genre: string;
  releaseDate: Date;
  description: string;
};

type CreateBookOutput = {
  id: string;
};

export class CreateBookUseCase {
  constructor(
    private managerRepository: ManagerRepository,
    private authorRepository: AuthorRepository,
    private bookRepository: BookRepository
  ) {}
  async execute(input: CreateBookInput): Promise<CreateBookOutput> {
    let authors: Author[] = [];
    const manager = await this.managerRepository.findById(input.managerId);

    if (!manager) {
      throw new AppError("Invalid Manager");
    }

    for (const id of input.authorsId) {
      const author = await this.authorRepository.findById(id);
      if (!author) {
        throw new AppError("Invalid Author");
      }
      authors.push(author);
    }

    const book = manager.createBook({
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: manager,
      author: authors,
      ...input,
    });

    await this.bookRepository.create(book);

    return { id: book.id };
  }
}
