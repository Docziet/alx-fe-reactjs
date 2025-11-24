import { useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id, 10);

  // Fetch recipe details
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  // Favorites
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  // Recommendations
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  if (!recipe) return <p>recipeDetails: Recipe not found.</p>;

  const isFavorite = favorites.includes(recipeId);

  return (
    <div className="recipeDetails">
      {/* Main recipe details */}
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {/* Favorite Button */}
      <button
        onClick={() =>
          isFavorite ? removeFavorite(recipeId) : addFavorite(recipeId)
        }
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      {/* Edit & Delete */}
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipeId} />

      {/* Recommendations Section */}
      <div style={{ marginTop: "20px" }}>
        <h2>Recommended Recipes</h2>

        <button onClick={generateRecommendations}>Refresh Recommendations</button>

        {recommendations.length === 0 ? (
          <p>No recommendations available yet.</p>
        ) : (
          <ul>
            {recommendations
              .filter((rec) => rec.id !== recipeId) /* avoid self */
              .map((rec) => (
                <li key={rec.id}>
                  <h3>{rec.title}</h3>
                  <p>{rec.description}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
