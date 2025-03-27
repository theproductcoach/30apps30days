import { NextApiRequest, NextApiResponse } from 'next';
import { ClimbSession } from '@/types';
import { readJSON, writeJSON, SESSIONS_PATH, generateId } from '@/lib/server-storage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { climbId } = req.query;
    const sessions = readJSON<ClimbSession>(SESSIONS_PATH);
    const filteredSessions = sessions.filter(session => session.climbId === climbId as string);
    res.status(200).json(filteredSessions);
  } else if (req.method === 'POST') {
    const sessions = readJSON<ClimbSession>(SESSIONS_PATH);
    const newSession: ClimbSession = { ...req.body, id: generateId() };
    writeJSON(SESSIONS_PATH, [...sessions, newSession]);
    res.status(201).json(newSession);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 