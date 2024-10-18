require("dotenv").config();
const { execSync } = require("child_process");
const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("prisma/prisma-client");
const NodeEnvironment = require("jest-environment-node").TestEnvironment;

const prisma = new PrismaClient();

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `${randomUUID()}`;
    this.connection = this.generateDatabaseURL(this.schema);
  }

  setup() {
    process.env.DATABASE_URL = this.connection;
    this.global.process.env.DATABASE_URL = this.connection;

    execSync("npx prisma migrate deploy");
  }

  async teardown() {
    this.deletePhotosTest("./uploads");
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`
    );
    await prisma.$disconnect();
  }

  generateDatabaseURL(schema) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL NOT SETED");
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set("schema", schema);

    return url.toString();
  }

  deletePhotosTest(folderPath) {
    fs.readdirSync(folderPath).forEach((filename) => {
      const filePath = path.join(folderPath, filename);
      if (filename !== "bilhete.jpeg" && fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });
  }
}

module.exports = CustomEnvironment;
