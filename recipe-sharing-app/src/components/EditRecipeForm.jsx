import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [form, setForm] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients.join(", "),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateRecipe(recipe.id, {
      title: form.title,
      description: form.description,
      ingredients: form.ingredients.split(",").map((s) => s.trim()),
    });

    alert("Recipe updated!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Recipe</h3>

      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        placeholder="Comma separated ingredients"
      />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
