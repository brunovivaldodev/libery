import { Request, Response } from "express";
import { BookPresenter } from "../../../presenters";
import { ShowBookUseCase } from "../../../../../application/use-cases/books";
import { BookRepositoryPrisma } from "../../../../database";

const bookRepository = new BookRepositoryPrisma();
const bookPresenter = new BookPresenter();

export class ShowBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBookUseCase = new ShowBookUseCase(bookRepository);

    const result = await showBookUseCase.execute({
      bookId: id,
      managerId: request.manager.id,
    });

    return response.json({ ...bookPresenter.toSchema(result) });
  }
}
