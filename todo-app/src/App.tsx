import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import "./index.css";

import logo from "./msworks-logo.svg";
import reactLogo from "./react.svg";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { GroupsAPIResponse, TodosAPIResponse } from "./types/api";
import { Badge } from "./components/ui/badge";
import AddTodo from "./components/add-todo";

export function App() {
  const { data: groups } = useQuery<GroupsAPIResponse>({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/v1/groups");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-gradient-to-b from-white to-gray-100 p-4">
      <header className="flex w-full  flex-row justify-between items-center gap-4 bg-white/50 p-4 rounded-lg shadow-md backdrop-blur-sm">
        <img src={logo} className="h-12 w-12 animate-spin-slow" alt="Bun Logo" />
        <div className="flex flex-row gap-2 justify-end">
          <AddTodo groups={groups?.data.groups ?? []}><Button><Plus></Plus> Add Task</Button></AddTodo>
        </div>
      </header>
      <main className="flex w-full flex-col gap-4">
        {
          groups?.data.groups.map((group) => (
            <div key={group.id} className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{group.name}</h2>
              <div className="flex flex-col gap-2">
                {group.todos.map((todo) => (
                  <Card key={todo.id} className="w-full">
                    <CardHeader>
                      <CardTitle className="flex flex-row gap-4 items-center">{todo.title} <Badge>{todo.status}</Badge></CardTitle>
                      <CardDescription>{todo.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default App;
