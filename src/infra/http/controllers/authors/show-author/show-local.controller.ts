import { Request, Response } from "express";
import {
  AuthorRepositoryFake,
  ShowAuthorUseCase,
} from "../../../../../application";
import { AuthorPresenter } from "../../../presenters";
import { AuthorRepositoryPrisma } from "../../../../database";

const authorRepository = new AuthorRepositoryPrisma();
const authorPresenter = new AuthorPresenter();

export class ShowAuthorController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAuthorUseCase = new ShowAuthorUseCase(authorRepository);

    const result = await showAuthorUseCase.execute({
      authorId: id,
    });

    return response.json({ ...authorPresenter.toSchema(result) });
  }
}
