from flask import Blueprint, request, jsonify
from app import db
from app.models import Recipe

main = Blueprint('main', __name__)

@main.route('/recipes', methods=['GET'])
def get_recipes():
    # Obtener el parámetro 'category' de la URL si existe
    category = request.args.get('category')

    if category:
        # Si se proporciona una categoría, filtra las recetas por esa categoría
        recipes = Recipe.query.filter_by(category=category).all()
    else:
        # Si no se proporciona categoría, devuelve todas las recetas
        recipes = Recipe.query.all()

    recipes_data = [{
        'id': recipe.id,
        'title': recipe.title,
        'description': recipe.description,
        'ingredients': recipe.ingredients,
        'instructions': recipe.instructions,
        'category': recipe.category,
        'image_url': recipe.image_url
    } for recipe in recipes]
    return jsonify(recipes_data)

@main.route('/recipes', methods=['POST'])
def add_recipe():
    data = request.json
    new_recipe = Recipe(
        title=data['title'],
        description=data['description'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        category=data.get('category', 'General'),
        image_url=data.get('image_url')
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify(new_recipe.to_dict()), 201

@main.route('/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    data = request.json
    recipe.title = data.get('title', recipe.title)
    recipe.description = data.get('description', recipe.description)
    recipe.ingredients = data.get('ingredients', recipe.ingredients)
    recipe.instructions = data.get('instructions', recipe.instructions)
    recipe.category = data.get('category', recipe.category)
    recipe.image_url = data.get('image_url', recipe.image_url)
    db.session.commit()
    return jsonify(recipe.to_dict())

@main.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    db.session.delete(recipe)
    db.session.commit()
    return '', 204