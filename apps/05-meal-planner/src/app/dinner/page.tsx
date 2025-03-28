"use client";

import { useState, useEffect, useCallback } from "react";
import { PantryItem, getUserPreferences, getPantryItems } from "@/lib/supabase";
import { Button } from "@/components/Button";
import { generateDinnerIdeas, RecipeFilter } from "@/lib/openai";

type Recipe = {
  name: string;
  description: string;
  ingredients: string[];
  missingIngredients?: string[];
  cookingTime: string;
  instructions: string[];
};

type RecipeResponse = {
  recipes: Recipe[];
};

export default function DinnerPage() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<RecipeFilter>({
    maxCookingTime: 30,
    cuisine: "",
    protein: "",
    carbs: "",
  });

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [pantryData, preferencesData] = await Promise.all([
        getPantryItems(),
        getUserPreferences(),
      ]);

      setPantryItems(pantryData);

      // Auto-generate if we have pantry items
      if (pantryData.length > 0) {
        generateRecipes(pantryData, preferencesData, filters);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generateRecipes = async (
    items = pantryItems,
    prefs = null,
    recipeFilters = filters
  ) => {
    if (items.length === 0) {
      setError("Please add some items to your pantry first");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);

      const response = await generateDinnerIdeas(items, prefs, recipeFilters);
      const data = response as RecipeResponse;

      if (data.recipes && data.recipes.length > 0) {
        setRecipes(data.recipes);
      } else {
        setError(
          "No recipes could be generated. Try different filters or add more pantry items."
        );
      }
    } catch (error) {
      console.error("Error generating recipes:", error);
      setError("Failed to generate recipe ideas");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFilterChange = (key: keyof RecipeFilter, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    fetchData();
    setShowFilters(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-2">What's for Dinner?</h1>
      <p className="text-gray-600 mb-6">
        Discover recipe ideas based on your pantry items and preferences
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="secondary"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <Button
            onClick={() => generateRecipes()}
            disabled={isGenerating || pantryItems.length === 0}
          >
            Try Something Else
          </Button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <h2 className="font-semibold mb-3">Filters</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Max Cooking Time: {filters.maxCookingTime} minutes
                </label>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={filters.maxCookingTime}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxCookingTime",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Cuisine
                </label>
                <select
                  value={filters.cuisine || ""}
                  onChange={(e) =>
                    handleFilterChange("cuisine", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Any Cuisine</option>
                  <option value="Italian">Italian</option>
                  <option value="Asian">Asian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Protein
                </label>
                <select
                  value={filters.protein || ""}
                  onChange={(e) =>
                    handleFilterChange("protein", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Any Protein</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Beef">Beef</option>
                  <option value="Pork">Pork</option>
                  <option value="Fish">Fish</option>
                  <option value="Plant-based">Plant-based</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Carbs</label>
                <select
                  value={filters.carbs || ""}
                  onChange={(e) => handleFilterChange("carbs", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Any Carbs</option>
                  <option value="Rice">Rice</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Potatoes">Potatoes</option>
                  <option value="Bread">Bread</option>
                  <option value="Low-carb">Low-carb</option>
                </select>
              </div>

              <Button onClick={applyFilters} fullWidth>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {isLoading || isGenerating ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600 mb-2"></div>
          <p>{isLoading ? "Loading..." : "Generating dinner ideas..."}</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {pantryItems.length === 0
            ? "Add some items to your pantry to get recipe suggestions"
            : "No recipes found. Try different filters."}
        </div>
      ) : (
        <div className="space-y-8">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              <div className="bg-emerald-50 p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-emerald-800">
                  {recipe.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {recipe.description}
                </p>
              </div>

              <div className="p-4">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {recipe.cookingTime}
                  </span>
                  <span className="text-emerald-600">
                    {recipe.missingIngredients?.length
                      ? `Missing ${recipe.missingIngredients.length} ingredients`
                      : "All ingredients available!"}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-medium mb-2">Ingredients</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li
                        key={i}
                        className={
                          recipe.missingIngredients?.includes(ingredient)
                            ? "text-gray-400"
                            : "text-gray-700"
                        }
                      >
                        {ingredient}
                        {recipe.missingIngredients?.includes(ingredient) &&
                          " (missing)"}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-md font-medium mb-2">Instructions</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    {recipe.instructions.map((step, i) => (
                      <li key={i} className="text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
