import { create } from 'zustand';
import { Assessment, User, Task } from '@/types/assessment';

interface AssessmentStore {
  users: User[];
  assessments: Assessment[];
  tasks: Task[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addAssessment: (assessment: Assessment) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  users: [
    {
      id: '1',
      name: 'John Doe',
      role: 'PM',
      managerId: '2',
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Senior PM',
    },
  ],
  assessments: [],
  tasks: [],
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  addAssessment: (assessment) =>
    set((state) => ({
      assessments: [...state.assessments, assessment],
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
})); 