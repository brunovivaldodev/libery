import { AppError } from "../../../../base/application/exceptions";
import { AuthorRepository, ManagerRepository } from "../../../../domain";

type CreateAuthorInput = {
  managerId: string;
  name: string;
  nationality: string;
  pseudonym: string;
};

type CreateAuthorOutput = {
  id: string;
};
export class CreateAuthorUseCase {
  constructor(
    private managerRepository: ManagerRepository,
    private authorRepository: AuthorRepository
  ) {}
  async execute(input: CreateAuthorInput): Promise<CreateAuthorOutput> {
    const manager = await this.managerRepository.findById(input.managerId);

    if (!manager) {
      throw new AppError("Invalid Manager");
    }

    const local = manager.createAuthor({
      id: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: manager,
      ...input,
    });

    await this.authorRepository.create(local);

    return { id: local.id };
  }
}
