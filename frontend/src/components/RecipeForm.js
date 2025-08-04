import React, { useState, useEffect } from 'react';

function RecipeForm({ recipe, onRecipeAdded, onRecipeUpdated, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Lista de categorías para el menú desplegable
  const categories = ['Postres', 'Platos Fuertes', 'Desayunos', 'Ensaladas', 'Bebidas'];

  useEffect(() => {
    if (recipe) {
      // Modo de Edición
      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
      setCategory(recipe.category || '');
      setImageUrl(recipe.image_url || '');
    } else {
      // Modo de Añadir: Inicializa el campo de categoría con la primera opción de la lista
      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      setCategory(categories[0]); // Selecciona la primera categoría por defecto
      setImageUrl('');
    }
    setStatusMessage('');
  }, [recipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegúrate de que la categoría esté seleccionada
    if (!category) {
        setStatusMessage('Por favor, selecciona una categoría.');
        setIsSuccess(false);
        return;
    }

    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      category,
      image_url: imageUrl,
    };

    try {
      let response;
      if (recipe) {
        // Modo de Edición
        response = await fetch(`http://localhost:5000/recipes/${recipe.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeData),
        });
      } else {
        // Modo de Añadir
        response = await fetch('http://localhost:5000/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setStatusMessage(`Receta ${recipe ? 'actualizada' : 'añadida'} con éxito!`);
      setIsSuccess(true);

      setTimeout(() => {
        if (recipe) {
          onRecipeUpdated(result);
        } else {
          onRecipeAdded(result);
        }
      }, 1500);
    } catch (error) {
      console.error("Error al guardar la receta:", error);
      setStatusMessage(`Error: ${error.message}`);
      setIsSuccess(false);
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>{recipe ? 'Editar Receta' : 'Añadir Nueva Receta'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Ingredientes (separados por comas):
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </label>
        <label>
          Instrucciones:
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </label>
        {/* NUEVO: Campo de categoría con select desplegable */}
        <label>
          Categoría:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Selecciona una categoría</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        {/* Fin del nuevo campo */}
        <label>
          URL de la Imagen (opcional):
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <div className="button-group-form">
          <button type="submit">{recipe ? 'Actualizar Receta' : 'Añadir Receta'}</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
      {statusMessage && (
        <p className={`submit-status ${isSuccess ? 'success' : 'error'}`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default RecipeForm;