import styles from "./RecipeResult.module.css";

type IngredientList = {
  proteins: string[];
  carbs: string[];
  vegetables: string[];
  other: string[];
};

type Recipe = {
  name: string;
  description: string;
  ingredients: IngredientList;
  instructions: string[];
};

type Props = {
  recipe: Recipe;
};

export default function RecipeResult({ recipe }: Props) {
  const title = recipe.name.replace(/^\[|\]$/g, "");

  return (
    <div className={styles.recipe}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{recipe.description}</p>

      <section className={styles.section}>
        <h2>Shopping List</h2>
        <div className={styles.ingredients}>
          <div className={styles.ingredientGroup}>
            <h3>Proteins</h3>
            <ul>
              {recipe.ingredients.proteins.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.ingredientGroup}>
            <h3>Carbs</h3>
            <ul>
              {recipe.ingredients.carbs.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.ingredientGroup}>
            <h3>Vegetables</h3>
            <ul>
              {recipe.ingredients.vegetables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.ingredientGroup}>
            <h3>Other</h3>
            <ul>
              {recipe.ingredients.other.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Instructions</h2>
        <ol className={styles.instructions}>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
