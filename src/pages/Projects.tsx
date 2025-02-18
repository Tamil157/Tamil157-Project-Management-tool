
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2, Folder, MoreVertical, Plus, Trash } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  tasks: number;
  completed: number;
}

const initialProjects = [
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
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { toast } = useToast();

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
    });
  };

  const handleSubmit = () => {
    if (editingProject) {
      // Edit existing project
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id
            ? { ...p, ...formData }
            : p
        )
      );
      toast({
        title: "Project updated",
        description: "The project has been successfully updated.",
      });
    } else {
      // Add new project
      const newProject: Project = {
        id: Math.max(...projects.map((p) => p.id)) + 1,
        name: formData.name,
        description: formData.description,
        progress: 0,
        tasks: 0,
        completed: 0,
      };
      setProjects((prev) => [...prev, newProject]);
      toast({
        title: "Project created",
        description: "The new project has been successfully created.",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-2">
              View and manage all your ongoing projects.
            </p>
          </div>
          <Button onClick={handleAddProject} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Folder className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{project.name}</h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleEditProject(project)}
                      className="flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="flex items-center gap-2 text-destructive"
                        >
                          <Trash className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this project? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? "Make changes to your project here."
                  : "Fill in the details for your new project."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name">Project Name</label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingProject ? "Save Changes" : "Create Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
