
import React from "react";
import { useTodo } from "@/context/TodoContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFilterProps {
  filter: {
    status: "all" | "active" | "completed";
    categoryId: string | null;
  };
  onFilterChange: (filter: {
    status?: "all" | "active" | "completed";
    categoryId?: string | null;
  }) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {
  const { categories } = useTodo();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
      <Tabs
        value={filter.status}
        onValueChange={(value) =>
          onFilterChange({ status: value as "all" | "active" | "completed" })
        }
        className="w-full sm:w-auto"
      >
        <TabsList className="grid grid-cols-3 w-full sm:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="w-full sm:w-[180px]">
        <Select
          value={filter.categoryId === null ? "all" : filter.categoryId}
          onValueChange={(value) =>
            onFilterChange({
              categoryId: value === "all" ? null : value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  {category.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TaskFilter;
