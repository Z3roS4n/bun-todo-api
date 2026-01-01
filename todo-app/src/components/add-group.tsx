import { useState } from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Priority, Status, type Group, type Todo } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddGroup({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [newGroup, setNewGroup] = useState<Group>({
    name: "",
  });

  const addGroup = useMutation({
    mutationFn: async (group: Group) => {
      setIsOpen(false);
      const response = await fetch("http://localhost:4000/v1/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: group.name,
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
            <Label>Group Name</Label>
            <Input onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} value={newGroup.name}></Input>
            <DrawerClose asChild>
              <Button variant={"outline"}>Close</Button>
              <Button onClick={() => addGroup.mutate(newGroup)}>Create Group</Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  );
}