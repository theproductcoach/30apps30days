export interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  preferred_date: string;
  goals: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface Question {
  id: string;
  question: string;
  answer?: string;
  created_at: string;
  updated_at?: string;
}

export interface ClimbLog {
  id: string;
  date: string;
  climb_name: string;
  grade: string;
  notes: string;
  created_at: string;
}

export interface Climb {
  id: string;
  name: string;
  grade: string;
  createdAt: string;
}

export interface ClimbSession {
  id: string;
  climbId: string;
  notes: string;
  date: string;
  status: 'in progress' | 'sent';
} 