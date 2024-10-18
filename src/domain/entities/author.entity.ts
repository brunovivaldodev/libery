import { randomUUID } from "crypto";
import { Manager } from "./manager.entity";

export type AuthorProps = {
  id: string | null;
  name: string;
  pseudonym: string | null;
  nationality: string;
  createdBy: Manager;
  createdAt: Date;
  updatedAt: Date;
};

type UpdatableProps = Pick<AuthorProps, "pseudonym">;
export class Author {
  private _id: string;
  private _name: string;
  private _nationality: string;
  private _pseudonym: string | null;
  private _createdAt: Date;
  private _createdBy: Manager;
  private _updatedAt: Date;

  constructor(props: AuthorProps) {
    this._id = props.id ? props.id : randomUUID();
    this._name = props.name;
    this._nationality = props.nationality;
    this._pseudonym = props.pseudonym;
    this._createdAt = props.createdAt;
    this._createdBy = props.createdBy;
    this._updatedAt = props.updatedAt;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get pseudonym() {
    return this._pseudonym;
  }
  get nationality() {
    return this._nationality;
  }

  get createdBy(): Manager {
    return this._createdBy;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  update(props: Partial<UpdatableProps>) {
    if (props.pseudonym) this._pseudonym = props.pseudonym;
    this._updatedAt = new Date();
  }
}
