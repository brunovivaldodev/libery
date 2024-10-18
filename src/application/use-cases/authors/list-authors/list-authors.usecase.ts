import { SearchParams, SearchResult } from "../../../../base/domain";
import {
  Author,
  AuthorFilter,
  AuthorRepository,
  AuthorSortableField,
} from "../../../../domain";

export class ListAuthorsInput extends SearchParams<
  AuthorFilter,
  AuthorSortableField
> {}
class ListAuthorOutput extends SearchResult<Author> {}

export class ListAuthorsUseCase {
  constructor(private localRepository: AuthorRepository) {}

  async execute(input: ListAuthorsInput): Promise<ListAuthorOutput> {
    const { items, meta } = await this.localRepository.findMany(input);
    return new SearchResult(items, meta);
  }
}
