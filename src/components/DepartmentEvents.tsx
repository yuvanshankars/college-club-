
import React, { useState } from "react";
import EventList from "@/components/EventList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Maximize } from "lucide-react";

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

interface DepartmentEventsProps {
  events: Event[];
  registeredEvents: string[];
  userRole: "admin" | "student" | null;
  onRegister: (eventId: string, username?: string) => void;
  onManage?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  username?: string;
}

const DepartmentEvents: React.FC<DepartmentEventsProps> = ({
  events,
  registeredEvents,
  userRole,
  onRegister,
  onManage,
  onDelete,
  username
}) => {
  // Get unique departments from events
  const departments = Array.from(new Set(events.map(event => event.department)));
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [expandedView, setExpandedView] = useState(false);
  
  // Filter events based on selected department, including "All Departments" events
  const filteredEvents = selectedDept === "all" 
    ? events 
    : events.filter(event => event.department === selectedDept || event.department === "All Departments");

  return (
    <div className={`space-y-8 my-12 ${expandedView ? 'max-w-full' : ''}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-center">Events by Department</h2>
        <button 
          className="flex items-center text-sm text-primary hover:underline"
          onClick={() => setExpandedView(!expandedView)}
        >
          <Maximize size={16} className="mr-1" />
          {expandedView ? "Reduce" : "Expand"} View
        </button>
      </div>
      
      <Tabs 
        value={selectedDept} 
        onValueChange={setSelectedDept} 
        className="w-full"
      >
        <TabsList className="flex overflow-x-auto mb-8 pb-2">
          <TabsTrigger value="all" className="flex-shrink-0">All Departments</TabsTrigger>
          {departments.map(dept => (
            <TabsTrigger key={dept} value={dept} className="flex-shrink-0">
              {dept}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedDept} className="mt-6 animate-fade-in">
          <EventList
            events={filteredEvents}
            registeredEvents={registeredEvents}
            userRole={userRole}
            onRegister={onRegister}
            onManage={onManage}
            onDelete={onDelete}
            username={username}
            showByDepartment={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartmentEvents;
