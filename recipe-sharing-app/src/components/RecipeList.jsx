import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes);
  const allRecipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const listToDisplay =
    searchTerm.trim().length > 0 ? recipes : allRecipes;

  return (
    <div>
      {listToDisplay.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: "20px" }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
