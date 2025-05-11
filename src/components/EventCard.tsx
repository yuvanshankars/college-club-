
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Check, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

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
  onDelete?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isRegistered, 
  userRole, 
  onRegister,
  onManage,
  onDelete 
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
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onManage && onManage(event.id)}
            >
              <Users size={16} className="mr-1" />
              Participants
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete && onDelete(event.id)}
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
