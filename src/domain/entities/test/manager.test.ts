import { Manager } from "../manager.entity";
describe("Manager", () => {
  it("should create a manager", () => {
    const manager = new Manager({
      name: "Bruno Vivaldo",
      email: "brunotest@gmail.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(manager.name).toBe("Bruno Vivaldo");
    expect(manager.email).toBe("brunotest@gmail.com");
    expect(manager.password).toBeDefined();
    expect(manager.id).toBeDefined();
  });

  it("should create a Author", () => {
    const manager = new Manager({
      name: "Bruno Vivaldo",
      email: "brunotest@gmail.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const author = manager.createAuthor({
      name: "Bruno Pedro",
      nationality: "Angolan",
      pseudonym: "Pedro G",
      id: "30a2ee4f-af32-451a-9509-48ebef41f013",
      createdBy: manager,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(author.id).toBeDefined();
    expect(author.name).toBe("Bruno Pedro");
    expect(author.nationality).toBe("Angolan");
    expect(author.pseudonym).toBe("Pedro G");
  });

  it("should create a Book", () => {
    const manager = new Manager({
      name: "Bruno Vivaldo",
      email: "brunotest@gmail.com",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const author = manager.createAuthor({
      name: "Robert C. Martin",
      nationality: "Angolan",
      pseudonym: "Uncle Bob",
      id: "30a2ee4f-af32-451a-9509-48ebef41f013",
      createdBy: manager,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const book = manager.createBook({
      title: "Clean Code",
      author: [author],
      description: "",
      subject: "Aprende as melhores práticas de programação",
      id: "30a2ee4f-af32-451a-9509-48ebef41f013",
      genre: "Literario",
      releaseDate: new Date(),
      createdBy: manager,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(book.id).toBeDefined();
    expect(book.title).toBe("Clean Code");
    expect(book.subject).toBe("Aprende as melhores práticas de programação");
    expect(book.genre).toBe("Literario");
  });
});
