
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FileText } from "lucide-react";
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

interface ParticipantListProps {
  events: Event[];
}

// Mock participant data since we don't have a real backend yet
const mockParticipants = [
  { id: "p1", name: "John Doe", email: "john.doe@university.edu", registrationDate: "2025-04-30", eventId: "1" },
  { id: "p2", name: "Jane Smith", email: "jane.smith@university.edu", registrationDate: "2025-05-01", eventId: "1" },
  { id: "p3", name: "Alice Johnson", email: "alice.j@university.edu", registrationDate: "2025-05-02", eventId: "2" },
  { id: "p4", name: "Bob Wilson", email: "bob.wilson@university.edu", registrationDate: "2025-05-03", eventId: "2" },
  { id: "p5", name: "Charlie Brown", email: "charlie.b@university.edu", registrationDate: "2025-05-01", eventId: "3" },
];

const ParticipantList: React.FC<ParticipantListProps> = ({ events }) => {
  // Function to download CSV (mock)
  const handleDownloadCSV = (eventId: string, eventTitle: string) => {
    toast.success(`Downloaded participant list for ${eventTitle}`);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {events.map(event => {
        // Get participants for this event
        const eventParticipants = mockParticipants.filter(p => p.eventId === event.id);
        
        return (
          <Card key={event.id} className="hover-scale transition-all">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>
                {eventParticipants.length} registered participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="mr-2 text-primary" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                
                <Button 
                  size="sm"
                  className="hover-scale"
                  onClick={() => handleDownloadCSV(event.id, event.title)}
                >
                  <FileText size={16} className="mr-2" />
                  Download CSV
                </Button>
              </div>
              
              <div className="border rounded-md">
                <div className="p-3 bg-muted font-medium grid grid-cols-3">
                  <div>Name</div>
                  <div>Email</div>
                  <div>Registration Date</div>
                </div>
                
                {eventParticipants.length > 0 ? (
                  eventParticipants.map(participant => (
                    <div key={participant.id} className="p-3 grid grid-cols-3 border-t">
                      <div>{participant.name}</div>
                      <div>{participant.email}</div>
                      <div>{participant.registrationDate}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-muted-foreground">
                    No participants registered yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ParticipantList;
