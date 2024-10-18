import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { CreateManagerUseCase } from "../../../../../application";
import { authConfig } from "../../../config";
import { ManagerRepositoryPrisma } from "../../../../database";

const managerRepository = new ManagerRepositoryPrisma();

export class CreateManagerController {
  public async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createManagerUseCase = new CreateManagerUseCase(managerRepository);

    const { id } = await createManagerUseCase.execute({
      name,
      email,
      password,
    });

    const accessToken = sign({ id, name }, authConfig.secretToken, {
      expiresIn: authConfig.expiresInToken,
    });

    response.header("Authorization", accessToken).json({ id });
  }
}
