import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, BarChart, Folder, Calendar, Users, Settings } from "lucide-react";

const menuItems = [
  { title: "Analytics", icon: BarChart, url: "/analytics" },
  { title: "Projects", icon: Folder, url: "/projects" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Team", icon: Users, url: "/team" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [animatedText, setAnimatedText] = useState("");
  const welcomeText = "Welcome to Dashboard 🚀";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < welcomeText.length) {
        setAnimatedText((prev) => prev + welcomeText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Navbar */}
      <nav className="w-full bg-green-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </nav>
      
      {/* Animated Welcome Message */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">
          {animatedText}
        </h1>
        <p className="text-gray-600 text-center max-w-lg">
          This is your personal dashboard where you can track analytics, manage projects, view schedules, collaborate with your team, and customize settings. Choose an option below to get started.
        </p>
      </div>
      
      {/* Menu Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {menuItems.map((item) => (
          <Card
            key={item.title}
            className="p-4 flex flex-col items-center justify-center w-64 cursor-pointer hover:bg-green-100 transition"
            onClick={() => navigate(item.url)}
          >
            <item.icon className="w-10 h-10 text-green-500" />
            <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
