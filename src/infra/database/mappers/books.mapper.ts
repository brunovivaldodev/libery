import {
  Book as PrismaBook,
  AuthorsBooks,
  Manager as PrismaManager,
} from "@prisma/client";
import { Book } from "../../../domain";
import { ManagerMapper } from "./manager.mapper";

type BookOrmEntity = PrismaBook & {
  manager: PrismaManager;
  booksAuthors: AuthorsBooks;
};

export class BookMapper {
  static toPrisma(domainEntity: Book): Partial<BookOrmEntity> {
    return {
      id: domainEntity.id,
      genre: domainEntity.genre,
      title: domainEntity.title,
      managerId: domainEntity.createdBy.id,
      releaseDate: domainEntity.releaseDate,
      subject: domainEntity.subject,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
    };
  }

  static toDomain(ormEntity: BookOrmEntity): Book {
    const book = new Book({
      id: ormEntity.id,
      author: [],
      description: ormEntity.description,
      genre: ormEntity.genre,
      releaseDate: ormEntity.releaseDate,
      subject: ormEntity.subject,
      title: ormEntity.title,
      createdBy: ManagerMapper.toDomain(ormEntity.manager),
      createdAt: new Date(ormEntity.createdAt),
      updatedAt: new Date(ormEntity.updatedAt),
    });

    return book;
  }
}
