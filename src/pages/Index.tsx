
import React, { useState } from "react";
import { TodoProvider } from "@/context/TodoContext";
import TodoHeader from "@/components/TodoHeader";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskFilter from "@/components/TaskFilter";
import CategoryManager from "@/components/CategoryManager";

const Index = () => {
  const [filter, setFilter] = useState({
    status: "all" as "all" | "active" | "completed",
    categoryId: null as string | null,
  });

  const handleFilterChange = (newFilter: {
    status?: "all" | "active" | "completed";
    categoryId?: string | null;
  }) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  return (
    <TodoProvider>
      <div className="min-h-screen bg-background">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <TodoHeader />
          
          <TaskForm />
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Your Tasks</h2>
            <CategoryManager />
          </div>
          
          <TaskFilter filter={filter} onFilterChange={handleFilterChange} />
          
          <TaskList filter={filter} />
          
          <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>Task Master &copy; 2025</p>
          </footer>
        </div>
      </div>
    </TodoProvider>
  );
};

export default Index;
