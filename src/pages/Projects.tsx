import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, Folder, MoreVertical, Plus, Trash } from "lucide-react";
import { useState } from "react";

const initialProjects = [
  { id: 1, name: "Website Redesign", description: "Revamping the UI", progress: 75, tasks: 12, completed: 9 },
  { id: 2, name: "Mobile App Dev", description: "Building a new app", progress: 45, tasks: 20, completed: 9 },
  { id: 3, name: "Marketing Campaign", description: "Planning and execution", progress: 30, tasks: 15, completed: 5 },
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { toast } = useToast();

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({ name: project.name, description: project.description });
    setIsDialogOpen(true);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast({ title: "Project deleted", description: "Successfully removed." });
  };

  const handleSubmit = () => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? { ...p, ...formData } : p))
      );
      toast({ title: "Project updated", description: "Changes saved." });
    } else {
      setProjects([...projects, { id: projects.length + 1, ...formData, progress: 0, tasks: 0, completed: 0 }]);
      toast({ title: "Project created", description: "Added successfully." });
    }
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Projects</h1>
          <Button onClick={handleAddProject} className="gap-2">
            <Plus className="w-4 h-4" /> Add Project
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div key={project.id} whileHover={{ scale: 1.02 }}>
              <Card className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="flex gap-3">
                    <Folder className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{project.name}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEditProject(project)}>
                        <Edit2 className="w-4 h-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProject(project.id)}>
                        <Trash className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm mb-4">{project.description}</p>
                <div className="h-2 bg-gray-300 rounded-full">
                  <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 0.8 }} />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>{project.completed} of {project.tasks} tasks completed</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "New Project"}</DialogTitle>
              <DialogDescription>{editingProject ? "Modify details" : "Enter project details"}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Project Name" />
              <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>{editingProject ? "Save" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default Projects;
