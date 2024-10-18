import { SearchResult } from "../../../base/domain";
import { Book } from "../../../domain";

export class BookPresenter {
  toSchema(domainEntity: Book) {
    return {
      id: domainEntity.id,
      title: domainEntity.title,
      genre: domainEntity.genre,
      subject: domainEntity.subject,
      description: domainEntity.description,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
    };
  }

  toCollection(data: SearchResult<Book>) {
    return {
      meta: data.meta,
      items: data.items.map((item) => this.toSchema(item)),
    };
  }
}
