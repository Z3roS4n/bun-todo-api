import type { FastifyInstance } from "fastify";

export default async function todoRoutes(fastify: FastifyInstance) {
  fastify.get("/todos", async (request, reply) => {
    const todos = await fastify.prisma.todo.findMany();

    return todos;
  });

  fastify.post("/todos", async (request, reply) => {
    const { title } = request.body as { title: string };

    const newTodo = await fastify.prisma.todo.create({
      data: {
        title,
        status: "PENDING"
      },
    });
    return newTodo;
  });
}