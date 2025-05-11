
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Calendar, Plus } from "lucide-react";

interface EventFormProps {
  onEventAdded: (event: {
    title: string;
    description: string;
    department: string;
    date: string;
    location: string;
  }) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !department || !date || !location) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Create event object
    const newEvent = {
      title,
      description,
      department,
      date,
      location,
    };
    
    // Notify parent component
    onEventAdded(newEvent);
    
    // Reset form
    setTitle("");
    setDescription("");
    setDepartment("");
    setDate("");
    setLocation("");
  };

  return (
    <Card className="hover-scale transition-all mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus size={20} className="mr-2" />
          Create New Event
        </CardTitle>
        <CardDescription>
          Add a new event for students to discover
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Event Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Programming Contest"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the event details..."
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">Department</label>
              <Select 
                value={department} 
                onValueChange={setDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Event Date</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                  <Calendar size={16} />
                </span>
                <Input
                  id="date"
                  type="date"
                  className="rounded-l-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">Location</label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="CS Building, Room 101"
              required
            />
          </div>
          
          <Button type="submit" className="w-full hover-scale transition-all">
            Create Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
