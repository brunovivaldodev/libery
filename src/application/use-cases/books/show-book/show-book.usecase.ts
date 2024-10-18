import { AppError } from "../../../../base/application/exceptions";
import { Book, BookRepository } from "../../../../domain";

type ShowBookInput = {
  managerId: string;
  bookId: string;
};

type ListBookOutput = Promise<Book>;

export class ShowBookUseCase {
  constructor(private BookRepository: BookRepository) {}

  async execute(input: ShowBookInput): Promise<ListBookOutput> {
    const book = await this.BookRepository.findById(input.bookId);

    if (!book) {
      throw new AppError("Book not exists");
    }

    return book;
  }
}
