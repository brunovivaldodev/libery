import { Request, Response } from "express";
import { BookPresenter } from "../../../presenters";
import {
  ListBooksInput,
  ListBooksUseCase,
} from "../../../../../application/use-cases/books";
import { BookRepositoryPrisma } from "../../../../database";

const bookRepository = new BookRepositoryPrisma();
const bookPresenter = new BookPresenter();

export class ListBooksController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { title, genre, limit, authorId } = request.query;

    const input = new ListBooksInput({
      filter: {
        title: <string>title || undefined,
        genre: <string>genre || undefined,
        authorId: <string>genre || undefined,
      },
      limit: Number(limit),
    });

    const listBooksUseCase = new ListBooksUseCase(bookRepository);

    const result = await listBooksUseCase.execute(input);

    return response.json({ ...bookPresenter.toCollection(result) });
  }
}
