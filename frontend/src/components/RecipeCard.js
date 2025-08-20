import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function RecipeCard({ recipe, onEdit, onDelete }) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
      </Link>

      <div className="button-group">
        <button className="edit-button" onClick={() => onEdit(recipe)}>Editar</button>
        <button className="delete-button" onClick={() => onDelete(recipe.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default RecipeCard;