import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src={logo} className="h-8 w-8" alt="Bun Todo App Logo" />
            Bun Todo App
          </CardTitle>
          <CardDescription>A simple todo app using Bun, Fastify, and Prisma.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This is a simple todo application built with Bun as the runtime, Fastify as the web framework, and Prisma as the ORM. It demonstrates how to create, read, update, and delete todos, as well as group them.
          </p>
          <p className="mb-4">
            The backend API is powered by Bun and Fastify, providing a fast and efficient server. Prisma is used to interact with the database, making data management easy and type-safe.
          </p>
          <p>
            Explore the code to see how
            these technologies work together to create a seamless full-stack application!
          </p>
        </CardContent>
      </Card>
      <div className="flex items-center gap-4">
        <span>Powered by</span>
        <img src={reactLogo} className="h-8 w-8" alt="React Logo" />
        <img src={logo} className="h-8 w-8" alt="Bun Todo App Logo" />
      </div>
    </div>
  );
}

export default App;
