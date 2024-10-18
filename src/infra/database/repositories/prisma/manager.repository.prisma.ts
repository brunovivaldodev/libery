import { Manager, ManagerRepository } from "../../../../domain";
import { ManagerMapper } from "../../mappers";
import { PrismaClient } from "@prisma/client";

export class ManagerRepositoryPrisma implements ManagerRepository {
  private prisma = new PrismaClient();

  async findById(id: string): Promise<Manager | null> {
    const manager = await this.prisma.manager.findUnique({ where: { id } });

    if (!manager) {
      return null;
    }

    return ManagerMapper.toDomain(manager);
  }

  async create(data: Manager): Promise<void> {
    await this.prisma.manager.create({
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  }

  async save(data: Manager): Promise<void> {
    await this.prisma.manager.update({
      where: { id: data.id },
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  }

  async findByEmail(email: string): Promise<Manager | null> {
    const manager = await this.prisma.manager.findUnique({ where: { email } });

    if (!manager) {
      return null;
    }

    return ManagerMapper.toDomain(manager);
  }
}
