import fp from "fastify-plugin";
import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./todo-database.db",
});

const prisma = new PrismaClient({ adapter});

export default fp(async (app) => {
  app.decorate("prisma", prisma);

  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
});