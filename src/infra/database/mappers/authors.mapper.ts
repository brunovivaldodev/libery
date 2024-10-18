import {
  Author as PrismaAuthor,
  Manager as PrismaManager,
} from "@prisma/client";
import { ManagerMapper } from "./manager.mapper";
import { Author } from "../../../domain";

export type AuthorOrmEntity = PrismaAuthor & {
  createdBy: PrismaManager;
};

export class AuthorMapper {
  static toPrisma(domainEntity: Author): Partial<AuthorOrmEntity> {
    return {
      id: domainEntity.id,
      name: domainEntity.name,
      nationality: domainEntity.nationality,
      pseudonym: domainEntity.pseudonym,
      managerId: domainEntity.createdBy.id,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
    };
  }

  static toDomain(ormEntity: AuthorOrmEntity): Author {
    const author = new Author({
      id: ormEntity.id,
      name: ormEntity.name,
      nationality: ormEntity.nationality,
      pseudonym: ormEntity.pseudonym,
      createdBy: ManagerMapper.toDomain(ormEntity.createdBy),
      createdAt: new Date(ormEntity.createdAt),
      updatedAt: new Date(ormEntity.updatedAt),
    });

    return author;
  }
}
