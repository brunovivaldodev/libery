import { Request, Response } from "express";
import { DeleteBookUseCase } from "../../../../../application/use-cases/books";
import { BookRepositoryPrisma } from "../../../../database";

const bookRepository = new BookRepositoryPrisma();

export class DeleteBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: managerId } = request.manager;

    const { id } = request.params;

    const deleteBookUseCase = new DeleteBookUseCase(bookRepository);

    await deleteBookUseCase.execute({
      bookId: id,
      managerId,
    });

    return response.json();
  }
}
