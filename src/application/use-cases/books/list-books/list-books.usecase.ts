import { SearchParams, SearchResult } from "../../../../base/domain";
import {
  Book,
  BookFilter,
  BookRepository,
  BookSortableField,
} from "../../../../domain";

export class ListBooksInput extends SearchParams<
  BookFilter,
  BookSortableField
> {}
class ListBooksOutput extends SearchResult<Book> {}

export class ListBooksUseCase {
  constructor(private booksRepository: BookRepository) {}

  async execute(input: ListBooksInput): Promise<ListBooksOutput> {
    const { items, meta } = await this.booksRepository.findMany(input);

    return new SearchResult(items, meta);
  }
}
