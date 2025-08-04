import React from 'react';
import '../App.css';// Importa los estilos de la aplicación

function RecipeCard({ recipe, onEdit, onDelete }) {
  return (
    <div className="recipe-card">
      <div className="recipe-header-content">
        <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
        <div className="recipe-description-area">
            <h2>{recipe.title}</h2>
            <p><strong>Categoría:</strong> {recipe.category}</p>
            <p>{recipe.description}</p>
        </div>
      </div>

      <h3>Ingredientes:</h3>
      <p>{recipe.ingredients}</p>

      <h3>Instrucciones:</h3>
      <p>{recipe.instructions}</p>

      <div className="button-group">
        <button className="edit-button" onClick={() => onEdit(recipe)}>Editar</button>
        <button className="delete-button" onClick={() => onDelete(recipe.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default RecipeCard;