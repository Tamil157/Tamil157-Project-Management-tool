
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Folder } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesigning the company website with new branding",
    progress: 75,
    tasks: 12,
    completed: 9,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Building a new mobile app for customers",
    progress: 45,
    tasks: 20,
    completed: 9,
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q4 marketing campaign planning and execution",
    progress: 30,
    tasks: 15,
    completed: 5,
  },
];

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all your ongoing projects.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Folder className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">{project.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    {project.completed} of {project.tasks} tasks completed
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
