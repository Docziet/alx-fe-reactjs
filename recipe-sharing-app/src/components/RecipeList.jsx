import { useRecipeStore } from "../store/recipeStore";

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Recipes</h2>

      {recipes.length === 0 ? (
        <p>No recipes added yet.</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
