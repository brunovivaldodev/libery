import { Request, Response } from "express";
import { UpdateBookUseCase } from "../../../../../application/use-cases/books";
import { BookRepositoryPrisma } from "../../../../database";

const bookRepository = new BookRepositoryPrisma();

export class UpdateBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { description, subject } = request.body;
    const { id: managerId } = request.manager;

    const { id } = request.params;

    const updateBookUseCase = new UpdateBookUseCase(bookRepository);

    const result = await updateBookUseCase.execute({
      bookId: id,
      managerId,
      description,
      subject,
    });

    return response.json({ id: result.id });
  }
}
