import { AppError } from "../../../../base/application/exceptions";
import { AuthorRepository } from "../../../../domain";

type UpdateAuthorInput = {
  managerId: string;
  authorId: string;
  pseudonym?: string;
};

type UpdateAuthorOutput = {
  id: string;
};

export class UpdateAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}
  async execute(input: UpdateAuthorInput): Promise<UpdateAuthorOutput> {
    const author = await this.authorRepository.findById(input.authorId);

    if (!author) {
      throw new AppError("Author not exists");
    }

    author.update(input);

    await this.authorRepository.save(author);

    return { id: author.id };
  }
}
