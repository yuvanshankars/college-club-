
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import RegisterForm from "@/components/RegisterForm";

interface LoginPageProps {
  onLoginSuccess: (role: "admin" | "student") => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes - in a real app, this would connect to a backend
    if (email.includes("admin")) {
      onLoginSuccess("admin");
      toast.success("Logged in as Administrator");
    } else {
      onLoginSuccess("student");
      toast.success("Logged in as Student");
    }
  };

  // Mock registration success handler
  const handleRegisterSuccess = () => {
    setShowRegister(false);
    toast.success("Registration successful! You can now log in.");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-md">
      {showRegister ? (
        <RegisterForm 
          onRegister={handleRegisterSuccess} 
          onCancel={() => setShowRegister(false)} 
        />
      ) : (
        <Card className="w-full animate-fade-in hover-scale transition-all">
          <CardHeader>
            <CardTitle className="text-2xl">Login to Lovable</CardTitle>
            <CardDescription>
              Sign in to access college events
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
                <Button type="submit" className="w-full hover-scale transition-all">
                  <LogIn className="mr-2" size={18} />
                  Login
                </Button>
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
    </div>
  );
};

export default LoginPage;
