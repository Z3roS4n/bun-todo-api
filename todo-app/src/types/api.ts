export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  groupId: number;
  status: Status;
}

export interface Group {
  id?: number;
  name: string;
  todos?: Todo[];
}

export interface TodosAPIResponse {
  success: boolean;
  data: {
    todos: Todo[];
  };
}

export interface GroupsAPIResponse {
  success: boolean;
  data: {
    groups: Group[];
  };
}