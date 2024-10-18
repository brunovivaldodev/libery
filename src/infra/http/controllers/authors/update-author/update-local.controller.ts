import { Request, Response } from "express";
import {
  AuthorRepositoryFake,
  UpdateAuthorUseCase,
} from "../../../../../application";
import { AuthorRepositoryPrisma } from "../../../../database";

const authorRepository = new AuthorRepositoryPrisma();

export class UpdateAuthorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { pseudonym } = request.body;
    const { id: managerId } = request.manager;

    const { id } = request.params;

    const updateAuthorUseCase = new UpdateAuthorUseCase(authorRepository);

    const result = await updateAuthorUseCase.execute({
      authorId: id,
      managerId,
      pseudonym,
    });

    return response.json({ id: result.id });
  }
}
