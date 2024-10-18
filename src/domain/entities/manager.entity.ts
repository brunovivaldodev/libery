import { randomUUID } from "crypto";
import { Book, BookProps } from "./book.entity";
import { Author, AuthorProps } from "./author.entity";

type Props = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Manager {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  private _createdAt: Date;
  private _updatedAt: Date;
  constructor(props: Props) {
    this._id = props.id ? props.id : randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get id(): string {
    return this._id as string;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  createBook(props: Omit<BookProps, "manager">): Book {
    return new Book({ ...props, createdBy: this });
  }

  createAuthor(props: Omit<AuthorProps, "manager">): Author {
    return new Author({ ...props, createdBy: this });
  }
}
