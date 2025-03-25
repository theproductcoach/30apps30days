export type CompetencyLevel = 'APM' | 'PM' | 'Senior PM' | 'GPM' | 'Director' | 'Senior Director' | 'VP' | 'CPO';

export interface Competency {
  id: string;
  name: string;
  description: string;
  idealScores: Record<CompetencyLevel, number>;
}

export interface Assessment {
  id: string;
  userId: string;
  type: 'self' | 'manager';
  competencies: Record<string, number>;
  notes?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  role: CompetencyLevel;
  managerId?: string;
}

export interface Task {
  id: string;
  userId: string;
  competencyId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
} 