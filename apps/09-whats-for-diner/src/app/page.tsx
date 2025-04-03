"use client";

import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import RecipeResult from "@/components/RecipeResult";
import styles from "./page.module.css";
import { Recipe } from "@/types/recipe";

type FormData = {
  protein: string;
  carb: string;
  vegetables: string[];
  cuisine: string;
  time: number;
};

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      setRecipe(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate recipe"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>What&apos;s for Dinner?</h1>
        <p>Select your ingredients and preferences to generate a recipe</p>
      </header>

      <RecipeForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error && <div className={styles.error}>{error}</div>}

      {recipe && <RecipeResult recipe={recipe} />}
    </div>
  );
}
