
import React, { useState } from "react";
import { useTodo } from "@/context/TodoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority } from "@/types/todo";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [priority, setPriority] = useState<Priority>("medium");
  const [isExpanded, setIsExpanded] = useState(false);

  const { addTask, categories } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addTask(title, description, categoryId, priority);
    
    // Reset the form
    setTitle("");
    setDescription("");
    setCategoryId(null);
    setPriority("medium");
    setIsExpanded(false);
  };

  return (
    <Card className="p-4 mb-6 shadow-sm border border-border animate-fade-in">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow"
            onFocus={() => setIsExpanded(true)}
          />
          <Button type="submit" size="icon" disabled={!title.trim()}>
            <Plus size={20} />
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3 animate-slide-in">
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select value={categoryId || ""} onValueChange={(value) => setCategoryId(value || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" type="button" onClick={() => setIsExpanded(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!title.trim()}>
                Add Task
              </Button>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
};

export default TaskForm;
