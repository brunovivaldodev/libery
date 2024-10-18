import { hash } from "bcrypt";
import { Manager } from "../../../../domain/entities";
import { ManagerRepository } from "../../../../domain/repositories";
import { AppError } from "../../../../base/application/exceptions";

type CreateMangerInput = {
  name: string;
  email: string;
  password: string;
};

type CreateMangerOutput = {
  id: string;
};

export class CreateManagerUseCase {
  constructor(private managerRepository: ManagerRepository) {}

  async execute(input: CreateMangerInput): Promise<CreateMangerOutput> {
    const managerAlreadyExists = await this.managerRepository.findByEmail(
      input.email
    );

    if (managerAlreadyExists) {
      throw new AppError("Manager Already Exists");
    }

    const passwordHash = await hash(input.password, 8);

    const manager = new Manager({
      ...input,
      updatedAt: new Date(),
      createdAt: new Date(),
      password: passwordHash,
    });

    await this.managerRepository.create(manager);

    return { id: manager.id };
  }
}
