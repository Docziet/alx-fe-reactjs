import { useParams } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import { EditRecipeForm } from "./EditRecipeForm";
import { DeleteRecipeButton } from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients?.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>

      <hr />

      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
