"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/Button";
import { saveUserPreferences } from "@/lib/supabase";

type Question = {
  id: string;
  text: string;
  yesOption: string;
  noOption: string;
  preference: keyof UserPreferences;
};

type UserPreferences = {
  likes_asian: boolean;
  dislikes_pork: boolean;
  vegetarian: boolean;
};

const questions: Question[] = [
  {
    id: "q1",
    text: "Do you enjoy Asian cuisine?",
    yesOption: "Love it!",
    noOption: "Not really",
    preference: "likes_asian",
  },
  {
    id: "q2",
    text: "Do you dislike eating pork?",
    yesOption: "Yes, avoid it",
    noOption: "No, it's fine",
    preference: "dislikes_pork",
  },
  {
    id: "q3",
    text: "Are you vegetarian?",
    yesOption: "Yes",
    noOption: "No",
    preference: "vegetarian",
  },
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    likes_asian: false,
    dislikes_pork: false,
    vegetarian: false,
  });
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSwipe = (isYes: boolean) => {
    setDirection(isYes ? "right" : "left");

    // Update preferences
    setPreferences((prev) => ({
      ...prev,
      [currentQuestion.preference]: isYes,
    }));

    // Wait for animation
    setTimeout(() => {
      setDirection(null);
      if (isLastQuestion) {
        handleSubmit();
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 300);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(false),
    onSwipedRight: () => handleSwipe(true),
    trackMouse: true,
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await saveUserPreferences(preferences);
      router.push("/pantry");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      alert("Failed to save your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Food Preferences</h1>

      <div className="relative h-80 w-full mb-8">
        <div
          {...swipeHandlers}
          className="absolute inset-0 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: 1,
                x:
                  direction === "left" ? -300 : direction === "right" ? 300 : 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 w-full h-full flex flex-col items-center justify-center text-center border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-6">
                {currentQuestion.text}
              </h2>
              <div className="text-sm text-gray-500 mb-6">
                Swipe right for Yes, left for No
              </div>
              <div className="flex w-full justify-between text-sm">
                <div className="bg-red-50 p-3 rounded-lg text-red-600">
                  ← {currentQuestion.noOption}
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-green-600">
                  {currentQuestion.yesOption} →
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => handleSwipe(false)}
          variant="secondary"
          className="w-1/3"
        >
          No
        </Button>
        <Button
          onClick={() => handleSwipe(true)}
          variant="primary"
          className="w-1/3"
        >
          Yes
        </Button>
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentQuestionIndex
                  ? "bg-emerald-600"
                  : index < currentQuestionIndex
                  ? "bg-emerald-300"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
