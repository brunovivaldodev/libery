import { SearchParams, SearchResult } from "../../../../base/domain";
import { BasePrismaRepository } from "../../../../base/infra/database/index";
import {
  Author,
  Book,
  BookFilter,
  BookRepository,
  BookSortableField,
  Manager,
} from "../../../../domain";

export class BookRepositoryPrisma
  extends BasePrismaRepository
  implements BookRepository
{
  async findById(id: string): Promise<Book | null> {
    let authors: Author[] = [];

    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        createdBy: true,
        AuthorsBooks: true,
      },
    });

    if (!book) return null;

    for (const id of book.AuthorsBooks) {
      const author = await this.prisma.author.findFirst({
        where: { id: id.authorsId },
        include: { createdBy: true },
      });
      if (!author) {
        return null;
      }

      authors.push(
        new Author({
          id: author.id,
          createdAt: author.createdAt,
          name: author.name,
          pseudonym: author.pseudonym,
          nationality: author.nationality,
          updatedAt: author.updatedAt,
          createdBy: new Manager({
            id: author.createdBy.id,
            email: author.createdBy.email,
            name: author.createdBy.name,
            password: author.createdBy.password,
            createdAt: author.createdBy.createdAt,
            updatedAt: author.createdBy.updatedAt,
          }),
        })
      );
    }

    return new Book({
      id: book.id,
      author: authors,
      description: book.description,
      genre: book.genre,
      releaseDate: book.releaseDate,
      subject: book.subject,
      title: book.title,
      createdBy: new Manager({
        id: book.createdBy.id,
        email: book.createdBy.email,
        name: book.createdBy.name,
        password: book.createdBy.password,
        createdAt: book.createdBy.createdAt,
        updatedAt: book.createdBy.updatedAt,
      }),
      createdAt: new Date(book.createdAt),
      updatedAt: new Date(book.updatedAt),
    });
  }

  async create(data: Book): Promise<void> {
    await this.prisma.book.create({
      data: {
        id: data.id,
        description: data.description,
        genre: data.genre,
        releaseDate: data.releaseDate,
        subject: data.subject,
        title: data.title,
        managerId: data.createdBy.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  }

  async delete(book: Book): Promise<void> {
    await this.prisma.book.delete({ where: { id: book.id } });
  }

  async save(data: Book): Promise<void> {
    await this.prisma.book.update({
      where: { id: data.id },
      data: {
        id: data.id,
        description: data.description,
        genre: data.genre,
        releaseDate: data.releaseDate,
        subject: data.subject,
        title: data.title,
        managerId: data.createdBy.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  }

  async findMany(
    params: SearchParams<BookFilter, BookSortableField>
  ): Promise<SearchResult<Book>> {
    const [totalCount, items] = await this.prisma.$transaction([
      this.prisma.book.count({
        where: {
          genre: { contains: params.filter?.genre },
          title: params.filter?.title,
        },
      }),
      this.prisma.book.findMany({
        ...this.toPagintationParams(params),
        include: { createdBy: true, AuthorsBooks: true },
        where: {
          title: { contains: params.filter?.title },
          genre: params.filter?.genre,
        },
      }),
    ]);

    return new SearchResult(
      items.map(
        (item) =>
          new Book({
            id: item.id,
            author: [],
            description: item.description,
            genre: item.genre,
            releaseDate: item.releaseDate,
            subject: item.subject,
            title: item.title,
            createdBy: new Manager({
              id: item.createdBy.id,
              email: item.createdBy.email,
              name: item.createdBy.name,
              password: item.createdBy.password,
              createdAt: item.createdBy.createdAt,
              updatedAt: item.createdBy.updatedAt,
            }),
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })
      ),
      this.getPaginationMeta(params, totalCount)
    );
  }
}
