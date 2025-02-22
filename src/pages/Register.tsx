import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      toast({ title: "Registration Successful 🎉", description: "You can now log in!" });
      navigate("/login");
    } catch (err: any) {
      toast({ title: "Error ❌", description: err.response?.data?.error || "Registration failed!", variant: "destructive" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-8 w-96 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <p className="text-muted-foreground text-center mb-6">Create an account to continue</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full">Register</Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">Login</a>
        </p>
      </Card>
    </div>
  );
};

export default Register;
