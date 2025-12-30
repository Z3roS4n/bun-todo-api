import type { FastifyInstance } from "fastify";
import type { Status } from "../../generated/prisma/enums";

export default async function groupRoutes(fastify: FastifyInstance) {
  fastify.get("/groups", async (request, reply) => {
    const groups = await fastify.prisma.todoGroup.findMany({
      include: {
        todos: true,
      },
    });

    return { success: true, data: { groups } };
  });

  fastify.post("/groups", async (request, reply) => {
    const { name } = request.body as { name: string };  

    const newGroup = await fastify.prisma.todoGroup.create({
      data: {
        name,
      },
    });

    return { success: true, data: { group: newGroup } };
  });

  fastify.put("/groups/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name } = request.body as { name: string };
    const updatedGroup = await fastify.prisma.todoGroup.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    return { success: true, data: { group: updatedGroup } };
  });

  fastify.delete("/groups/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await fastify.prisma.todoGroup.delete({
      where: { id: Number(id) },
    });
    return { success: true };
  }); 
}