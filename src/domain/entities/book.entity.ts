import { randomUUID } from "crypto";
import { Author } from "./author.entity";
import { Manager } from "./manager.entity";

export type BookProps = {
  id?: string;
  title: string;
  subject: string;
  author: Author[];
  genre: string;
  description: string | string;
  createdBy: Manager;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

type UpdatableProps = Pick<BookProps, "description" | "subject">;

export class Book {
  private _id: string;
  private _title: string;
  private _subject: string;
  private _author: Author[];
  private _genre: string;
  private _description: string;
  private _releaseDate: Date;
  private _createdBy: Manager;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: BookProps) {
    this._id = props.id ? props.id : randomUUID();
    this._title = props.title;
    this._subject = props.subject;
    this._author = props.author;
    this._description = props.description;
    this._genre = props.genre;
    this._releaseDate = props.releaseDate;
    this._createdBy = props.createdBy;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id() {
    return this._id as string;
  }

  get title() {
    return this._title;
  }

  get subject() {
    return this._subject;
  }

  get description() {
    return this._description;
  }

  get genre() {
    return this._genre;
  }

  get author() {
    return this._author;
  }

  get releaseDate() {
    return this._releaseDate;
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
    if (props.description) this._description = props.description;
    if (props.subject) this._subject = props.subject;

    this._updatedAt = new Date();
  }
}
