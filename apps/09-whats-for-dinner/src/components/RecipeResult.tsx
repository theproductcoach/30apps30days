import styles from "./RecipeResult.module.css";
import { Recipe } from "@/types/recipe";

type Props = {
  recipe: Recipe;
};

export default function RecipeResult({ recipe }: Props) {
  const formattedName = recipe.name.replace(/^\[|\]$/g, "");

  return (
    <div className={styles.recipe}>
      <h2 className={styles.title}>{formattedName}</h2>
      <p className={styles.description}>{recipe.description}</p>

      <div className={styles.section}>
        <h2>Shopping List</h2>
        <div className={styles.ingredients}>
          {recipe.ingredients.proteins.length > 0 && (
            <div className={styles.ingredientGroup}>
              <h3>Proteins</h3>
              <ul>
                {recipe.ingredients.proteins.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {recipe.ingredients.carbs.length > 0 && (
            <div className={styles.ingredientGroup}>
              <h3>Carbs</h3>
              <ul>
                {recipe.ingredients.carbs.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {recipe.ingredients.vegetables.length > 0 && (
            <div className={styles.ingredientGroup}>
              <h3>Vegetables</h3>
              <ul>
                {recipe.ingredients.vegetables.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {recipe.ingredients.other.length > 0 && (
            <div className={styles.ingredientGroup}>
              <h3>Other Ingredients</h3>
              <ul>
                {recipe.ingredients.other.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Instructions</h2>
        <div className={styles.instructions}>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
