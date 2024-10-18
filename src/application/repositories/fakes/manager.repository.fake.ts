import { Manager } from "../../../domain/entities";
import { ManagerRepository } from "../../../domain/repositories";

export class ManagerRepositoryFake implements ManagerRepository {
  managers: Manager[] = [];

  async findById(id: string): Promise<Manager | null> {
    const manager = this.managers.find((manager) => manager.id === id);
    if (!manager) return null;
    return manager;
  }

  async findByEmail(email: string): Promise<Manager | null> {
    const manager = this.managers.find((manager) => manager.email === email);
    if (!manager) return null;
    return manager;
  }

  async create(data: Manager): Promise<void> {
    this.managers.push(data);
  }

  async save(data: Manager): Promise<void> {
    if (await this.findById(data.id)) {
      const index = this.managers.findIndex(
        (manager) => manager.id === data.id
      );
      this.managers.splice(index, 1);
    }
    this.managers.push(data);
  }
}
