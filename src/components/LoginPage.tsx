
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
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [regId, setRegId] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === "admin") {
      // Admin login with email
      if (email.includes("admin")) {
        onLoginSuccess("admin");
        toast.success("Logged in as Administrator");
      } else {
        toast.error("Invalid admin credentials");
      }
    } else {
      // Student login with registration ID
      if (regId.match(/^\d{2}[a-z]{3}\d{3}$/i)) {
        onLoginSuccess("student");
        toast.success("Logged in as Student");
      } else {
        toast.error("Invalid registration ID format. Use format: 23CSR248");
      }
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
            <CardTitle className="text-2xl">Login to KEC Clubs</CardTitle>
            <CardDescription>
              Sign in to access college events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "student" | "admin")} className="w-full mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <form onSubmit={handleLogin} className="space-y-4">
              {activeTab === "admin" ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@kec.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Login hint: Use "admin" in email for admin access
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="regId">Registration ID</label>
                  <Input 
                    id="regId" 
                    type="text" 
                    placeholder="23CSR248" 
                    value={regId}
                    onChange={(e) => setRegId(e.target.value.toUpperCase())}
                    required
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your registration ID (e.g., 23CSR248)
                  </p>
                </div>
              )}
              
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
            {activeTab === "student" && (
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => setShowRegister(true)}
                className="story-link"
              >
                Register account
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default LoginPage;
