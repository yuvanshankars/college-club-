
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Event {
  id: string;
  title: string;
  description: string;
  department: string;
  date: string;
  location: string;
  participants: number;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  eventId: string;
}

interface ParticipantListProps {
  events: Event[];
  registeredEvents: string[];
  registeredUsers: Record<string, string[]>;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ events, registeredEvents, registeredUsers }) => {
  // Function to download CSV
  const handleDownloadCSV = (eventId: string, eventTitle: string) => {
    // Get participants for this event
    const usernames = registeredUsers[eventId] || [];
    
    if (usernames.length === 0) {
      toast.error("No participants to download");
      return;
    }
    
    // Create CSV content with proper headers and user data
    const headers = ["Name", "Email", "Registration Date"];
    const csvData = [
      headers.join(","),
      ...usernames.map(name => 
        `"${name}","${name.toLowerCase().replace(' ', '.')}@university.edu","${new Date().toISOString().split('T')[0]}"`
      )
    ].join("\n");
    
    // Create a Blob and download link
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    // Set up download link
    link.setAttribute("href", url);
    link.setAttribute("download", `${eventTitle.replace(/\s+/g, '_')}_participants.csv`);
    link.style.visibility = "hidden";
    
    // Add to document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Downloaded participant list for ${eventTitle}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {events.map(event => {
        // Get participants for this event from the registered users
        const eventParticipants = registeredUsers[event.id] || [];
        
        return (
          <Card key={event.id} className="hover-scale transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    {eventParticipants.length} registered participants
                  </CardDescription>
                </div>
                <Button 
                  size="sm"
                  className="hover-scale"
                  onClick={() => handleDownloadCSV(event.id, event.title)}
                >
                  <Download size={16} className="mr-2" />
                  Download CSV
                </Button>
              </div>
              <div className="flex items-center text-sm mt-2">
                <Calendar size={16} className="mr-2 text-primary" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent>              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventParticipants.length > 0 ? (
                    eventParticipants.map((name, index) => (
                      <TableRow key={index}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{name.toLowerCase().replace(' ', '.')}@university.edu</TableCell>
                        <TableCell>{new Date().toISOString().split('T')[0]}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No participants registered yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ParticipantList;
