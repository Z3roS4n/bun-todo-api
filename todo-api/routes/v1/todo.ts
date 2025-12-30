import type { FastifyInstance } from "fastify";
import type { Status } from "../../generated/prisma/enums";

export default async function todoRoutes(fastify: FastifyInstance) {
  fastify.get("/todos", async (request, reply) => {
    const todos = await fastify.prisma.todo.findMany();

    return { success: true, data: { todos } };
  });

  fastify.post("/todos", async (request, reply) => {
    const { title } = request.body as { title: string };

    const newTodo = await fastify.prisma.todo.create({
      data: {
        title,
        status: "PENDING"
      },
    });
    return { success: true, data: { todo: newTodo } };
  });

  fastify.put("/todos/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, status } = request.body as { title?: string; status?: Status };

    const updatedTodo = await fastify.prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title,
        status,
      },
    });

    return { success: true, data: { todo: updatedTodo } };
  })

  fastify.delete("/todos/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await fastify.prisma.todo.delete({
      where: { id: Number(id) },
    });
    return { success: true };
  });
}