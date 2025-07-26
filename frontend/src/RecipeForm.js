import React, { useState, useEffect } from 'react';

function RecipeForm({ onRecipeAdded, onCancel, initialRecipe }) {
  const [title, setTitle] = useState(initialRecipe ? initialRecipe.title : '');
  const [description, setDescription] = useState(initialRecipe ? initialRecipe.description : '');
  const [ingredients, setIngredients] = useState(initialRecipe ? initialRecipe.ingredients : '');
  const [instructions, setInstructions] = useState(initialRecipe ? initialRecipe.instructions : '');
  const [category, setCategory] = useState(initialRecipe ? initialRecipe.category : '');
  const [imageUrl, setImageUrl] = useState(initialRecipe ? initialRecipe.image_url : '');
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    if (initialRecipe) {
      setTitle(initialRecipe.title || '');
      setDescription(initialRecipe.description || '');
      setIngredients(initialRecipe.ingredients || '');
      setInstructions(initialRecipe.instructions || '');
      setCategory(initialRecipe.category || '');
      setImageUrl(initialRecipe.image_url || '');
    } else {
      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      setCategory('');
      setImageUrl('');
    }
    setSubmitStatus('');
  }, [initialRecipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitStatus('Enviando...');

    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      category,
      image_url: imageUrl
    };

    let url = 'http://localhost:5000/recipes';
    let method = 'POST';

    if (initialRecipe && initialRecipe.id) {
      url = `${url}/${initialRecipe.id}`;
      method = 'PUT';
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const resultRecipe = await response.json();
      setSubmitStatus(`¡Receta ${initialRecipe ? 'actualizada' : 'añadida'} con éxito!`);
      
      onRecipeAdded(resultRecipe);
      
      if (!initialRecipe) {
        setTitle('');
        setDescription('');
        setIngredients('');
        setInstructions('');
        setCategory('');
        setImageUrl('');
      }

    } catch (error) {
      console.error(`Error al ${initialRecipe ? 'actualizar' : 'añadir'} receta:`, error);
      setSubmitStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="recipe-form-container"> {/* Eliminé el style en línea */}
      <h2>{initialRecipe ? 'Editar Receta' : 'Añadir Nueva Receta'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /> {/* Eliminé el style en línea */}
        </label>
        <label>
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required /> {/* Eliminé el style en línea */}
        </label>
        <label>
          Ingredientes (separados por comas):
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required /> {/* Eliminé el style en línea */}
        </label>
        <label>
          Instrucciones:
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required /> {/* Eliminé el style en línea */}
        </label>
        <label>
          Categoría (Opcional):
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /> {/* Eliminé el style en línea */}
        </label>
        <label>
          URL de la Imagen (Opcional):
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /> {/* Eliminé el style en línea */}
        </label>
        <div className="button-group-form"> {/* Agregué la clase aquí y eliminé el style en línea */}
          <button type="submit">
            {initialRecipe ? 'Actualizar Receta' : 'Añadir Receta'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
      {submitStatus && <p className={`submit-status ${submitStatus.startsWith('Error') ? 'error' : 'success'}`}>{submitStatus}</p>} {/* Agregué la clase dinámica aquí */}
    </div>
  );
}

export default RecipeForm;