export abstract class BaseRepository<DomainEntity> {
  abstract findById(id: string): Promise<DomainEntity | null>;
}
