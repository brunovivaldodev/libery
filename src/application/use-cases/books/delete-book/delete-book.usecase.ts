import { AppError } from "../../../../base/application/exceptions";
import { BookRepository } from "../../../../domain";

type DeleteBookInput = {
  managerId: string;
  bookId: string;
};

type DeleteBookOutput = Promise<void>;

export class DeleteBookUseCase {
  constructor(private bookRepository: BookRepository) {}
  async execute(input: DeleteBookInput): Promise<DeleteBookOutput> {
    const book = await this.bookRepository.findById(input.bookId);

    if (!book) {
      throw new AppError("Book not exists");
    }

    await this.bookRepository.delete(book);
  }
}
