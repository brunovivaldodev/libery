import { Request, Response } from "express";
import { CreateBookUseCase } from "../../../../../application/use-cases/books";
import {
  AuthorRepositoryPrisma,
  BookRepositoryPrisma,
  ManagerRepositoryPrisma,
} from "../../../../database";

const managerRepository = new ManagerRepositoryPrisma();
const authorRepository = new AuthorRepositoryPrisma();
const bookRepository = new BookRepositoryPrisma();

export class CreateBookController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { description, authorsId, genre, releaseDate, subject, title } =
      request.body;

    const { id: managerId } = request.manager;

    const createBookUseCase = new CreateBookUseCase(
      managerRepository,
      authorRepository,
      bookRepository
    );

    const result = await createBookUseCase.execute({
      description,
      managerId,
      authorsId,
      genre,
      releaseDate: new Date(releaseDate),
      subject,
      title,
    });

    return response.json({ id: result.id });
  }
}
