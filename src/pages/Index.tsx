
import { BarChart, Calendar, CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bar, BarChart as ReBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 3 },
  { name: "Wed", tasks: 7 },
  { name: "Thu", tasks: 5 },
  { name: "Fri", tasks: 6 },
  { name: "Sat", tasks: 2 },
  { name: "Sun", tasks: 1 },
];

const stats = [
  {
    title: "Total Tasks",
    value: "28",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    title: "In Progress",
    value: "12",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    title: "Upcoming",
    value: "8",
    icon: Calendar,
    color: "text-purple-500",
  },
  {
    title: "Completed",
    value: "16",
    icon: BarChart,
    color: "text-orange-500",
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's your task analytics overview.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 animate-slide-up">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-background ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Task Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar
                  dataKey="tasks"
                  fill="currentColor"
                  className="fill-primary"
                  radius={[4, 4, 0, 0]}
                />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
