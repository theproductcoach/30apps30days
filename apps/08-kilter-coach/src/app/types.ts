export type Mood = "Fresh" | "Normal" | "Tired";
export type Goal = "Power" | "Technique" | "Endurance" | "Fun";
export type Grade =
  | "V0"
  | "V1"
  | "V2"
  | "V3"
  | "V4"
  | "V5"
  | "V6"
  | "V7"
  | "V8"
  | "V9"
  | "V10"
  | "V11"
  | "V12";

export interface SessionPlan {
  warmups: string[];
  climbs: Array<{
    name: string;
    grade: Grade;
    description: string;
  }>;
  drill: string;
} 