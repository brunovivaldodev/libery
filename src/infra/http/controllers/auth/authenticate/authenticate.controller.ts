import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { AuthenticateManagerUseCase } from "../../../../../application";
import { authConfig } from "../../../config";
import { ManagerRepositoryPrisma } from "../../../../database";

const managerRepository = new ManagerRepositoryPrisma();

export class AuthenticateManagerController {
  public async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateManagerUseCase = new AuthenticateManagerUseCase(
      managerRepository
    );

    const { manager } = await authenticateManagerUseCase.execute({
      email,
      password,
    });

    const accessToken = sign(
      { id: manager.id, name: manager.name },
      authConfig.secretToken,
      {
        expiresIn: authConfig.expiresInToken,
      }
    );

    response.header("Authorization", accessToken).json({ manager });
  }
}
