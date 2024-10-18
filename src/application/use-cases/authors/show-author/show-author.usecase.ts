import { AppError } from "../../../../base/application/exceptions";
import { Author, AuthorRepository } from "../../../../domain";

type ShowAuthorInput = {
  authorId: string;
};

type ListAuthorsOutput = Promise<Author>;

export class ShowAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}

  async execute(input: ShowAuthorInput): Promise<ListAuthorsOutput> {
    const author = await this.authorRepository.findById(input.authorId);

    if (!author) {
      throw new AppError("Author not exists");
    }

    return author;
  }
}
