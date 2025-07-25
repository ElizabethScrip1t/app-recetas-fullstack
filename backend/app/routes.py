# backend/app/routes.py
from flask import Blueprint, jsonify, request
from app import db # Importamos db desde __init__.py
from app.models import Recipe # Importamos el modelo Recipe que creamos

main = Blueprint('main', __name__)

# Ruta de prueba para verificar que el servidor funciona
@main.route('/')
def index():
    return jsonify({"message": "¡Bienvenido a la API de Recetas!"})

# Ruta para obtener todas las recetas
@main.route('/recipes', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    # Convertir la lista de objetos Recipe a una lista de diccionarios
    return jsonify([recipe.to_dict() for recipe in recipes])

# Ruta para crear una nueva receta
@main.route('/recipes', methods=['POST'])
def create_recipe():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Validación básica de datos
    if not all(key in data for key in ['title', 'description', 'ingredients', 'instructions']):
        return jsonify({"error": "Missing required fields"}), 400

    new_recipe = Recipe(
        title=data['title'],
        description=data['description'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        category=data.get('category'), # .get() permite que sea opcional
        image_url=data.get('image_url')
    )

    db.session.add(new_recipe)
    db.session.commit()

    return jsonify(new_recipe.to_dict()), 201 # 201 Created

# Ruta para obtener una receta por ID
@main.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    return jsonify(recipe.to_dict())

# Ruta para actualizar una receta
@main.route('/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    recipe.title = data.get('title', recipe.title)
    recipe.description = data.get('description', recipe.description)
    recipe.ingredients = data.get('ingredients', recipe.ingredients)
    recipe.instructions = data.get('instructions', recipe.instructions)
    recipe.category = data.get('category', recipe.category)
    recipe.image_url = data.get('image_url', recipe.image_url)

    db.session.commit()
    return jsonify(recipe.to_dict())

# Ruta para eliminar una receta
@main.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = db.session.get(Recipe, recipe_id) # Usar db.session.get para Python 3.9+
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404

    db.session.delete(recipe)
    db.session.commit()
    return jsonify({"message": "Recipe deleted successfully"}), 200