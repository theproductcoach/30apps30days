import fs from 'fs';
import path from 'path';
import { Climb, ClimbSession } from '@/types';

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (error) {
  console.error('Failed to create data directory:', error);
}

export const CLIMBS_PATH = path.join(DATA_DIR, 'climbs.json');
export const SESSIONS_PATH = path.join(DATA_DIR, 'sessions.json');

// Sample climbs data
const SAMPLE_CLIMBS: Climb[] = [
  {
    id: 'climb1',
    name: 'Midnight Lightning',
    grade: 'V8',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
  },
  {
    id: 'climb2',
    name: 'The Nose',
    grade: '5.14a',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days ago
  },
  {
    id: 'climb3',
    name: 'Moonlight Buttress',
    grade: '5.12d',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    id: 'climb4',
    name: 'Astroman',
    grade: '5.11c',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  }
];

// Sample sessions data
const SAMPLE_SESSIONS: ClimbSession[] = [
  {
    id: 'session1',
    climbId: 'climb1',
    notes: 'First attempt. Struggled with the crux move.',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in progress'
  },
  {
    id: 'session2',
    climbId: 'climb1',
    notes: 'Second attempt. Made it past the crux but fell near the top.',
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in progress'
  },
  {
    id: 'session3',
    climbId: 'climb1',
    notes: 'Finally sent it! Felt great.',
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'sent'
  },
  {
    id: 'session4',
    climbId: 'climb2',
    notes: 'Started working on the route. Tough!',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in progress'
  },
  {
    id: 'session5',
    climbId: 'climb2',
    notes: 'Made progress on the middle section.',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in progress'
  },
  {
    id: 'session6',
    climbId: 'climb3',
    notes: 'First day on this route. Love the moves!',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in progress'
  },
  {
    id: 'session7',
    climbId: 'climb4',
    notes: 'Flash attempt! Surprised myself.',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'sent'
  }
];

// Initialize data files if they don't exist
function initializeDataFiles() {
  if (!fs.existsSync(CLIMBS_PATH)) {
    writeJSON(CLIMBS_PATH, SAMPLE_CLIMBS);
    console.log('Initialized climbs data file with sample data');
  }
  
  if (!fs.existsSync(SESSIONS_PATH)) {
    writeJSON(SESSIONS_PATH, SAMPLE_SESSIONS);
    console.log('Initialized sessions data file with sample data');
  }
}

// Call initialization
initializeDataFiles();

export function readJSON<T>(filePath: string): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read file:', error);
    return [];
  }
}

export function writeJSON<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to write file:', error);
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
} 