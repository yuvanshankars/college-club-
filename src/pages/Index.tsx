
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskForm from "@/components/TaskForm";
import RegisterForm from "@/components/RegisterForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Users, LogIn, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "student" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  // Mock login function - would connect to auth system in real implementation
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes only
    if (email.includes("admin")) {
      setUserRole("admin");
      toast.success("Logged in as Administrator");
    } else {
      setUserRole("student");
      toast.success("Logged in as Student");
    }
    setIsLoggedIn(true);
    setActiveTab("events");
  };

  // Mock logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setEmail("");
    setPassword("");
    setRegisteredEvents([]);
    toast.info("Logged out successfully");
  };

  // Mock registration success handler
  const handleRegisterSuccess = () => {
    setShowRegister(false);
    // In a real app, this might auto-login the user or show a success message
    toast.success("Registration successful! You can now log in.");
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

  // Mock events data
  const events = [
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
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="flex justify-between items-center mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">College Club Events</h1>
          <p className="text-muted-foreground">Manage and participate in campus activities</p>
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
            <Button onClick={() => setActiveTab("login")} className="hover-scale">
              <LogIn className="mr-2" size={18} />
              Login
            </Button>
          )}
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="events" className="hover-scale">
            <Calendar className="mr-2" size={18} />
            Events
          </TabsTrigger>
          <TabsTrigger value="participants" className="hover-scale">
            <Users className="mr-2" size={18} />
            Participants
          </TabsTrigger>
          <TabsTrigger value="login" disabled={isLoggedIn} className="hover-scale">
            <LogIn className="mr-2" size={18} />
            Login
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4 animate-fade-in">
          {isLoggedIn && userRole === "admin" && (
            <TaskForm />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
              <Card key={event.id} className={`hover-scale transition-all ${
                registeredEvents.includes(event.id) ? "border-primary" : ""
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
                <CardFooter>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                  {isLoggedIn && userRole === "student" && (
                    <Button 
                      className={`ml-auto transition-all ${registeredEvents.includes(event.id) ? "bg-green-500 hover:bg-green-600" : ""}`}
                      size="sm"
                      onClick={() => handleEventRegistration(event.id)}
                    >
                      {registeredEvents.includes(event.id) ? (
                        <>
                          <Check size={16} className="mr-1" /> Registered
                        </>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  )}
                  {isLoggedIn && userRole === "admin" && (
                    <Button variant="outline" className="ml-auto" size="sm">
                      Manage
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="participants" className="animate-fade-in">
          {isLoggedIn && userRole === "admin" ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Event Participants</h2>
                <Button className="hover-scale">Download CSV</Button>
              </div>
              
              {events.map(event => (
                <Card key={event.id} className="hover-scale transition-all">
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {event.participants} registered participants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Event scheduled for {new Date(event.date).toLocaleDateString()}
                    </p>
                    <div className="border rounded-md">
                      <div className="p-3 bg-muted font-medium grid grid-cols-3">
                        <div>Name</div>
                        <div>Email</div>
                        <div>Registration Date</div>
                      </div>
                      <div className="p-3 grid grid-cols-3 border-t">
                        <div>John Doe</div>
                        <div>john.doe@university.edu</div>
                        <div>2025-04-30</div>
                      </div>
                      <div className="p-3 grid grid-cols-3 border-t">
                        <div>Jane Smith</div>
                        <div>jane.smith@university.edu</div>
                        <div>2025-05-01</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="hover-scale transition-all animate-fade-in">
              <CardHeader>
                <CardTitle>Access Restricted</CardTitle>
                <CardDescription>
                  Only administrators can view participant information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Please log in as an administrator to view this section.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="login" className="animate-fade-in">
          {showRegister ? (
            <RegisterForm 
              onRegister={handleRegisterSuccess} 
              onCancel={() => setShowRegister(false)} 
            />
          ) : (
            <Card className="max-w-md mx-auto hover-scale transition-all">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Sign in to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@university.edu" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      Login hint: Use "admin" in email for admin access
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="password">Password</label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="pt-2">
                    <Button type="submit" className="w-full hover-scale transition-all">Login</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="link" size="sm">Forgot password?</Button>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setShowRegister(true)}
                  className="story-link"
                >
                  Register account
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
