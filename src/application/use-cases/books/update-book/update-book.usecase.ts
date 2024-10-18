import { AppError } from "../../../../base/application/exceptions";
import { BookRepository } from "../../../../domain";

type UpdateBookInput = {
  managerId: string;
  bookId: string;
  description?: string;
  subject?: string;
};

type UpdateBookOutput = {
  id: string;
};

export class UpdateBookUseCase {
  constructor(private bookRepository: BookRepository) {}
  async execute(input: UpdateBookInput): Promise<UpdateBookOutput> {
    const book = await this.bookRepository.findById(input.bookId);

    if (!book) {
      throw new AppError("Book not exists");
    }

    book.update(input);

    await this.bookRepository.save(book);

    return { id: book.id };
  }
}
