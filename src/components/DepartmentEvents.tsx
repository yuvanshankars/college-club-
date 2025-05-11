
import React from "react";
import EventList from "@/components/EventList";

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
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">Events by Department</h2>
      <EventList
        events={events}
        registeredEvents={registeredEvents}
        userRole={userRole}
        onRegister={onRegister}
        onManage={onManage}
        onDelete={onDelete}
        username={username}
        showByDepartment={true}
      />
    </div>
  );
};

export default DepartmentEvents;
