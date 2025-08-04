import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeForm from './components/RecipeForm';
import RecipeCard from './components/RecipeCard';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/recipes';
      if (selectedCategory) {
        url += `?category=${encodeURIComponent(selectedCategory)}`;
      }
      const response = await fetch(url);
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
  }, [selectedCategory]);

  const handleRecipeAdded = (newRecipe) => {
    fetchRecipes();
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleRecipeUpdated = (updatedRecipe) => {
    fetchRecipes();
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleRecipeDeleted = () => {
    fetchRecipes();
  };

  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/melove-logo.png" alt="Melove Recetas Logo" className="app-logo" />

        <button
          onClick={() => {
            setShowForm(true);
            setEditingRecipe(null);
            setSelectedCategory(null);
          }}
        >
          Añadir Nueva Receta
        </button>

        <div className="categories-bar">
          <span
            className={`category-item ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Todas
          </span>
          <span
            className={`category-item ${selectedCategory === 'Postres' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Postres')}
          >
            Postres
          </span>
          <span
            className={`category-item ${selectedCategory === 'Platos Fuertes' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Platos Fuertes')}
          >
            Platos Fuertes
          </span>
          <span
            className={`category-item ${selectedCategory === 'Desayunos' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Desayunos')}
          >
            Desayunos
          </span>
          <span
            className={`category-item ${selectedCategory === 'Ensaladas' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Ensaladas')}
          >
            Ensaladas
          </span>
          <span
            className={`category-item ${selectedCategory === 'Bebidas' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Bebidas')}
          >
            Bebidas
          </span>
        </div>
      </header>

      <main>
        {showForm && (
          <RecipeForm
            recipe={editingRecipe}
            onRecipeAdded={handleRecipeAdded}
            onRecipeUpdated={handleRecipeUpdated}
            onCancel={handleCancelForm}
          />
        )}
        <h2 className="main-section-title">Recetas Destacadas</h2>
        {loading && <p>Cargando recetas...</p>}
        {error && <p className="submit-status error">{error}</p>}
        {!loading && !error && recipes.length === 0 && <p>No hay recetas disponibles. ¡Añade una!</p>}
        <div className="recipes-list">
          {!loading && !error && recipes.length > 0 && recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={handleEditClick}
              onDelete={handleRecipeDeleted}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;