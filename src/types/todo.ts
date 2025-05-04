
export type Priority = "low" | "medium" | "high";

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  categoryId: string | null;
  priority: Priority;
};
