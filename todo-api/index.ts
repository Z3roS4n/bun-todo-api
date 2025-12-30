import fastify from "fastify";
import autoLoad from "@fastify/autoload";

const app = fastify({ logger: true });

const start = async () => {
  try {
    // Automatically load all plugins from the 'plugins' directory
    await app.register(autoLoad, {
      dir: `${__dirname}/plugins`,
    }); 
    // Automatically load all routes from the 'routes' directory
    await app.register(autoLoad, {
      dir: `${__dirname}/routes`,
    }); 

    console.log("Prisma exists?", app.prisma);

    await app.listen({ port: 3000, host: "localhost" });
    console.log("Server is running at http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();



