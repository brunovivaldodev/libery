import { BaseRepository, SearchParams, SearchResult } from "../../base/domain";
import { Author } from "../entities/author.entity";

export const AuthorSortableFields = ["name", "nationality"] as const;

export type AuthorSortableField = (typeof AuthorSortableFields)[number];

export type AuthorFilter = {
  name?: string;
  nationality?: string;
};
export abstract class AuthorRepository extends BaseRepository<Author> {
  abstract findMany(
    params: SearchParams<AuthorFilter, AuthorSortableField>
  ): Promise<SearchResult<Author>>;
  abstract delete(lunch: Author): Promise<void>;
  abstract findById(id: string): Promise<Author | null>;
  abstract create(entity: Author): Promise<void>;
  abstract save(entity: Author): Promise<void>;
}
