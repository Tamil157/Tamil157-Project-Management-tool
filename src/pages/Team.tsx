
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Project Manager",
    email: "alice@example.com",
    tasks: 8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Developer",
    email: "bob@example.com",
    tasks: 12,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Designer",
    email: "charlie@example.com",
    tasks: 6,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
  },
  {
    id: 4,
    name: "Diana Miller",
    role: "Developer",
    email: "diana@example.com",
    tasks: 10,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
  },
];

const Team = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-2">
            Manage your team members and their roles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                <div className="mt-4 px-3 py-1 bg-primary/10 rounded-full text-sm">
                  {member.tasks} active tasks
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Team;
