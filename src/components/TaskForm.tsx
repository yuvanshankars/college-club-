
import React, { useState } from "react";
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
import { Card } from "@/components/ui/card";
import { Plus, Calendar } from "lucide-react";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Placeholder function - would be connected to backend later
  const addEvent = (title: string, description: string, categoryId: string | null, date: string, location: string) => {
    console.log("Adding event:", { title, description, categoryId, date, location });
    // This would send data to backend in a real implementation
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addEvent(title, description, categoryId, date, location);
    
    // Reset the form
    setTitle("");
    setDescription("");
    setCategoryId(null);
    setDate("");
    setLocation("");
    setIsExpanded(false);
  };

  // Placeholder for department categories
  const departments = [
    { id: "cs", name: "Computer Science", color: "#9b87f5" },
    { id: "eng", name: "Engineering", color: "#4CAF50" },
    { id: "biz", name: "Business", color: "#2196F3" },
    { id: "arts", name: "Arts", color: "#FF9800" },
  ];

  return (
    <Card className="p-4 mb-6 shadow-sm border border-border animate-fade-in">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Add a new event..."
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
              placeholder="Event description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <Select value={categoryId || "none"} onValueChange={(value) => setCategoryId(value === "none" ? null : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                          {dept.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                type="text"
                placeholder="Event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" type="button" onClick={() => setIsExpanded(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!title.trim()}>
                Add Event
              </Button>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
};

export default TaskForm;
