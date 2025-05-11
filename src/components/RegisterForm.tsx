
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormProps {
  onRegister: () => void;
  onCancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onCancel }) => {
  const [name, setName] = useState("");
  const [regId, setRegId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");

  // Mock registration function - would connect to auth system in real implementation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Validate registration ID format
    if (!regId.match(/^\d{2}[a-z]{3}\d{3}$/i)) {
      alert("Invalid registration ID format. Use format: 23CSR248");
      return;
    }
    
    console.log("Registering user:", { name, regId, email, department });
    onRegister();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Student Account</CardTitle>
        <CardDescription>
          Register to participate in campus events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Full Name</label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="regId">Registration ID</label>
            <Input 
              id="regId" 
              placeholder="23CSR248" 
              value={regId}
              onChange={(e) => setRegId(e.target.value.toUpperCase())}
              required
            />
            <p className="text-xs text-muted-foreground">
              Format: 23CSR248 (year + dept code + number)
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@university.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="confirm-password">Confirm Password</label>
            <Input 
              id="confirm-password" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select
              value={department}
              onValueChange={setDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="ece">Electronics & Communication</SelectItem>
                <SelectItem value="eee">Electrical & Electronics</SelectItem>
                <SelectItem value="mech">Mechanical Engineering</SelectItem>
                <SelectItem value="civil">Civil Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Register
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account? <Button variant="link" className="p-0" onClick={onCancel}>Login</Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
