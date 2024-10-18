import { Request, Response } from "express";
import { DeleteAuthorUseCase } from "../../../../../application";
import { AuthorRepositoryPrisma } from "../../../../database";

const authorRepository = new AuthorRepositoryPrisma();

export class DeleteAuthorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: managerId } = request.manager;

    const { id } = request.params;

    const updateAuthorUseCase = new DeleteAuthorUseCase(authorRepository);

    await updateAuthorUseCase.execute({
      authorId: id,
      managerId,
    });

    return response.json();
  }
}
