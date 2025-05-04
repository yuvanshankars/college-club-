
import React from "react";
import { useTodo } from "@/context/TodoContext";

const TodoHeader: React.FC = () => {
  const { tasks } = useTodo();
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const percentComplete = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
    
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-todo-primary mb-2">
        Task Master
      </h1>
      
      <div className="flex items-end justify-between">
        <p className="text-muted-foreground">
          Organize your life, one task at a time
        </p>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">{completedTasks}</span> of <span className="font-medium">{totalTasks}</span> tasks complete
          </p>
          <div className="w-40 h-1.5 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-full rounded-full bg-todo-primary transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoHeader;
