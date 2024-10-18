import { SearchResult } from "../../../base/domain";
import { Author } from "../../../domain";

export class AuthorPresenter {
  toSchema(domainEntity: Author) {
    return {
      id: domainEntity.id,
      name: domainEntity.name,
      nationality: domainEntity.nationality,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
    };
  }

  toCollection(data: SearchResult<Author>) {
    return {
      meta: data.meta,
      items: data.items.map((item) => this.toSchema(item)),
    };
  }
}
