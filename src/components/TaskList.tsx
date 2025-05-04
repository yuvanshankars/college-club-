
import React from "react";
import { useTodo } from "@/context/TodoContext";
import TaskItem from "./TaskItem";
import { Task } from "@/types/todo";

interface TaskListProps {
  filter: {
    status: "all" | "active" | "completed";
    categoryId: string | null;
  };
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const { tasks } = useTodo();

  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filter.status === "active" && task.completed) {
      return false;
    }
    if (filter.status === "completed" && !task.completed) {
      return false;
    }

    // Filter by category
    if (filter.categoryId !== null && task.categoryId !== filter.categoryId) {
      return false;
    }

    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>No tasks found.</p>
        <p className="text-sm">Add a new task or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
