
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Check } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  department: string;
  date: string;
  location: string;
  participants: number;
}

interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  userRole: "admin" | "student" | null;
  onRegister: (eventId: string) => void;
  onManage?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isRegistered, 
  userRole, 
  onRegister,
  onManage 
}) => {
  return (
    <Card className={`hover-scale transition-all ${
      isRegistered ? "border-primary" : ""
    }`}>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.department}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{event.description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-2 text-primary" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users size={16} className="mr-2 text-primary" />
            <span>{event.participants} registered</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{event.location}</p>
        
        {userRole === "student" && (
          <Button 
            className={`transition-all ${isRegistered ? "bg-green-500 hover:bg-green-600" : ""}`}
            size="sm"
            onClick={() => onRegister(event.id)}
          >
            {isRegistered ? (
              <>
                <Check size={16} className="mr-1" /> Registered
              </>
            ) : (
              "Register"
            )}
          </Button>
        )}
        
        {userRole === "admin" && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onManage && onManage(event.id)}
          >
            Manage
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
