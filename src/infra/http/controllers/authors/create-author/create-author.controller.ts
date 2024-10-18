import { Request, Response } from "express";
import { CreateAuthorUseCase } from "../../../../../application";
import {
  AuthorRepositoryPrisma,
  ManagerRepositoryPrisma,
} from "../../../../database/repositories";

const authorRepository = new AuthorRepositoryPrisma();
const managerRepository = new ManagerRepositoryPrisma();

export class CreateAuthorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { nationality, pseudonym, name } = request.body;
    const { id } = request.manager;

    const createAuthorUseCase = new CreateAuthorUseCase(
      managerRepository,
      authorRepository
    );

    const result = await createAuthorUseCase.execute({
      managerId: id,
      name,
      nationality,
      pseudonym,
    });

    return response.json({ id: result.id });
  }
}
