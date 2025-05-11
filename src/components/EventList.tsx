
import React, { useState } from "react";
import EventCard from "@/components/EventCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  department: string;
  date: string;
  location: string;
  participants: number;
  image?: string;
}

interface EventListProps {
  events: Event[];
  registeredEvents: string[];
  userRole: "admin" | "student" | null;
  onRegister: (eventId: string, username?: string) => void;
  onManage?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  username?: string;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  registeredEvents, 
  userRole, 
  onRegister,
  onManage,
  onDelete,
  username
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Get unique departments for filter
  const departments = [...new Set(events.map(event => event.department))];

  // Filter events based on search term and department
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || event.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select
          value={departmentFilter}
          onValueChange={setDepartmentFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No events found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isRegistered={registeredEvents.includes(event.id)}
              userRole={userRole}
              onRegister={onRegister}
              onManage={onManage}
              onDelete={onDelete}
              username={username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
