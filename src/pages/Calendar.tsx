
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

const Calendar = () => {
  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your schedule.
          </p>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="w-5 h-5" />
            <h2 className="text-lg font-semibold">
              {currentDate.toLocaleString("default", { month: "long" })}{" "}
              {currentDate.getFullYear()}
            </h2>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="h-8 flex items-center justify-center text-sm font-medium"
              >
                {day}
              </div>
            ))}

            {emptyDays.map((day) => (
              <div key={`empty-${day}`} className="h-24 border rounded-lg" />
            ))}

            {days.map((day) => (
              <div
                key={day}
                className={`h-24 border rounded-lg p-2 hover:bg-accent transition-colors ${
                  day === currentDate.getDate()
                    ? "bg-primary/10 border-primary"
                    : ""
                }`}
              >
                <span className="text-sm font-medium">{day}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
