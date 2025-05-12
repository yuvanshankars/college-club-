import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Calendar, Users, LogIn, Plus, Trash2, Images } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import LoginPage from "@/components/LoginPage";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import ParticipantList from "@/components/ParticipantList";
import HomeFeatures from "@/components/HomeFeatures";
import DepartmentEvents from "@/components/DepartmentEvents";
import { eventService, participantService, Event } from "@/services/eventService";

// Featured event images for homepage
const eventImages = [
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
];

const Index = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("events");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "student" | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  
  // Load events from our database service when component mounts
  useEffect(() => {
    const loadEvents = () => {
      try {
        const allEvents = eventService.getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
        toast.error("Failed to load events");
      }
    };
    
    loadEvents();
  }, []);
  
  // Load user's registered events when they log in
  useEffect(() => {
    if (isLoggedIn && username) {
      const userRegistrations = participantService.getUserRegisteredEvents(username);
      setRegisteredEvents(userRegistrations);
    }
  }, [isLoggedIn, username]);

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
    setUsername(role === "admin" ? "Administrator" : "Student User");
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setRegisteredEvents([]);
    setUsername("");
    toast.info("Logged out successfully");
  };

  // Handle event registration
  const handleEventRegistration = (eventId: string, userDisplayName?: string) => {
    if (!isLoggedIn) {
      setActiveTab("login");
      toast.error("Please login to register for events");
      return;
    }
    
    const displayName = userDisplayName || username;
    
    if (registeredEvents.includes(eventId)) {
      // Unregister using our service
      const result = participantService.unregisterParticipant(displayName, eventId);
      if (result.success) {
        setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
        
        // Update events list to reflect changes in participant count
        setEvents(prevEvents => {
          return prevEvents.map(event => {
            if (event.id === eventId) {
              return { ...event, participants: Math.max(0, event.participants - 1) };
            }
            return event;
          });
        });
      }
    } else {
      // Register using our service
      const result = participantService.registerParticipant(displayName, eventId);
      if (result.success) {
        setRegisteredEvents([...registeredEvents, eventId]);
        
        // Update events list to reflect changes in participant count
        setEvents(prevEvents => {
          return prevEvents.map(event => {
            if (event.id === eventId) {
              return { ...event, participants: event.participants + 1 };
            }
            return event;
          });
        });
      }
    }
  };

  // Handle new event added
  const handleEventAdded = (newEvent: Event) => {
    setEvents([...events, newEvent]);
    toast.success("Event created successfully!");
  };

  // Handle event deletion
  const handleEventDelete = (eventId: string) => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this event?")) {
      const result = eventService.deleteEvent(eventId);
      if (result) {
        setEvents(events.filter(event => event.id !== eventId));
        // Remove from registered events if it was registered
        if (registeredEvents.includes(eventId)) {
          setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
        }
      }
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
              KEC Clubs
            </h1>
            <p className="text-muted-foreground">College Event Management System</p>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  Logged in as <strong className="capitalize">{userRole}</strong>
                  {username && ` (${username})`}
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
                username={username}
              />
            </TabsContent>
            
            <TabsContent value="participants" className="animate-fade-in">
              {userRole === "admin" ? (
                <ParticipantList 
                  events={selectedEventId ? events.filter(event => event.id === selectedEventId) : events} 
                  registeredEvents={registeredEvents}
                  registeredUsers={registeredUsers}
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
                      username={username}
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
          <>
            <HomeFeatures 
              eventImages={eventImages}
              onLogin={() => setActiveTab("login")} 
            />
            <DepartmentEvents 
              events={events}
              registeredEvents={registeredEvents}
              userRole={userRole}
              onRegister={handleEventRegistration}
              username={username}
            />
          </>
        ) : null}
      </main>
      
      <footer className="py-6 border-t mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 KEC Clubs - College Event Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
