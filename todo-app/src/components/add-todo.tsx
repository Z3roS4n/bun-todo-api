import { useState } from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Priority, Status, type Group, type Todo } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddTodo({ children, groups }: { children: React.ReactNode, groups?: Group[] }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    groupId: groups?.[0]?.id ?? 0,
    title: "",
    description: "",
    priority: Priority.LOW,
    status: Status.PENDING,
  });

  const addTodo = useMutation({
    mutationFn: async (todo: Todo) => {
      setIsOpen(false);
      const response = await fetch("http://localhost:4000/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          group: todo.groupId,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    }
  });

  return (
    <Drawer open={isOpen} onOpenChange={() => setIsOpen(true)}>
      <DrawerTrigger asChild>
        { children }
      </DrawerTrigger>
      <div className="flex flex-row justify-center">
        <DrawerContent className="xl:max-w-3xl xl:transform xl:translate-x-1/2">
          <DrawerHeader>
            <DrawerTitle>Create Todo</DrawerTitle>
            <DrawerDescription>Fill out the form below to create a new todo item.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 m-4 overflow-auto pb-4">
            <Label>Group</Label>
            <Select value={newTodo.groupId.toString()} onValueChange={(value) => setNewTodo({ ...newTodo, groupId: parseInt(value) })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                {groups?.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()}>{group.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Todo Title</Label>
            <Input onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} value={newTodo.title}></Input>
            <Label>Todo Description</Label>
            <Textarea onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} value={newTodo.description}></Textarea>
            <Label>Priority</Label>
            <Select value={newTodo.priority} onValueChange={(value) => setNewTodo({ ...newTodo, priority: value as Priority })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">LOW PRIORITY</SelectItem>
                <SelectItem value="MEDIUM">MEDIUM PRIORITY</SelectItem>
                <SelectItem value="HIGH">HIGH PRIORITY</SelectItem>
              </SelectContent>
            </Select>
            <DrawerClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DrawerClose>
            <Button onClick={() => addTodo.mutate(newTodo)}>Create Todo</Button>
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  );
}