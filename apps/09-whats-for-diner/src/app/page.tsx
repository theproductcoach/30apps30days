"use client";

import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import RecipeResult from "@/components/RecipeResult";
import styles from "./page.module.css";

export default function Home() {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/recipe", {
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
      setError("Failed to generate recipe. Please try again.");
      console.error("Error:", err);
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
