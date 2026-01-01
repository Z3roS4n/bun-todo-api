import { Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import type { Todo } from "@/types/api";

export default function TaskItem({ todo }: { todo: Todo }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-row gap-4 items-center">
          {todo.title}
          <Badge>{todo.status}</Badge>          
          <Badge variant={
              todo.priority === "HIGH" ? "destructive" :
              todo.priority === "MEDIUM" ? "secondary" :
              "default"
            }>{todo.priority} PRIORITY</Badge>
        </CardTitle>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between gap-2">
        <div className="flex flex-row gap-2">
          <Button size={"sm"}>Complete</Button>
          <Button size={"sm"} variant={"outline"}>Start</Button>
        </div>
        <Button size={"sm"} variant={"destructive"}><Trash></Trash></Button>
      </CardFooter>
    </Card>
  );
}