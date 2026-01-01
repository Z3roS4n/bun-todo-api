import "./index.css";

import logo from "./msworks-logo.svg";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { GroupsAPIResponse } from "./types/api";
import AddTodo from "./components/add-todo";
import AddGroup from "./components/add-group";
import TaskItem from "./components/task-item";
import { Label } from "./components/ui/label";
import Footer from "./components/layout/footer";

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
    <div className="flex min-h-screen flex-col gap-6 bg-linear-to-b from-white to-gray-100 p-4">
      <header className="flex w-full  flex-row justify-between items-center gap-4 bg-white/50 p-4 rounded-lg shadow-md backdrop-blur-sm">
        <img src={logo} className="h-12 w-12 animate-spin-slow" alt="Bun Logo" />
        <div className="flex flex-row gap-2 justify-end">
          <AddGroup><Button variant={"outline"}><Plus></Plus> Group</Button></AddGroup>
          <AddTodo groups={groups?.data.groups ?? []}><Button><Plus></Plus> Task</Button></AddTodo>
        </div>
      </header>
      <main className="flex w-full flex-col gap-4">
        {
          groups?.data.groups.map((group) => (
            <div key={group.id} className="flex flex-col gap-2">
              <Label className="text-2xl font-bold">{group.name}</Label>
              <div className="flex flex-col gap-2">
                {group.todos?.map((todo) => (
                  <TaskItem key={todo.id} todo={todo}></TaskItem>
                ))}
              </div>
            </div>
          ))
        }
      </main>
      <Footer/>
    </div>
  );
}

export default App;
