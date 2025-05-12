import React, { useState } from "react";
import EventCard from "@/components/EventCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Event } from "@/services/eventService";

interface EventListProps {
  events: Event[];
  registeredEvents: string[];
  userRole: "admin" | "student" | null;
  onRegister: (eventId: string, username?: string) => void;
  onManage?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  username?: string;
  showByDepartment?: boolean;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  registeredEvents, 
  userRole, 
  onRegister,
  onManage,
  onDelete,
  username,
  showByDepartment = false
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

  // Group events by department for department display mode
  const eventsByDepartment = departments.reduce<Record<string, Event[]>>((acc, dept) => {
    acc[dept] = events.filter(event => event.department === dept);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">
      {!showByDepartment && (
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
      )}

      {!showByDepartment ? (
        filteredEvents.length === 0 ? (
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
        )
      ) : (
        <div className="space-y-12">
          {departments.map(dept => {
            const deptEvents = eventsByDepartment[dept] || [];
            if (deptEvents.length === 0) return null;
            
            return (
              <div key={dept} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{dept}</h2>
                </div>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {deptEvents.map(event => (
                      <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <EventCard
                            event={event}
                            isRegistered={registeredEvents.includes(event.id)}
                            userRole={userRole}
                            onRegister={onRegister}
                            onManage={onManage}
                            onDelete={onDelete}
                            username={username}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventList;
