import { AppError } from "../../../../base/application/exceptions";
import { AuthorRepository } from "../../../../domain";

type DeleteAuthorInput = {
  managerId: string;
  authorId: string;
};

type DeleteAuthorOutput = Promise<void>;

export class DeleteAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}
  async execute(input: DeleteAuthorInput): Promise<DeleteAuthorOutput> {
    const author = await this.authorRepository.findById(input.authorId);

    if (!author) {
      throw new AppError("Author not exists");
    }

    await this.authorRepository.delete(author);
  }
}
