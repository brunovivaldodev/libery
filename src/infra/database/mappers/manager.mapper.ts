import { Manager as PrismaManager } from "@prisma/client";
import { Manager } from "../../../domain";

export class ManagerMapper {
  static toPrisma(domainEntity: Manager): PrismaManager {
    return {
      email: domainEntity.email,
      id: domainEntity.id,
      name: domainEntity.name,
      password: domainEntity.password,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
    };
  }

  static toDomain(ormEntity: PrismaManager): Manager {
    const manager = new Manager({
      id: ormEntity.id,
      email: ormEntity.email,
      name: ormEntity.name,
      password: ormEntity.password,
      createdAt: new Date(ormEntity.createdAt),
      updatedAt: new Date(ormEntity.updatedAt),
    });

    return manager;
  }
}
