"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { getMealPlans, saveMealPlan } from "@/lib/supabase";
import { format, startOfWeek, addDays, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

type MealType = "breakfast" | "lunch" | "dinner";

type DayPlan = {
  [key in MealType]: string;
};

type WeekPlan = {
  [key: string]: DayPlan;
};

export default function PlanPage() {
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    return startOfWeek(today, { weekStartsOn: 1 }); // Monday as start of week
  });

  const [plan, setPlan] = useState<WeekPlan>(() => {
    // Initialize empty plan for each day of the week
    const initialPlan: WeekPlan = {};
    for (let i = 0; i < 7; i++) {
      const day = format(addDays(weekStart, i), "yyyy-MM-dd");
      initialPlan[day] = {
        breakfast: "",
        lunch: "",
        dinner: "",
      };
    }
    return initialPlan;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedPlans, setSavedPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        setIsLoading(true);
        const plans = await getMealPlans();
        setSavedPlans(plans);

        // If there's a plan for the current week, load it
        const currentWeekString = format(weekStart, "yyyy-MM-dd");
        const currentPlan = plans.find(
          (p) => p.week_start === currentWeekString
        );

        if (currentPlan) {
          setPlan(currentPlan.plan_data);
        }
      } catch (error) {
        console.error("Error fetching meal plans:", error);
        setError("Failed to load your meal plans");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlans();
  }, [weekStart]);

  const handleMealChange = (day: string, mealType: MealType, value: string) => {
    setPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const weekStartString = format(weekStart, "yyyy-MM-dd");
      await saveMealPlan({
        id: uuidv4(), // Generate a UUID for the plan
        week_start: weekStartString,
        plan_data: plan,
      });

      alert("Meal plan saved successfully!");
    } catch (error) {
      console.error("Error saving meal plan:", error);
      setError("Failed to save your meal plan");
    } finally {
      setIsSaving(false);
    }
  };

  const renderDayColumn = (dayOffset: number) => {
    const day = addDays(weekStart, dayOffset);
    const dayString = format(day, "yyyy-MM-dd");
    const dayName = format(day, "EEEE");
    const dayDate = format(day, "MMM d");

    return (
      <div className="flex flex-col space-y-4">
        <div className="text-center">
          <div className="font-semibold">{dayName}</div>
          <div className="text-sm text-gray-500">{dayDate}</div>
        </div>

        <div className="space-y-2">
          {(["breakfast", "lunch", "dinner"] as MealType[]).map((mealType) => (
            <div key={mealType} className="min-h-28">
              <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                {mealType}
              </label>
              <textarea
                value={plan[dayString]?.[mealType] || ""}
                onChange={(e) =>
                  handleMealChange(dayString, mealType, e.target.value)
                }
                placeholder={`${mealType} plan...`}
                className="w-full p-2 border border-gray-300 rounded text-sm min-h-16 resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const loadSavedPlan = (planIndex: number) => {
    const savedPlan = savedPlans[planIndex];
    if (savedPlan) {
      setPlan(savedPlan.plan_data);
      setWeekStart(parseISO(savedPlan.week_start));
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Weekly Meal Plan</h1>

          <div className="flex gap-4">
            {savedPlans.length > 0 && (
              <select
                className="border border-gray-300 rounded p-2"
                onChange={(e) => loadSavedPlan(parseInt(e.target.value))}
                defaultValue=""
              >
                <option value="" disabled>
                  Load saved plan
                </option>
                {savedPlans.map((savedPlan, index) => (
                  <option key={savedPlan.id} value={index}>
                    Week of{" "}
                    {format(parseISO(savedPlan.week_start), "MMMM d, yyyy")}
                  </option>
                ))}
              </select>
            )}

            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Plan"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600 mb-2"></div>
            <p>Loading meal plan...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
            <div className="grid grid-cols-7 gap-4 min-w-[1000px]">
              {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) =>
                renderDayColumn(dayOffset)
              )}
            </div>
          </div>
        )}

        <div className="mt-6 bg-emerald-50 rounded-lg p-4 text-sm">
          <h2 className="font-semibold text-emerald-800 mb-2">
            Tips for Meal Planning
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-emerald-700">
            <li>Plan for leftovers to reduce cooking time</li>
            <li>Prep ingredients for multiple meals at once</li>
            <li>Consider batch cooking on weekends</li>
            <li>Check your pantry before grocery shopping</li>
            <li>Include a variety of food groups in each meal</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
