
import React, { createContext, useState, useContext, useEffect } from "react";
import { Task, Category, Priority } from "../types/todo";
import { toast } from "sonner";

interface TodoContextType {
  tasks: Task[];
  categories: Category[];
  addTask: (title: string, description: string, categoryId: string | null, priority: Priority) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addCategory: (name: string, color: string) => void;
  deleteCategory: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const DEFAULT_CATEGORIES: Category[] = [
  { id: "1", name: "Work", color: "#9b87f5" },
  { id: "2", name: "Personal", color: "#1EAEDB" },
  { id: "3", name: "Study", color: "#7E69AB" },
];

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories ? JSON.parse(storedCategories) : DEFAULT_CATEGORIES;
  });

  // Save to localStorage whenever tasks or categories change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addTask = (title: string, description: string, categoryId: string | null, priority: Priority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      categoryId,
      priority,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    toast.success("Task added successfully!");
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
    toast.success("Task updated successfully!");
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color,
    };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    toast.success("Category added successfully!");
  };

  const deleteCategory = (id: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
    // Set categoryId to null for tasks with this category
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.categoryId === id ? { ...task, categoryId: null } : task
      )
    );
    toast.success("Category deleted successfully!");
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        categories,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
