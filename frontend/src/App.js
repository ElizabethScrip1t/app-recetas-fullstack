import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeForm from './RecipeForm'; // Importar el nuevo componente del formulario

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Nuevo estado para mostrar/ocultar el formulario

  // Función para obtener las recetas de tu API de Flask
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
    fetchRecipes(); // Llamar a la función al montar el componente
  }, []);

  // Función para manejar cuando una receta es añadida exitosamente
  const handleRecipeAdded = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]); // Añadir la nueva receta a la lista existente
    setShowForm(false); // Ocultar el formulario después de añadir
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
        <h1>Mis Recetas</h1>
        <button onClick={() => setShowForm(true)} style={{ padding: '10px 20px', fontSize: '1em', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Añadir Nueva Receta
        </button>
      </header>
      <main>
        {showForm ? (
          <RecipeForm onRecipeAdded={handleRecipeAdded} onCancel={() => setShowForm(false)} />
        ) : (
          recipes.length === 0 ? (
            <p>No hay recetas disponibles. ¡Crea una!</p>
          ) : (
            <div className="recipes-list">
              {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                  <h2>{recipe.title}</h2>
                  <p><strong>Categoría:</strong> {recipe.category}</p>
                  <p>{recipe.description}</p>
                  <h3>Ingredientes:</h3>
                  <p>{recipe.ingredients}</p>
                  <h3>Instrucciones:</h3>
                  <p>{recipe.instructions}</p>
                  {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} style={{ maxWidth: '100%', height: 'auto' }} />}
                </div>
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;