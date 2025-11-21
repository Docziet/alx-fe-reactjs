import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

function AddRecipeForm() {
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addRecipe({
      id: Date.now(),
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h2>Add New Recipe</h2>

      <input
        type="text"
        placeholder="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px" }}
      />

      <textarea
        placeholder="Recipe description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;
