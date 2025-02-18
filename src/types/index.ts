
export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  tasks: Task[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}
