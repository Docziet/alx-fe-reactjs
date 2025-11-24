import { useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id, 10);

  // Zustand selectors
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  const recipeDetails = useRecipeStore((state) => state.recipeDetails);
  const setRecipeDetails = useRecipeStore((state) => state.setRecipeDetails);

  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  // Handle case where recipe is missing
  if (!recipe) return <p>Recipe not found.</p>;

  const isFavorite = favorites.includes(recipeId);

  // Save full recipe details into store when visiting the page
  if (recipeDetails?.id !== recipeId) {
    setRecipeDetails(recipe);
    generateRecommendations();
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <button
        onClick={() =>
          isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe.id)
        }
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />

      {/* Recommended Recipes */}
      <h2>Recommended Recipes</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        <ul>
          {recommendations.map((rec) => (
            <li key={rec.id}>
              <strong>{rec.title}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeDetails;
