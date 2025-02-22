import { useNavigate, useLocation } from "react-router-dom";
import { Home, BarChart, Folder, Calendar, Users, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Analytics", icon: BarChart, url: "/analytics" },
  { title: "Projects", icon: Folder, url: "/projects" },
  { title: "Calendar", icon: Calendar, url: "/calendar" },
  { title: "Team", icon: Users, url: "/team" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    navigate("/login"); // Redirect to login if not authenticated
    return null;
  }

  return (
    <Sidebar className="w-64 bg-green-900 text-white min-h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-center py-4">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => navigate(item.url)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        location.pathname === item.url
                          ? "bg-green-700"
                          : "hover:bg-green-800"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Logout Button */}
        <button
          className="flex items-center gap-3 p-4 w-full rounded-md bg-red-600 hover:bg-red-700 transition mt-4"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </SidebarContent>
    </Sidebar>
  );
}
