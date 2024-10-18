import { BaseRepository, SearchParams, SearchResult } from "../../base/domain";
import { Book } from "../entities";

export const BookSortableFields = ["title", "genre", "authorId"] as const;

export type BookSortableField = (typeof BookSortableFields)[number];

export type BookFilter = {
  title?: string;
  genre?: string;
  authorId?: string;
};
export abstract class BookRepository extends BaseRepository<Book> {
  abstract findMany(
    params: SearchParams<BookFilter, BookSortableField>
  ): Promise<SearchResult<Book>>;

  abstract delete(Book: Book): Promise<void>;
  abstract findById(id: string): Promise<Book | null>;
  abstract create(entity: Book): Promise<void>;
  abstract save(entity: Book): Promise<void>;
}
