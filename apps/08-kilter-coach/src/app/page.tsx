"use client";

import { useState, FormEvent } from "react";
import styles from "./session-planner.module.css";
import { Mood, Goal, Grade, SessionPlan } from "./types";
import { generateSessionPlan } from "./sessionPlans";

const GRADES: Grade[] = [
  "V0",
  "V1",
  "V2",
  "V3",
  "V4",
  "V5",
  "V6",
  "V7",
  "V8",
  "V9",
  "V10",
  "V11",
  "V12",
];

export default function Home() {
  const [mood, setMood] = useState<Mood>("Normal");
  const [goal, setGoal] = useState<Goal>("Fun");
  const [minGrade, setMinGrade] = useState<Grade>("V0");
  const [maxGrade, setMaxGrade] = useState<Grade>("V5");
  const [sessionPlan, setSessionPlan] = useState<SessionPlan | null>(null);

  const handleMinGradeChange = (grade: Grade) => {
    setMinGrade(grade);
    // Ensure max grade is not lower than min grade
    if (GRADES.indexOf(grade) > GRADES.indexOf(maxGrade)) {
      setMaxGrade(grade);
    }
  };

  const handleMaxGradeChange = (grade: Grade) => {
    setMaxGrade(grade);
    // Ensure min grade is not higher than max grade
    if (GRADES.indexOf(grade) < GRADES.indexOf(minGrade)) {
      setMinGrade(grade);
    }
  };

  const generateSession = (e: FormEvent) => {
    e.preventDefault();
    const plan = generateSessionPlan(mood, goal, minGrade, maxGrade);
    setSessionPlan(plan);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>KilterCoach</h1>

      <form onSubmit={generateSession} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>How are you feeling today?</label>
          <div className={styles.radioGroup}>
            {(["Fresh", "Normal", "Tired"] as Mood[]).map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={`mood-${option}`}
                  name="mood"
                  value={option}
                  checked={mood === option}
                  onChange={(e) => setMood(e.target.value as Mood)}
                  className={styles.radioInput}
                />
                <label htmlFor={`mood-${option}`} className={styles.radioLabel}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            What&apos;s your goal for today?
          </label>
          <div className={styles.radioGroup}>
            {(["Power", "Technique", "Endurance", "Fun"] as Goal[]).map(
              (option) => (
                <div key={option}>
                  <input
                    type="radio"
                    id={`goal-${option}`}
                    name="goal"
                    value={option}
                    checked={goal === option}
                    onChange={(e) => setGoal(e.target.value as Goal)}
                    className={styles.radioInput}
                  />
                  <label
                    htmlFor={`goal-${option}`}
                    className={styles.radioLabel}
                  >
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Grade Range</label>
          <div className={styles.gradeRange}>
            <div>
              <label className={styles.gradeLabel}>Minimum Grade</label>
              <div className={styles.gradeSelectWrapper}>
                <select
                  className={styles.gradeSelect}
                  value={minGrade}
                  onChange={(e) =>
                    handleMinGradeChange(e.target.value as Grade)
                  }
                >
                  {GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={styles.gradeLabel}>Maximum Grade</label>
              <div className={styles.gradeSelectWrapper}>
                <select
                  className={styles.gradeSelect}
                  value={maxGrade}
                  onChange={(e) =>
                    handleMaxGradeChange(e.target.value as Grade)
                  }
                >
                  {GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Generate Session
        </button>
      </form>

      {sessionPlan && (
        <div className={styles.sessionPlan}>
          <h2 className={styles.sectionTitle}>Warm-up</h2>
          <ul className={styles.warmupList}>
            {sessionPlan.warmups.map((warmup, index) => (
              <li key={index}>{warmup}</li>
            ))}
          </ul>

          <h2 className={styles.sectionTitle}>Main Session</h2>
          <div className={styles.climbCards}>
            {sessionPlan.climbs.map((climb, index) => (
              <div key={index} className={styles.climbCard}>
                <h3>
                  {climb.name}{" "}
                  <span className={styles.climbGrade}>({climb.grade})</span>
                </h3>
                <p>{climb.description}</p>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Technique Drill</h2>
          <div className={styles.drill}>{sessionPlan.drill}</div>
        </div>
      )}
    </main>
  );
}
