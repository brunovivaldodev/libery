import { SearchParams, SearchResult } from "../../../base/domain";
import { Book } from "../../../domain/entities";
import {
  BookFilter,
  BookRepository,
  BookSortableField,
} from "../../../domain/repositories";

export class BookRepositoryFake implements BookRepository {
  books: Book[] = [];

  async findById(id: string): Promise<Book | null> {
    const Book = this.books.find((Book) => Book.id === id);
    if (!Book) return null;
    return Book;
  }

  async create(data: Book): Promise<void> {
    this.books.push(data);
  }

  async delete(Book: Book): Promise<void> {
    const index = this.books.findIndex((incident) => incident.id === Book.id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  async save(data: Book): Promise<void> {
    if (await this.findById(data.id)) {
      const index = this.books.findIndex((manager) => manager.id === data.id);
      this.books.splice(index, 1);
    }
    this.books.push(data);
  }

  async findMany(
    params: SearchParams<BookFilter, BookSortableField>
  ): Promise<SearchResult<Book>> {
    const books = this.books.filter(
      (book) => book.title === params.filter?.title
    );

    return new SearchResult(
      books.map((item) => item),
      this.getPaginationMeta(params, books.length)
    );
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
