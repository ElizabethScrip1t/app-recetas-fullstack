import React, { useState } from 'react';

function RecipeForm({ onRecipeAdded, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); // Para mensajes de éxito/error

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    setSubmitStatus('Enviando...'); // Mensaje de carga

    const newRecipe = {
      title,
      description,
      ingredients,
      instructions,
      category,
      image_url: imageUrl // Coincide con el nombre del campo en el backend
    };

    try {
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const addedRecipe = await response.json();
      setSubmitStatus('¡Receta añadida con éxito!');
      // Limpiar el formulario
      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      setCategory('');
      setImageUrl('');
      // Llamar a la función del padre para actualizar la lista de recetas
      onRecipeAdded(addedRecipe);
    } catch (error) {
      console.error("Error al añadir receta:", error);
      setSubmitStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="recipe-form-container" style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2>Añadir Nueva Receta</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </label>
        <label>
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '80px' }} />
        </label>
        <label>
          Ingredientes (separados por comas):
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '80px' }} />
        </label>
        <label>
          Instrucciones:
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '100px' }} />
        </label>
        <label>
          Categoría (Opcional):
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </label>
        <label>
          URL de la Imagen (Opcional):
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </label>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Añadir Receta</button>
          <button type="button" onClick={onCancel} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>
        </div>
      </form>
      {submitStatus && <p style={{ marginTop: '15px', color: submitStatus.startsWith('Error') ? 'red' : 'green' }}>{submitStatus}</p>}
    </div>
  );
}

export default RecipeForm;