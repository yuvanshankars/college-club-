
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Calendar, Users, LogIn, Plus, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import LoginPage from "@/components/LoginPage";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import ParticipantList from "@/components/ParticipantList";

// Mock events data - in a real app, this would come from an API
const initialMockEvents = [
  {
    id: "1",
    title: "Programming Contest",
    description: "Annual coding competition for all CS students",
    department: "Computer Science",
    date: "2025-05-15",
    location: "CS Building, Room 101",
    participants: 12
  },
  {
    id: "2",
    title: "Business Ethics Seminar",
    description: "A discussion on ethical practices in business",
    department: "Business",
    date: "2025-05-20",
    location: "Business School Auditorium",
    participants: 30
  },
  {
    id: "3",
    title: "Engineering Expo",
    description: "Showcase of student engineering projects",
    department: "Engineering",
    date: "2025-06-10",
    location: "Engineering Building",
    participants: 45
  },
  {
    id: "4",
    title: "Art Exhibition",
    description: "Student art showcase featuring paintings and sculptures",
    department: "Arts",
    date: "2025-06-15",
    location: "Art Gallery",
    participants: 25
  },
  {
    id: "5",
    title: "Chemistry Symposium",
    description: "Research presentations by chemistry students",
    department: "Science",
    date: "2025-06-20",
    location: "Science Building, Auditorium",
    participants: 18
  }
];

const Index = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("events");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "student" | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [events, setEvents] = useState(initialMockEvents);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Animation effect on mount
  useEffect(() => {
    document.body.classList.add("animate-fade-in");
    return () => {
      document.body.classList.remove("animate-fade-in");
    };
  }, []);

  // Handle login success
  const handleLoginSuccess = (role: "admin" | "student") => {
    setIsLoggedIn(true);
    setUserRole(role);
    setActiveTab("events");
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setRegisteredEvents([]);
    toast.info("Logged out successfully");
  };

  // Handle event registration
  const handleEventRegistration = (eventId: string) => {
    if (!isLoggedIn) {
      setActiveTab("login");
      toast.error("Please login to register for events");
      return;
    }
    
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      toast.info("You've unregistered from this event");
    } else {
      setRegisteredEvents([...registeredEvents, eventId]);
      toast.success("You've successfully registered for this event!");
    }
  };

  // Handle new event added
  const handleEventAdded = (newEvent: any) => {
    // Generate a new ID (in a real app, this would be done by the backend)
    const newId = String(events.length + 1);
    const eventWithId = { ...newEvent, id: newId, participants: 0 };
    setEvents([...events, eventWithId]);
    toast.success("Event created successfully!");
  };

  // Handle event deletion
  const handleEventDelete = (eventId: string) => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== eventId));
      toast.success("Event deleted successfully");
    }
  };

  // Handle viewing participants
  const handleViewParticipants = (eventId: string) => {
    setSelectedEventId(eventId);
    setActiveTab("participants");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              Lovable
            </h1>
            <p className="text-muted-foreground">College Event Management System</p>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  Logged in as <strong className="capitalize">{userRole}</strong>
                </span>
                <Button variant="outline" onClick={handleLogout} className="hover-scale">Logout</Button>
              </div>
            ) : (
              <Button onClick={() => setActiveTab("login")} className="hover-scale transition-all">
                <LogIn className="mr-2" size={18} />
                Login
              </Button>
            )}
          </div>
        </div>

        {isLoggedIn && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="events" className="hover-scale transition-all">
                <Calendar className="mr-2" size={18} />
                Events
              </TabsTrigger>
              <TabsTrigger value="participants" disabled={userRole !== "admin" && !registeredEvents.length} className="hover-scale transition-all">
                <Users className="mr-2" size={18} />
                {userRole === "admin" ? "Participants" : "My Registrations"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="animate-fade-in">
              {userRole === "admin" && (
                <EventForm onEventAdded={handleEventAdded} />
              )}
              
              <EventList
                events={events}
                registeredEvents={registeredEvents}
                userRole={userRole}
                onRegister={handleEventRegistration}
                onManage={userRole === "admin" ? handleViewParticipants : undefined}
                onDelete={userRole === "admin" ? handleEventDelete : undefined}
              />
            </TabsContent>
            
            <TabsContent value="participants" className="animate-fade-in">
              {userRole === "admin" ? (
                <ParticipantList 
                  events={selectedEventId ? events.filter(event => event.id === selectedEventId) : events} 
                />
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Your Registered Events</h2>
                  
                  {registeredEvents.length > 0 ? (
                    <EventList
                      events={events.filter(event => registeredEvents.includes(event.id))}
                      registeredEvents={registeredEvents}
                      userRole={userRole}
                      onRegister={handleEventRegistration}
                    />
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">You haven't registered for any events yet.</p>
                        <Button className="mt-4 hover-scale" onClick={() => setActiveTab("events")}>
                          Browse Events
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </header>

      <main className="container mx-auto py-6 px-4">
        {!isLoggedIn && activeTab === "login" ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : !isLoggedIn ? (
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to Lovable</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Your one-stop platform for college events and activities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="hover-scale transition-all">
                <CardHeader>
                  <CardTitle>Discover Events</CardTitle>
                  <CardDescription>Find events that match your interests</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover-scale transition-all">
                <CardHeader>
                  <CardTitle>Register Easily</CardTitle>
                  <CardDescription>Simple one-click registration process</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="hover-scale transition-all">
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                  <CardDescription>Get notifications about upcoming events</CardDescription>
                </CardHeader>
              </Card>
            </div>
            
            <Button size="lg" onClick={() => setActiveTab("login")} className="hover-scale transition-all">
              <LogIn className="mr-2" size={20} />
              Get Started
            </Button>
          </div>
        ) : null}
      </main>
      
      <footer className="py-6 border-t mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Lovable - College Event Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
