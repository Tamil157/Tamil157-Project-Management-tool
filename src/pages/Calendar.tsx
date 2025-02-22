import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, PlusCircle, ArrowLeft, ArrowRight } from "lucide-react";

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTask, setNewTask] = useState("");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const addTask = () => {
    if (!newTask.trim() || selectedDay === null) return;
    const key = `${currentYear}-${currentMonth}-${selectedDay}`;
    setTasks((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newTask],
    }));
    setNewTask("");
  };

  const changeMonth = (direction) => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + direction;
      let newYear = currentYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-2">View and manage your schedule.</p>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => changeMonth(-1)} />
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold">
                {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
              </h2>
            </div>
            <ArrowRight className="w-5 h-5 cursor-pointer" onClick={() => changeMonth(1)} />
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="h-8 flex items-center justify-center text-sm font-medium">
                {day}
              </div>
            ))}

            {emptyDays.map((day) => (
              <div key={`empty-${day}`} className="h-24 border rounded-lg" />
            ))}

            {days.map((day) => (
              <div
                key={day}
                className={`h-24 border rounded-lg p-2 hover:bg-accent transition-colors cursor-pointer ${
                  day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
                    ? "bg-primary/10 border-primary"
                    : ""
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="text-sm font-medium">{day}</span>
                <div className="mt-1 space-y-1 text-xs">
                  {(tasks[`${currentYear}-${currentMonth}-${day}`] || []).map((task, index) => (
                    <div key={index} className="bg-gray-100 p-1 rounded-md">{task}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {selectedDay && (
          <Card className="p-4 mt-4 animate-fade-in">
            <h3 className="text-lg font-semibold">Add Work for {selectedDay} {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}</h3>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="border p-2 rounded-md w-full"
                placeholder="Enter work details..."
              />
              <button
                className="bg-primary text-white p-2 rounded-md flex items-center gap-1"
                onClick={addTask}
              >
                <PlusCircle className="w-5 h-5" /> Add
              </button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Calendar;