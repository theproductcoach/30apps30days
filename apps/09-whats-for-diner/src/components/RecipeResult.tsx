import styles from "./RecipeResult.module.css";
import { Recipe } from "@/types/recipe";

type Props = {
  recipe: Recipe;
};

export default function RecipeResult({ recipe }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{recipe.name}</h2>
      <p className={styles.description}>{recipe.description}</p>

      <div className={styles.ingredients}>
        <h3>Shopping List</h3>
        {recipe.ingredients.proteins.length > 0 && (
          <div className={styles.ingredientGroup}>
            <h4>Proteins</h4>
            <ul>
              {recipe.ingredients.proteins.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {recipe.ingredients.carbs.length > 0 && (
          <div className={styles.ingredientGroup}>
            <h4>Carbs</h4>
            <ul>
              {recipe.ingredients.carbs.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {recipe.ingredients.vegetables.length > 0 && (
          <div className={styles.ingredientGroup}>
            <h4>Vegetables</h4>
            <ul>
              {recipe.ingredients.vegetables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {recipe.ingredients.other.length > 0 && (
          <div className={styles.ingredientGroup}>
            <h4>Other Ingredients</h4>
            <ul>
              {recipe.ingredients.other.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.instructions}>
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
