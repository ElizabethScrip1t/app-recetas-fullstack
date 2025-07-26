import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeForm from './RecipeForm';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/recipes');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("No se pudieron cargar las recetas. Asegúrate de que el backend está corriendo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleRecipeAdded = (updatedOrNewRecipe) => {
    if (updatedOrNewRecipe.id && recipes.some(r => r.id === updatedOrNewRecipe.id)) {
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === updatedOrNewRecipe.id ? updatedOrNewRecipe : recipe
        )
      );
    } else {
      setRecipes((prevRecipes) => [...prevRecipes, updatedOrNewRecipe]);
    }
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/recipes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
      console.log(`Receta con ID ${id} eliminada.`);

    } catch (error) {
      console.error("Error al eliminar receta:", error);
      alert(`Error al eliminar la receta: ${error.message}`);
    }
  };

  const handleEditClick = (recipeToEdit) => {
    setEditingRecipe(recipeToEdit);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  if (loading) {
    return <div className="App">Cargando recetas...</div>;
  }

  if (error) {
    return <div className="App" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="main-app-title">Mis Recetas</h1> {/* Agregué la clase aquí */}
        <button
          onClick={() => {
            setShowForm(true);
            setEditingRecipe(null);
          }}
        >
          Añadir Nueva Receta
        </button>
      </header>
      <main>
        {showForm ? (
          <RecipeForm onRecipeAdded={handleRecipeAdded} onCancel={handleCancelForm} initialRecipe={editingRecipe} />
        ) : (
          recipes.length === 0 ? (
            <p>No hay recetas disponibles. ¡Crea una!</p>
          ) : (
            <> {/* Fragmento para incluir un título de sección */}
              <h2 className="main-section-title">Recetas Destacadas</h2> {/* Nuevo título de sección */}
              <div className="recipes-list">
                {recipes.map(recipe => (
                  <div key={recipe.id} className="recipe-card"> {/* Eliminé el style en línea */}
                    {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />} {/* Eliminé el style en línea */}
                    <h2>{recipe.title}</h2>
                    <p><strong>Categoría:</strong> {recipe.category}</p>
                    <p>{recipe.description}</p>
                    <h3>Ingredientes:</h3>
                    <p>{recipe.ingredients}</p>
                    <h3>Instrucciones:</h3>
                    <p>{recipe.instructions}</p>
                    <div className="button-group"> {/* Agregué la clase aquí y eliminé el style en línea */}
                      <button
                        onClick={() => handleEditClick(recipe)}
                        className="edit-button" // Agregué la clase aquí
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteRecipe(recipe.id)}
                        className="delete-button" // Agregué la clase aquí
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </main>
    </div>
  );
}

export default App;