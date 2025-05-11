
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Check, Trash2, Images } from "lucide-react";
import { toast } from "@/components/ui/sonner";

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

interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  userRole: "admin" | "student" | null;
  onRegister: (eventId: string, username?: string) => void;
  onManage?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  username?: string;
}

// Array of fallback images from Unsplash
const fallbackImages = [
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
];

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  isRegistered, 
  userRole, 
  onRegister,
  onManage,
  onDelete,
  username = "Current User"
}) => {
  // Get an image based on the event ID
  const eventImage = event.image || fallbackImages[parseInt(event.id) % fallbackImages.length];
  
  return (
    <Card className={`hover-scale transition-all ${
      isRegistered ? "border-primary" : ""
    }`}>
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img 
          src={eventImage} 
          alt={event.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
          {event.department}
        </div>
      </div>
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
            onClick={() => onRegister(event.id, username)}
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
