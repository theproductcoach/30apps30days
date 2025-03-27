import { NextApiRequest, NextApiResponse } from 'next';
import { Climb } from '@/types';
import { readJSON, writeJSON, CLIMBS_PATH, generateId } from '@/lib/server-storage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const climbs = readJSON<Climb>(CLIMBS_PATH);
    res.status(200).json(climbs);
  } else if (req.method === 'POST') {
    const climbs = readJSON<Climb>(CLIMBS_PATH);
    const newClimb: Climb = { 
      ...req.body, 
      id: generateId(), 
      createdAt: new Date().toISOString() 
    };
    writeJSON(CLIMBS_PATH, [...climbs, newClimb]);
    res.status(201).json(newClimb);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 