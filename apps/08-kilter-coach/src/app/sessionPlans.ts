import { Grade } from "@/app/types";

// Helper function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get grades within a range
const getGradesInRange = (minGrade: Grade, maxGrade: Grade): Grade[] => {
  const allGrades: Grade[] = [
    "V0", "V1", "V2", "V3", "V4", "V5", "V6",
    "V7", "V8", "V9", "V10", "V11", "V12"
  ];
  const minIndex = allGrades.indexOf(minGrade);
  const maxIndex = allGrades.indexOf(maxGrade);
  return allGrades.slice(minIndex, maxIndex + 1);
};

// Warm-up templates based on mood
const warmupTemplates = {
  Fresh: [
    ["Quick traverse on jugs for 3 minutes", "10 easy moves focusing on body position"],
    ["Light stretching", "5 minutes of easy climbing", "Practice basic movements"],
    ["3 easy boulder problems", "Focus on smooth movement patterns"]
  ],
  Normal: [
    ["5-minute traverse on various holds", "Dynamic stretching", "2 easy problems"],
    ["Light cardio warm-up", "Joint mobility exercises", "Progressive difficulty climbing"],
    ["10-minute traversing", "Movement drills on easy terrain"]
  ],
  Tired: [
    ["Extended stretching session", "Very easy traversing", "Focus on technique"],
    ["10-minute mobility work", "Super easy climbing", "Emphasis on perfect form"],
    ["Joint mobility exercises", "Light traversing", "2-3 very easy problems"]
  ]
};

// Power-focused problems
const powerDescriptions = [
  "Powerful moves between good holds. Focus on explosive movement.",
  "Big moves to distant holds. Commit to the movements.",
  "Campus-style climbing with foot cuts. Maximum effort required.",
  "Steep climbing with long moves. Generate power from the legs.",
  "Powerful compression moves. Keep tension through your core."
];

// Technique-focused problems
const techniqueDescriptions = [
  "Delicate balance moves. Focus on weight transfer.",
  "Small holds requiring precise placement. Stay controlled.",
  "Technical corner climbing. Use subtle body positions.",
  "Slab-style movement. Perfect foot placement essential.",
  "Complex sequence requiring body tension and precision."
];

// Endurance-focused problems
const enduranceDescriptions = [
  "Long sequence with multiple crux sections. Pace yourself.",
  "Sustained climbing with minimal rests. Focus on breathing.",
  "Link multiple problems together. Rest at good holds.",
  "Continuous movement on easier terrain. Build pump resistance.",
  "Circuit-style problem with various movements. Keep moving."
];

// Fun-focused problems
const funDescriptions = [
  "Dynamic moves to positive holds. Enjoy the movement!",
  "Interesting sequence with unique body positions.",
  "Creative beta required. Experiment with different solutions.",
  "Flowing movements on good holds. Have fun with it!",
  "Mix of different styles. Choose your own adventure."
];

// Technique drills based on goals
const techniquedrills = {
  Power: [
    "Practice deadpoints: Choose problems with distant moves between good holds.",
    "Lock-off training: Hold positions for 3 seconds on each move.",
    "Explosive movement drill: Practice generating power from different positions."
  ],
  Technique: [
    "Silent feet drill: Climb 3 problems focusing on precise foot placement.",
    "Hover hands drill: Pause before grabbing each hold to ensure perfect placement.",
    "One-touch drill: Must stick each hold first try to encourage precision."
  ],
  Endurance: [
    "Up-down drill: Climb up and down problems without resting.",
    "4x4 drill: Four problems, four times each, minimal rest.",
    "Minute-on minute-off: Continuous climbing with timed rests."
  ],
  Fun: [
    "Create your own problem: Make up a sequence using only certain hold colors.",
    "Elimination game: Each attempt, remove one hold from your sequence.",
    "Partner challenge: Take turns adding moves to create a sequence."
  ]
};

export interface SessionPlan {
  warmups: string[];
  climbs: Array<{
    name: string;
    grade: Grade;
    description: string;
  }>;
  drill: string;
}

export const generateSessionPlan = (
  mood: "Fresh" | "Normal" | "Tired",
  goal: "Power" | "Technique" | "Endurance" | "Fun",
  minGrade: Grade,
  maxGrade: Grade
): SessionPlan => {
  // Get available grades
  const gradesInRange = getGradesInRange(minGrade, maxGrade);
  
  // Select warm-up based on mood
  const warmups = getRandomItem(warmupTemplates[mood]);

  // Get description templates based on goal
  const getDescriptionTemplate = () => {
    switch (goal) {
      case "Power": return powerDescriptions;
      case "Technique": return techniqueDescriptions;
      case "Endurance": return enduranceDescriptions;
      case "Fun": return funDescriptions;
    }
  };

  // Generate climbs
  const climbs = Array.from({ length: 3 }, (_, index) => {
    const descriptions = getDescriptionTemplate();
    const grade = getRandomItem(gradesInRange);
    return {
      name: `${goal} Problem ${index + 1}`,
      grade,
      description: getRandomItem(descriptions)
    };
  });

  // Select appropriate drill
  const drill = getRandomItem(techniquedrills[goal]);

  // Adjust number of climbs based on mood
  if (mood === "Tired") {
    climbs.length = 2; // Reduce number of problems when tired
  } else if (mood === "Fresh") {
    climbs.push({ // Add an extra problem when fresh
      name: `Bonus ${goal} Problem`,
      grade: getRandomItem(gradesInRange),
      description: getRandomItem(getDescriptionTemplate())
    });
  }

  return {
    warmups,
    climbs,
    drill
  };
}; 