"use client";

import { useState } from "react";
import styles from "./RecipeForm.module.css";
import ComboboxInput from "./ComboboxInput";
import RecipeResult from "./RecipeResult";

type FormData = {
  protein: string;
  carb: string;
  vegetables: string[];
  cuisine: string;
  time: number;
};

const PROTEINS = ["Chicken", "Beef", "Fish", "Tofu", "Pork", "Shrimp"];
const CARBS = ["Rice", "Pasta", "Potatoes", "Quinoa", "Noodles", "Bread"];
const VEGETABLES = [
  "Broccoli",
  "Carrots",
  "Bell Peppers",
  "Spinach",
  "Mushrooms",
  "Onions",
  "Zucchini",
  "Green Beans",
  "Other",
];
const CUISINES = [
  "Italian",
  "Thai",
  "Mexican",
  "Indian",
  "Chinese",
  "Japanese",
  "Mediterranean",
  "French",
];

type Props = {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
};

export default function RecipeForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<FormData>({
    protein: PROTEINS[0],
    carb: CARBS[0],
    vegetables: [],
    cuisine: CUISINES[0],
    time: 30,
  });
  const [customVegetable, setCustomVegetable] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      vegetables: formData.vegetables
        .map((v) => (v === "Other" ? customVegetable : v))
        .filter((v) => v !== ""), // Remove empty custom inputs
    };
    onSubmit(processedData);
  };

  const handleVegetableChange = (vegetable: string) => {
    setFormData((prev) => ({
      ...prev,
      vegetables: prev.vegetables.includes(vegetable)
        ? prev.vegetables.filter((v) => v !== vegetable)
        : [...prev.vegetables, vegetable],
    }));
  };

  const handleSurpriseMe = () => {
    // Filter out 'Other' from vegetables list
    const validVegetables = VEGETABLES.filter((v) => v !== "Other");

    // Generate random selections
    const randomProtein = PROTEINS[Math.floor(Math.random() * PROTEINS.length)];
    const randomCarb = CARBS[Math.floor(Math.random() * CARBS.length)];
    const numVegetables = Math.floor(Math.random() * 3) + 1; // 1-3 vegetables
    const randomVegetables = Array.from({ length: numVegetables }, () => {
      const index = Math.floor(Math.random() * validVegetables.length);
      return validVegetables[index];
    });
    const randomCuisine = CUISINES[Math.floor(Math.random() * CUISINES.length)];
    const randomTime = Math.floor(Math.random() * 120) + 15; // 15-135 minutes

    // Use the same onSubmit handler as the form
    onSubmit({
      protein: randomProtein,
      carb: randomCarb,
      vegetables: randomVegetables,
      cuisine: randomCuisine,
      time: randomTime,
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <ComboboxInput
            id="protein"
            label="Protein:"
            options={PROTEINS}
            value={formData.protein}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, protein: value }))
            }
          />
        </div>

        <div className={styles.formGroup}>
          <ComboboxInput
            id="carb"
            label="Carb:"
            options={CARBS}
            value={formData.carb}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, carb: value }))
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label>Vegetables:</label>
          <div className={styles.checkboxGroup}>
            {VEGETABLES.map((vegetable) => (
              <label key={vegetable} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.vegetables.includes(vegetable)}
                  onChange={() => handleVegetableChange(vegetable)}
                />
                {vegetable}
              </label>
            ))}
          </div>
          {formData.vegetables.includes("Other") && (
            <input
              type="text"
              placeholder="Enter vegetable"
              value={customVegetable}
              onChange={(e) => setCustomVegetable(e.target.value)}
              className={styles.customVegetableInput}
              required
            />
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cuisine">Cuisine:</label>
          <select
            id="cuisine"
            value={formData.cuisine}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, cuisine: e.target.value }))
            }
          >
            {CUISINES.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time">Time to Cook (minutes):</label>
          <input
            type="number"
            id="time"
            min="5"
            max="180"
            value={formData.time}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                time: parseInt(e.target.value),
              }))
            }
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.button}
            disabled={
              isLoading ||
              formData.vegetables.length === 0 ||
              (formData.vegetables.includes("Other") && !customVegetable)
            }
          >
            {isLoading ? "Generating Recipe..." : "Generate Recipe"}
          </button>
          <button
            type="button"
            className={styles.surpriseButton}
            onClick={handleSurpriseMe}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "✨ Surprise Me!"}
          </button>
        </div>
      </form>
    </div>
  );
}
