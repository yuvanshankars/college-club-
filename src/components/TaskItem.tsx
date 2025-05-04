
import React, { useState } from "react";
import { useTodo } from "@/context/TodoContext";
import { Task } from "@/types/todo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import TaskEditDialog from "./TaskEditDialog";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, categories } = useTodo();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const category = categories.find((cat) => cat.id === task.categoryId);
  
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-800",
  };
  
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
  
  return (
    <>
      <Card className={cn(
        "p-4 mb-3 transition-all duration-200 task-card border-l-4",
        task.completed && "completed-task",
        task.categoryId && category ? `border-l-[${category.color}]` : "border-l-gray-200"
      )}>
        <div className="flex items-center gap-3">
          <Checkbox 
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(task.id)}
            className="h-5 w-5"
          />
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <h3 className={cn("font-medium", task.completed && "line-through opacity-70")}>
                {task.title}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={priorityColors[task.priority]}>
                  {task.priority}
                </Badge>
                <span className="text-xs text-gray-500">{formattedDate}</span>
              </div>
            </div>
            
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
            )}
            
            <div className="flex items-center justify-between mt-2">
              <div>
                {category && (
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-xs text-gray-600">{category.name}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <TaskEditDialog 
        task={task} 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
};

export default TaskItem;
