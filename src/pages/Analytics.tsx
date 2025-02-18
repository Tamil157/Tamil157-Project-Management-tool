
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BarChart, Clock, Users } from "lucide-react";
import {
  Bar,
  BarChart as ReBarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const productivityData = [
  { day: "Mon", completed: 5, total: 8 },
  { day: "Tue", completed: 7, total: 10 },
  { day: "Wed", completed: 4, total: 6 },
  { day: "Thu", completed: 8, total: 12 },
  { day: "Fri", completed: 6, total: 8 },
];

const teamData = [
  { name: "Alice", tasks: 12 },
  { name: "Bob", tasks: 8 },
  { name: "Charlie", tasks: 15 },
  { name: "Diana", tasks: 10 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track your team's performance and productivity metrics.
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Productivity Overview
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#6b7280"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Performance
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={teamData}>
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
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
