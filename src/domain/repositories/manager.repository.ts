import { BaseRepository, SearchParams, SearchResult } from "../../base/domain";
import { Manager } from "../entities";

export const ManagerSortableFields = ["name", "id"] as const;

export type ManagerSortableField = (typeof ManagerSortableFields)[number];

export type ManagerFilter = {
  name?: string;
  id?: string;
};
export abstract class ManagerRepository extends BaseRepository<Manager> {
  abstract findById(id: string): Promise<Manager | null>;
  abstract findByEmail(email: string): Promise<Manager | null>;
  abstract create(entity: Manager): Promise<void>;
  abstract save(entity: Manager): Promise<void>;
}
