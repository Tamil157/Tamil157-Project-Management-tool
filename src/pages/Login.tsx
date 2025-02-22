import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const DUMMY_EMAIL = "admin@example.com";
  const DUMMY_PASSWORD = "123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      localStorage.setItem("token", "dummyToken"); // Simulating authentication
      toast({
        title: "Login Successful 🎉",
        description: "Redirecting to home...",
      });

      setTimeout(() => navigate("/"), 1000);
    } else {
      setError("Invalid email or password!");
      toast({
        title: "Login Error ❌",
        description: "Invalid email or password!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen animate-fade-in">
      <Card className="p-8 w-96 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <p className="text-muted-foreground text-center mb-6">
          Welcome back! Please enter your credentials.
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-green-500"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-green-500"
          />
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
            Login
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </Card>
    </div>
  );
};

export default Login;
