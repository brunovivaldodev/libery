import { compare } from "bcrypt";
import { ManagerRepository } from "../../../../domain/repositories";
import { AppError } from "../../../../base/application/exceptions";

type AuthenticateManagerInput = {
  email: string;
  password: string;
};

type AuthenticateManagerOutput = {
  manager: {
    name: string;
    email: string;
    id: string;
  };
};

export class AuthenticateManagerUseCase {
  constructor(private managerRepository: ManagerRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateManagerInput): Promise<AuthenticateManagerOutput> {
    const manager = await this.managerRepository.findByEmail(email);

    if (!manager) {
      throw new AppError("Email or Password Incorrect");
    }

    const passwordMatch = await compare(password, manager.password);

    if (!passwordMatch) {
      throw new AppError("Email or Password Incorrect");
    }

    return {
      manager: {
        name: manager.name,
        email: manager.email,
        id: manager.id,
      },
    };
  }
}
