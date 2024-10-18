import { SearchParams, SearchResult } from "../../../../base/domain";
import { BasePrismaRepository } from "../../../../base/infra/database/index";
import {
  Author,
  AuthorRepository,
  AuthorFilter,
  AuthorSortableField,
} from "../../../../domain";
import { AuthorMapper } from "../../mappers";

export class AuthorRepositoryPrisma
  extends BasePrismaRepository
  implements AuthorRepository
{
  async findById(id: string): Promise<Author | null> {
    const author = await this.prisma.author.findUnique({
      where: { id },
      include: { createdBy: true },
    });

    if (!author) return null;
    return AuthorMapper.toDomain(author);
  }

  async create(data: Author): Promise<void> {
    await this.prisma.author.create({
      data: {
        id: data.id,
        name: data.name,
        nationality: data.nationality,
        pseudonym: data.pseudonym,
        managerId: data.createdBy.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  }

  async delete(author: Author): Promise<void> {
    await this.prisma.author.delete({ where: { id: author.id } });
  }

  async findMany(
    params: SearchParams<AuthorFilter, AuthorSortableField>
  ): Promise<SearchResult<Author>> {
    const [totalCount, items] = await this.prisma.$transaction([
      this.prisma.author.count({
        where: {
          name: { contains: params.filter?.name },
          nationality: params.filter?.nationality,
        },
      }),
      this.prisma.author.findMany({
        ...this.toPagintationParams(params),
        include: { createdBy: true },
        where: {
          name: { contains: params.filter?.name },
          nationality: params.filter.nationality,
        },
      }),
    ]);

    return new SearchResult(
      items.map((item) => AuthorMapper.toDomain(item)),
      this.getPaginationMeta(params, totalCount)
    );
  }

  async save(data: Author): Promise<void> {
    await this.prisma.author.update({
      where: { id: data.id },
      data: {
        id: data.id,
        name: data.name,
        nationality: data.nationality,
        pseudonym: data.pseudonym,
        managerId: data.createdBy.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  }
}
