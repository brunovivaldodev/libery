import { SearchParams, SearchResult } from "../../../base/domain";
import { Author } from "../../../domain/entities";
import {
  AuthorFilter,
  AuthorRepository,
  AuthorSortableField,
} from "../../../domain/repositories";

export class AuthorRepositoryFake implements AuthorRepository {
  locals: Author[] = [];

  async findById(id: string): Promise<Author | null> {
    const local = this.locals.find((local) => local.id === id);
    if (!local) return null;
    return local;
  }

  async create(data: Author): Promise<void> {
    this.locals.push(data);
  }

  async save(data: Author): Promise<void> {
    if (await this.findById(data.id)) {
      const index = this.locals.findIndex((local) => local.id === data.id);
      this.locals.splice(index, 1);
    }
    this.locals.push(data);
  }

  async findMany(
    params: SearchParams<AuthorFilter, AuthorSortableField>
  ): Promise<SearchResult<Author>> {
    const locals = this.locals.filter(
      (local) =>
        local.name === params.filter?.name ||
        local.nationality === params.filter.nationality
    );

    return new SearchResult(
      locals.map((item) => item),
      this.getPaginationMeta(params, locals.length)
    );
  }

  async delete(local: Author): Promise<void> {
    const index = this.locals.findIndex((incident) => incident.id === local.id);
    if (index !== -1) {
      this.locals.splice(index, 1);
    }
  }

  protected getPaginationMeta(
    params: SearchParams<any, any>,
    totalCount: number
  ) {
    return {
      total: totalCount,
      pageCount: Math.ceil(totalCount / params.limit),
      currentPage: params.page,
      perPage: params.limit,
    };
  }
}
