import { error } from './../../node_modules/ajv/lib/vocabularies/applicator/dependencies';
import { group } from './../../node_modules/effect/src/Array';
import type { FastifyInstance } from "fastify";
import { Status, type Priority } from "../../generated/prisma/enums";

export default async function todoRoutes(fastify: FastifyInstance) {
  fastify.get("/todos", async (request, reply) => {
    const todos = await fastify.prisma.todo.findMany();

    return { success: true, data: { todos } };
  });

  fastify.post("/todos", async (request, reply) => {
    const { title, description, group, priority } = request.body as { title: string; description: string; group: number; priority: Priority };

    if(!group) return reply.status(400).send({ 
      success: false, 
      error: { 
        code: "GROUP_ID_REQUIRED", 
        message: "Group ID is required to create a todo." 
      } 
    });

    const newTodo = await fastify.prisma.todo.create({
      data: {
        title,
        description,
        priority,
        status: "PENDING",
        groupId: group,
      },
    });

    return { success: true, data: { todo: newTodo } };
  });

  fastify.put("/todos/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, status, description, priority } = request.body as { title?: string; status?: Status; description?: string; priority?: Priority };

    const updatedTodo = await fastify.prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        priority
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

  fastify.get("/todos/groups", async (request, reply) => {
    const groupedTodos = await fastify.prisma.todo.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    return { success: true, data: { groupedTodos } };
  });
}