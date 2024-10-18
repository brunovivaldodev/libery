import { Request, Response } from "express";
import {
  ListAuthorsInput,
  ListAuthorsUseCase,
} from "../../../../../application";
import { AuthorPresenter } from "../../../presenters";
import { AuthorRepositoryPrisma } from "../../../../database";

const authorPresenter = new AuthorPresenter();

const authorRepository = new AuthorRepositoryPrisma();

export class ListAuthorsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, nationality, limit, managerId } = request.query;

    const input = new ListAuthorsInput({
      filter: {
        name: <string>name || undefined,
        nationality: <string>nationality || undefined,
      },
      limit: Number(limit),
    });

    const listAuthorsUseCase = new ListAuthorsUseCase(authorRepository);

    const result = await listAuthorsUseCase.execute(input);

    return response.json({ ...authorPresenter.toCollection(result) });
  }
}
